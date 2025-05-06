const axios = require('axios');

// Configuración
const STRAPI_GRAPHQL_URL = 'http://localhost:1337/graphql';
const API_TOKEN = '6ce6baab66da019fd766050c5c17a968f9255c877ff1045fc4b60893ed6668dbe8600010816f8126afa6be0e6ceec7afde3bf2a4718b8feaa071a962f5635d284bf9ab16aca6d2c7dc56830024871e004f17444c7f314564e6fa132e986cf2f0beae307bb1dc6fea2c1b9c039ff426ad471b086ea1bcc6f1c494496ff388b7e9'; // Reemplaza con tu token real

// Cliente axios para GraphQL
const graphqlClient = axios.create({
  baseURL: STRAPI_GRAPHQL_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  },
  timeout: 10000
});

// Consulta para obtener el esquema de Tag
const tagSchemaQuery = `
  query {
    __type(name: "Tag") {
      name
      kind
      fields {
        name
        type {
          name
          kind
          ofType {
            name
            kind
          }
        }
      }
    }
  }
`;

// Consulta para obtener las consultas disponibles
const queriesQuery = `
  query {
    __schema {
      queryType {
        fields {
          name
          args {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    }
  }
`;

// Consulta para obtener las mutaciones disponibles
const mutationsQuery = `
  query {
    __schema {
      mutationType {
        fields {
          name
          args {
            name
            type {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
        }
      }
    }
  }
`;

// Función para probar una consulta simple de tags
async function testSimpleTagQuery() {
  try {
    console.log('\n🔄 Probando una consulta simple para obtener tags...');
    
    // Intentar diferentes estructuras de consulta
    const queries = [
      // Intento 1: Estructura básica
      `query { tags { id name category } }`,
      
      // Intento 2: Con filtros
      `query { tags(filters: { category: { eq: "general" } }) { id name category } }`,
      
      // Intento 3: Con paginación
      `query { tags(pagination: { limit: 3 }) { id name category } }`,
      
      // Intento 4: Estructura alternativa
      `query { findTags { id name category } }`,
      
      // Intento 5: Otra estructura alternativa
      `query { getTags { id name category } }`
    ];
    
    for (let i = 0; i < queries.length; i++) {
      const query = queries[i];
      console.log(`\n🔍 Intento ${i+1}:`);
      console.log(query);
      
      try {
        const response = await graphqlClient.post('', { query });
        console.log('✅ Consulta exitosa:');
        console.log(JSON.stringify(response.data, null, 2));
        break; // Si funciona, salimos del bucle
      } catch (error) {
        console.error('❌ Error:');
        if (error.response?.data?.errors) {
          error.response.data.errors.forEach((err, j) => {
            console.error(`  Error ${j+1}: ${err.message}`);
          });
        } else {
          console.error(error.message);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
}

// Función principal
async function exploreSchema() {
  console.log('🚀 Explorando esquema GraphQL de Strapi...');
  
  try {
    // Obtener información sobre el tipo Tag
    console.log('\n📊 Obteniendo información sobre el tipo Tag...');
    const tagSchemaResponse = await graphqlClient.post('', {
      query: tagSchemaQuery
    });
    
    if (tagSchemaResponse.data.data.__type) {
      console.log('✅ Estructura del tipo Tag:');
      console.log(JSON.stringify(tagSchemaResponse.data.data.__type, null, 2));
    } else {
      console.log('❌ No se pudo obtener información sobre el tipo Tag');
    }
    
    // Obtener consultas disponibles
    console.log('\n📊 Obteniendo consultas disponibles...');
    const queriesResponse = await graphqlClient.post('', {
      query: queriesQuery
    });
    
    if (queriesResponse.data.data.__schema?.queryType?.fields) {
      const queryFields = queriesResponse.data.data.__schema.queryType.fields;
      console.log('✅ Consultas disponibles:');
      
      // Filtrar consultas relacionadas con tags
      const tagQueries = queryFields.filter(field => 
        field.name.toLowerCase().includes('tag')
      );
      
      if (tagQueries.length > 0) {
        console.log('📌 Consultas relacionadas con tags:');
        tagQueries.forEach(query => {
          console.log(`  - ${query.name}`);
          if (query.args.length > 0) {
            console.log('    Argumentos:');
            query.args.forEach(arg => {
              console.log(`      ${arg.name}: ${arg.type.name || arg.type.ofType?.name || arg.type.kind}`);
            });
          }
        });
      } else {
        console.log('  No se encontraron consultas específicas para tags');
      }
    } else {
      console.log('❌ No se pudieron obtener las consultas disponibles');
    }
    
    // Obtener mutaciones disponibles
    console.log('\n📊 Obteniendo mutaciones disponibles...');
    const mutationsResponse = await graphqlClient.post('', {
      query: mutationsQuery
    });
    
    if (mutationsResponse.data.data.__schema?.mutationType?.fields) {
      const mutationFields = mutationsResponse.data.data.__schema.mutationType.fields;
      console.log('✅ Mutaciones disponibles:');
      
      // Filtrar mutaciones relacionadas con tags
      const tagMutations = mutationFields.filter(field => 
        field.name.toLowerCase().includes('tag')
      );
      
      if (tagMutations.length > 0) {
        console.log('📌 Mutaciones relacionadas con tags:');
        tagMutations.forEach(mutation => {
          console.log(`  - ${mutation.name}`);
          if (mutation.args.length > 0) {
            console.log('    Argumentos:');
            mutation.args.forEach(arg => {
              console.log(`      ${arg.name}: ${arg.type.name || arg.type.ofType?.name || arg.type.kind}`);
            });
          }
        });
      } else {
        console.log('  No se encontraron mutaciones específicas para tags');
      }
    } else {
      console.log('❌ No se pudieron obtener las mutaciones disponibles');
    }
    
    // Probar una consulta simple
    await testSimpleTagQuery();
    
  } catch (error) {
    console.error('❌ Error al explorar el esquema:', error.message);
    if (error.response?.data) {
      console.error('Detalles:', JSON.stringify(error.response.data, null, 2));
    }
  }
}

// Ejecutar la exploración
exploreSchema().catch(error => {
  console.error('💥 Error crítico:', error);
});