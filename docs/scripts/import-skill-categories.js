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

// Función para normalizar un slug (eliminar acentos y caracteres especiales)
function normalizeSlug(text) {
  return text
    .toLowerCase()
    .normalize('NFD')                   // Normalizar caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '')    // Eliminar acentos
    .replace(/[^a-z0-9\-_.~]/g, '-')    // Reemplazar caracteres no permitidos con guiones
    .replace(/--+/g, '-')               // Reemplazar múltiples guiones con uno solo
    .replace(/^-|-$/g, '');             // Eliminar guiones al inicio y final
}

// Función para cargar un archivo JSON
function loadJsonFile(filename) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf8'));
  } catch (error) {
    console.error(`Error al cargar ${filename}:`, error.message);
    return [];
  }
}

// Función para importar categorías de habilidades usando GraphQL
async function importSkillCategoriesWithGraphQL() {
  console.log('🚀 Iniciando importación de categorías de habilidades con GraphQL...');
  console.log(`📌 URL de GraphQL: ${STRAPI_GRAPHQL_URL}`);
  
  // Verificar la conexión antes de continuar
  try {
    console.log('🔄 Verificando conexión al servidor GraphQL...');
    const testResponse = await graphqlClient.post('', {
      query: `query { __typename }`
    });
    console.log('✅ Conexión exitosa:', testResponse.data);
  } catch (error) {
    console.error('❌ Error de conexión:');
    if (error.code) {
      console.error(`  Código: ${error.code}`);
    }
    if (error.message) {
      console.error(`  Mensaje: ${error.message}`);
    }
    console.error('  Por favor, verifica la URL y la conectividad de red.');
    return { results: [], errors: [{ error: 'Error de conexión' }] };
  }
  
  // Cargar las categorías de habilidades del archivo JSON
  const allSkillCategories = loadJsonFile('skill-categories.json');
  
  // Tomar solo las primeras 3 categorías para la prueba
  const categoriesToImport = allSkillCategories.slice(0, 3); // Importar solo las primeras 3
  console.log(`📋 Categorías a importar (${categoriesToImport.length}):`);
  console.log(JSON.stringify(categoriesToImport, null, 2));
  
  // Importar cada categoría
  const results = [];
  const errors = [];
  
  for (const category of categoriesToImport) {
    try {
      console.log(`\n🔄 Importando categoría: ${category.name} (ID: ${category.id})...`);
      
      // Normalizar el slug
      const normalizedSlug = normalizeSlug(category.slug || category.name);
      console.log(`  🔄 Normalizando slug: ${category.slug || category.name} → ${normalizedSlug}`);
      
      // Construir la mutación GraphQL con el nombre correcto: createSkillcategory (c minúscula)
      const mutation = `
        mutation {
          createSkillcategory(data: {
            name: "${category.name}"
            description: "${(category.description || '').replace(/"/g, '\\"')}"
            color: "${category.color || '#CCCCCC'}"
            icon: "${category.icon || 'default'}"
            slug: "${normalizedSlug}"
            isActive: ${category.isActive !== false}
            order: ${category.order || 0}
          }) {
            documentId
            name
            description
            color
            icon
            slug
            isActive
            order
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
      const newCategory = response.data.data.createSkillcategory;
      results.push({ 
        oldId: category.id, 
        newId: newCategory.documentId, 
        name: category.name,
        slug: normalizedSlug,
        response: newCategory
      });
      
      console.log(`✅ Categoría importada correctamente. Nuevo ID: ${newCategory.documentId}`);
    } catch (error) {
      console.error('❌ Error al importar categoría:');
      
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
        category, 
        error: error.response?.data || error.message 
      });
    }
    
    // Pequeña pausa entre solicitudes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Mostrar resumen
  console.log('\n📊 Resumen de importación:');
  console.log(`  ✅ Categorías importadas: ${results.length}`);
  console.log(`  ❌ Errores: ${errors.length}`);
  
  // Guardar resultados en archivos
  if (results.length > 0) {
    fs.writeFileSync('skill-categories-imported.json', JSON.stringify(results, null, 2));
    console.log('  📄 Resultados guardados en skill-categories-imported.json');
  }
  
  if (errors.length > 0) {
    fs.writeFileSync('skill-categories-errors.json', JSON.stringify(errors, null, 2));
    console.log('  📄 Errores guardados en skill-categories-errors.json');
  }
  
  return { results, errors };
}

// Ejecutar la importación
importSkillCategoriesWithGraphQL()
  .then(({ results, errors }) => {
    if (errors.length === 0) {
      console.log('\n🎉 Importación completada con éxito!');
    } else {
      console.log('\n⚠️ Importación completada con errores. Revisa skill-categories-errors.json');
    }
  })
  .catch(error => {
    console.error('\n💥 Error crítico durante la importación:');
    console.error(error);
  });