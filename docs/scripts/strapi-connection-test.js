const axios = require('axios');

// Configuración CORREGIDA
const STRAPI_BASE_URL = 'http://127.0.0.60:1337'; // URL base sin /graphql
const STRAPI_GRAPHQL_URL = 'http://127.0.0.60:1337/graphql'; // Endpoint GraphQL
const API_TOKEN = '6ce6baab66da019fd766050c5c17a968f9255c877ff1045fc4b60893ed6668dbe8600010816f8126afa6be0e6ceec7afde3bf2a4718b8feaa071a962f5635d284bf9ab16aca6d2c7dc56830024871e004f17444c7f314564e6fa132e986cf2f0beae307bb1dc6fea2c1b9c039ff426ad471b086ea1bcc6f1c494496ff388b7e9'; // Reemplaza con tu token real

// Cliente axios para API REST
const strapiRestClient = axios.create({
  baseURL: STRAPI_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  },
  timeout: 10000 // 10 segundos
});

// Cliente axios para GraphQL
const strapiGraphQLClient = axios.create({
  baseURL: STRAPI_GRAPHQL_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  },
  timeout: 10000
});

// Función para probar la conexión básica a la API REST
async function testRestConnection() {
  try {
    console.log('🔄 Probando conexión a la API REST de Strapi...');
    const response = await axios.get(`${STRAPI_BASE_URL}/api`, { timeout: 5000 });
    console.log('✅ Conexión a API REST exitosa:');
    console.log(`  Status: ${response.status}`);
    return true;
  } catch (error) {
    console.error('❌ Error en conexión a API REST:');
    if (error.response) {
      console.error(`  Status: ${error.response.status}`);
      console.error('  Datos:', error.response.data);
    } else if (error.request) {
      console.error('  No se recibió respuesta del servidor');
      console.error('  ¿Está Strapi ejecutándose en la URL correcta?');
    } else {
      console.error(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Función para probar la conexión a GraphQL
async function testGraphQLConnection() {
  try {
    console.log('\n🔄 Probando conexión al endpoint GraphQL...');
    
    // Consulta GraphQL simple
    const query = `
      query {
        __schema {
          queryType {
            name
          }
        }
      }
    `;
    
    const response = await strapiGraphQLClient.post('', {
      query
    });
    
    console.log('✅ Conexión a GraphQL exitosa:');
    if (response.data.data?.__schema?.queryType?.name) {
      console.log(`  Tipo de consulta: ${response.data.data.__schema.queryType.name}`);
    } else {
      console.log('  Respuesta recibida correctamente');
    }
    return true;
  } catch (error) {
    console.error('❌ Error en conexión a GraphQL:');
    if (error.response) {
      console.error(`  Status: ${error.response.status}`);
      console.error('  Datos:', error.response.data);
    } else if (error.request) {
      console.error('  No se recibió respuesta del servidor');
    } else {
      console.error(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Función para probar una consulta GraphQL simple
async function testGraphQLQuery() {
  try {
    console.log('\n🔄 Probando consulta GraphQL para obtener tags...');
    
    const query = `
      query {
        tags {
          data {
            id
            attributes {
              name
              category
            }
          }
        }
      }
    `;
    
    const response = await strapiGraphQLClient.post('', {
      query
    });
    
    console.log('✅ Consulta GraphQL exitosa:');
    const tagsCount = response.data.data?.tags?.data?.length || 0;
    console.log(`  Número de tags: ${tagsCount}`);
    
    if (tagsCount > 0) {
      console.log('  Primer tag:');
      const firstTag = response.data.data.tags.data[0];
      console.log(`    ID: ${firstTag.id}`);
      console.log(`    Nombre: ${firstTag.attributes.name}`);
      console.log(`    Categoría: ${firstTag.attributes.category}`);
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error en consulta GraphQL:');
    if (error.response) {
      console.error(`  Status: ${error.response.status}`);
      console.error('  Datos:', error.response.data);
    } else if (error.request) {
      console.error('  No se recibió respuesta del servidor');
    } else {
      console.error(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Función para probar una mutación GraphQL simple
async function testGraphQLMutation() {
  try {
    console.log('\n🔄 Probando mutación GraphQL para crear un tag...');
    
    const mutation = `
      mutation CreateTag($data: TagInput!) {
        createTag(data: $data) {
          data {
            id
            attributes {
              name
              category
            }
          }
        }
      }
    `;
    
    const variables = {
      data: {
        name: "Tag de prueba GraphQL",
        category: "general",
        description: "Este es un tag de prueba creado con GraphQL"
      }
    };
    
    const response = await strapiGraphQLClient.post('', {
      query: mutation,
      variables
    });
    
    console.log('✅ Mutación GraphQL exitosa:');
    const newTag = response.data.data?.createTag?.data;
    if (newTag) {
      console.log(`  ID del nuevo tag: ${newTag.id}`);
      console.log(`  Nombre: ${newTag.attributes.name}`);
      console.log(`  Categoría: ${newTag.attributes.category}`);
    } else {
      console.log('  Tag creado correctamente');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error en mutación GraphQL:');
    if (error.response) {
      console.error(`  Status: ${error.response.status}`);
      if (error.response.data?.errors) {
        console.error('  Errores GraphQL:');
        error.response.data.errors.forEach((err, i) => {
          console.error(`  Error ${i+1}: ${err.message}`);
        });
      } else {
        console.error('  Datos:', error.response.data);
      }
    } else if (error.request) {
      console.error('  No se recibió respuesta del servidor');
    } else {
      console.error(`  Error: ${error.message}`);
    }
    return false;
  }
}

// Función principal para ejecutar todas las pruebas
async function runDiagnostics() {
  console.log('🚀 Iniciando diagnóstico de conexión a Strapi...');
  console.log(`📌 URL base de Strapi: ${STRAPI_BASE_URL}`);
  console.log(`📌 URL de GraphQL: ${STRAPI_GRAPHQL_URL}`);
  
  // Probar conexión a la API REST
  const restConnectionOk = await testRestConnection();
  
  // Probar conexión a GraphQL
  const graphqlConnectionOk = await testGraphQLConnection();
  
  if (!restConnectionOk && !graphqlConnectionOk) {
    console.error('\n❌ Ambas conexiones fallaron. Verifica que Strapi esté en ejecución y accesible.');
    return;
  }
  
  // Si GraphQL está funcionando, probar consultas y mutaciones
  if (graphqlConnectionOk) {
    await testGraphQLQuery();
    await testGraphQLMutation();
  }
  
  console.log('\n📝 Recomendaciones:');
  
  if (graphqlConnectionOk) {
    console.log('✅ La conexión a GraphQL funciona correctamente.');
    console.log('  Para importar datos usando GraphQL:');
    console.log('  1. Usa mutaciones GraphQL para crear entidades');
    console.log('  2. Asegúrate de que los campos coincidan con el esquema GraphQL de Strapi');
    console.log('  3. Maneja las relaciones usando los IDs de las entidades creadas');
  } else {
    console.log('❌ La conexión a GraphQL falló. Verifica la configuración del plugin GraphQL en Strapi.');
  }
  
  if (restConnectionOk) {
    console.log('✅ La conexión a la API REST funciona correctamente.');
    console.log('  Para importar datos usando la API REST:');
    console.log('  1. Usa endpoints como /api/tags para crear entidades');
    console.log('  2. Estructura los datos según el formato de la API REST de Strapi');
  } else {
    console.log('❌ La conexión a la API REST falló. Verifica la configuración de Strapi.');
  }
}

// Ejecutar diagnóstico
runDiagnostics().catch(error => {
  console.error('\n💥 Error crítico durante el diagnóstico:');
  console.error(error);
});