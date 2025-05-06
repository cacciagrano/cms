const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuración
const STRAPI_GRAPHQL_URL = 'http://127.0.0.60:1337/graphql';
const API_TOKEN = '6ce6baab66da019fd766050c5c17a968f9255c877ff1045fc4b60893ed6668dbe8600010816f8126afa6be0e6ceec7afde3bf2a4718b8feaa071a962f5635d284bf9ab16aca6d2c7dc56830024871e004f17444c7f314564e6fa132e986cf2f0beae307bb1dc6fea2c1b9c039ff426ad471b086ea1bcc6f1c494496ff388b7e9'; 
const DATA_DIR = './data';

// Cliente axios para GraphQL
const graphqlClient = axios.create({
  baseURL: STRAPI_GRAPHQL_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  },
  timeout: 10000
});

// Mapeo de categorías a valores de enum
// Estos valores coinciden exactamente con los valores del enum ENUM_TAG_CATEGORY
const categoryMapping = {
  'Equipamiento': 'technical',
  'Ubicación': 'general',
  'Evento': 'educational',
  'Herramienta': 'technical',
  'Material': 'technical',
  'Proyecto': 'administrative',
  'Formación': 'educational',
  'Miembro': 'administrative',
  'Habilidad': 'educational',
  // Valor predeterminado si no hay mapeo
  'DEFAULT': 'other'
};

// Función para cargar un archivo JSON
function loadJsonFile(filename) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf8'));
  } catch (error) {
    console.error(`Error al cargar ${filename}:`, error.message);
    return [];
  }
}

// Función para importar tags usando GraphQL
async function importTagsWithGraphQL() {
  console.log('🚀 Iniciando importación de tags con GraphQL...');
  
  // Cargar los tags del archivo JSON
  const allTags = loadJsonFile('tags.json');
  
  // Tomar solo los primeros 3 tags para la prueba
  const tagsToImport = allTags.slice(0, 3);
  console.log(`📋 Tags a importar (${tagsToImport.length}):`);
  console.log(JSON.stringify(tagsToImport, null, 2));
  
  // Importar cada tag
  const results = [];
  const errors = [];
  
  for (const tag of tagsToImport) {
    try {
      console.log(`\n🔄 Importando tag: ${tag.name} (ID: ${tag.id})...`);
      
      // Mapear la categoría a un valor permitido
      const mappedCategory = categoryMapping[tag.category] || categoryMapping.DEFAULT;
      console.log(`  🔄 Mapeando categoría: ${tag.category} → ${mappedCategory}`);
      
      // Construir la mutación GraphQL con el valor de enum directamente en la consulta
      // Nota: Los valores de enum se proporcionan sin comillas en GraphQL
      const mutation = `
        mutation {
          createTag(data: {
            name: "${tag.name}"
            category: ${mappedCategory}
            description: "${(tag.description || '').replace(/"/g, '\\"')}"
            color: "${tag.color || '#CCCCCC'}"
          }) {
            documentId
            name
            category
            description
            color
          }
        }
      `;
      
      console.log('📦 Mutación a enviar:');
      console.log(mutation);
      
      // Enviar la mutación GraphQL
      const response = await graphqlClient.post('', { query: mutation });
      
      // Verificar si hay errores en la respuesta GraphQL
      if (response.data.errors) {
        throw new Error(response.data.errors[0].message);
      }
      
      // Guardar el resultado
      const newTag = response.data.data.createTag;
      results.push({ 
        oldId: tag.id, 
        newId: newTag.documentId, 
        name: tag.name,
        response: newTag
      });
      
      console.log(`✅ Tag importado correctamente. Nuevo ID: ${newTag.documentId}`);
    } catch (error) {
      console.error('❌ Error al importar tag:');
      
      if (error.response?.data?.errors) {
        console.error('  Errores GraphQL:');
        error.response.data.errors.forEach((err, i) => {
          console.error(`  Error ${i+1}: ${err.message}`);
        });
      } else if (error.response) {
        console.error(`  Status: ${error.response.status}`);
        console.error('  Datos:', error.response.data);
      } else if (error.request) {
        console.error('  No se recibió respuesta del servidor');
      } else {
        console.error(`  Mensaje: ${error.message}`);
      }
      
      errors.push({ 
        tag, 
        error: error.response?.data || error.message 
      });
    }
    
    // Pequeña pausa entre solicitudes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Mostrar resumen
  console.log('\n📊 Resumen de importación:');
  console.log(`  ✅ Tags importados: ${results.length}`);
  console.log(`  ❌ Errores: ${errors.length}`);
  
  // Guardar resultados en archivos
  if (results.length > 0) {
    fs.writeFileSync('tags-imported-final.json', JSON.stringify(results, null, 2));
    console.log('  📄 Resultados guardados en tags-imported-final.json');
  }
  
  if (errors.length > 0) {
    fs.writeFileSync('tags-errors-final.json', JSON.stringify(errors, null, 2));
    console.log('  📄 Errores guardados en tags-errors-final.json');
  }
  
  return { results, errors };
}

// Ejecutar la importación
importTagsWithGraphQL()
  .then(({ results, errors }) => {
    if (errors.length === 0) {
      console.log('\n🎉 Importación completada con éxito!');
    } else {
      console.log('\n⚠️ Importación completada con errores. Revisa tags-errors-final.json');
    }
  })
  .catch(error => {
    console.error('\n💥 Error crítico durante la importación:');
    console.error(error);
  });