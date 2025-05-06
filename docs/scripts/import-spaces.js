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

// Función para escapar texto para GraphQL
function escapeGraphQLString(text) {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\\\')  // Escapar barras invertidas
    .replace(/"/g, '\\"')    // Escapar comillas dobles
    .replace(/\n/g, '\\n')   // Escapar saltos de línea
    .replace(/\r/g, '\\r')   // Escapar retornos de carro
    .replace(/\t/g, '\\t');  // Escapar tabulaciones
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

// Función para importar espacios usando GraphQL
async function importSpacesWithGraphQL() {
  console.log('🚀 Iniciando importación de espacios con GraphQL...');
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
  
  // Cargar los espacios del archivo JSON
  const allSpaces = loadJsonFile('spaces.json');
  
  // Tomar solo los primeros 3 espacios para la prueba
  const spacesToImport = allSpaces.slice(0, 3);
  console.log(`📋 Espacios a importar (${spacesToImport.length}):`);
  console.log(JSON.stringify(spacesToImport, null, 2));
  
  // Importar cada espacio
  const results = [];
  const errors = [];
  
  for (const space of spacesToImport) {
    try {
      console.log(`\n🔄 Importando espacio: ${space.name} (ID: ${space.id})...`);
      
      // Normalizar el slug si existe
      let slug = '';
      if (space.slug) {
        slug = normalizeSlug(space.slug);
      } else if (space.name) {
        slug = normalizeSlug(space.name);
      }
      console.log(`  🔄 Slug normalizado: ${slug}`);
      
      // Preparar los metadatos como componentes (si existen)
      const metadataInput = (space.metadata || []).map((meta) => {
        return `{
          key: "${meta.key}",
          value: "${escapeGraphQLString(meta.value || '')}",
          description: "${escapeGraphQLString(meta.description || '')}",
          category: ${meta.category || 'custom'},
          dataType: ${meta.dataType || 'text'},
          source: "${escapeGraphQLString(meta.source || '')}",
          timestamp: "${meta.timestamp || new Date().toISOString()}"
        }`;
      }).join(', ');
      
      // Construir la mutación GraphQL
      // Nota: Ajusta los campos según el esquema real de tu API GraphQL
      const mutation = `
        mutation {
          createSpace(data: {
            name: "${escapeGraphQLString(space.name)}"
            description: "${escapeGraphQLString(space.description || '')}"
            slug: "${slug}"
            type: ${space.type || 'workshop'}
            status: ${space.status || 'active'}
            capacity: ${space.capacity || 0}
            size: ${space.size || 0}
            location: "${escapeGraphQLString(space.location || '')}"
            isActive: ${space.isActive !== false}
            ${space.metadata && space.metadata.length > 0 ? `metadata: [${metadataInput}]` : ''}
          }) {
            documentId
            name
            description
            slug
            type
            status
            capacity
            size
            location
            isActive
            metadata {
              id
              key
              value
              category
            }
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
      const newSpace = response.data.data.createSpace;
      results.push({ 
        oldId: space.id, 
        newId: newSpace.documentId, 
        name: space.name,
        slug: slug,
        response: newSpace
      });
      
      console.log(`✅ Espacio importado correctamente. Nuevo ID: ${newSpace.documentId}`);
    } catch (error) {
      console.error('❌ Error al importar espacio:');
      
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
        space, 
        error: error.response?.data || error.message 
      });
    }
    
    // Pequeña pausa entre solicitudes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Mostrar resumen
  console.log('\n📊 Resumen de importación:');
  console.log(`  ✅ Espacios importados: ${results.length}`);
  console.log(`  ❌ Errores: ${errors.length}`);
  
  // Guardar resultados en archivos
  if (results.length > 0) {
    fs.writeFileSync('spaces-imported.json', JSON.stringify(results, null, 2));
    console.log('  📄 Resultados guardados en spaces-imported.json');
  }
  
  if (errors.length > 0) {
    fs.writeFileSync('spaces-errors.json', JSON.stringify(errors, null, 2));
    console.log('  📄 Errores guardados en spaces-errors.json');
  }
  
  return { results, errors };
}

// Ejecutar la importación
importSpacesWithGraphQL()
  .then(({ results, errors }) => {
    if (errors.length === 0) {
      console.log('\n🎉 Importación completada con éxito!');
    } else {
      console.log('\n⚠️ Importación completada con errores. Revisa spaces-errors.json');
    }
  })
  .catch(error => {
    console.error('\n💥 Error crítico durante la importación:');
    console.error(error);
  });