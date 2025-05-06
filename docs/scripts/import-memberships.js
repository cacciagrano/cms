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

// Función para cargar un archivo JSON
function loadJsonFile(filename) {
  try {
    return JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), 'utf8'));
  } catch (error) {
    console.error(`Error al cargar ${filename}:`, error.message);
    return [];
  }
}

// Función para importar membresías usando GraphQL
async function importMembershipsWithGraphQL() {
  console.log('🚀 Iniciando importación de membresías con GraphQL...');
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
  
  // Cargar las membresías del archivo JSON
  const allMemberships = loadJsonFile('memberships.json');
  
  // Tomar solo las primeras 3 membresías para la prueba
  const membershipsToImport = allMemberships.slice(0, 3);
  console.log(`📋 Membresías a importar (${membershipsToImport.length}):`);
  console.log(JSON.stringify(membershipsToImport, null, 2));
  
  // Importar cada membresía
  const results = [];
  const errors = [];
  
  for (const membership of membershipsToImport) {
    try {
      console.log(`\n🔄 Importando membresía: ${membership.name} (ID: ${membership.id})...`);
      
      // Mapear el nivel a billingCycle si existe
      let billingCycle = 'monthly'; // valor por defecto
      if (membership.level) {
        // Mapeo simple de nivel a billingCycle
        switch (membership.level.toLowerCase()) {
          case 'basic':
            billingCycle = 'monthly';
            break;
          case 'standard':
            billingCycle = 'quarterly';
            break;
          case 'premium':
            billingCycle = 'annual';
            break;
          default:
            billingCycle = 'monthly';
        }
      }
      
      // Preparar los beneficios como componentes
      // NOTA: Los valores de enum se proporcionan sin comillas
      const benefitsInput = (membership.benefits || []).map((benefit, index) => {
        return `{
          name: "Beneficio ${index + 1}",
          description: "${benefit.replace(/"/g, '\\"')}",
          icon: "star",
          isHighlighted: ${index < 2},
          category: service,
          value: "",
          conditions: ""
        }`;
      }).join(', ');
      
      // Construir la mutación GraphQL
      // NOTA: Los valores de enum se proporcionan sin comillas
      const mutation = `
        mutation {
          createMembership(data: {
            name: "${membership.name}"
            description: "${(membership.description || '').replace(/"/g, '\\"')}"
            code: "${membership.id}"
            price: ${membership.price || 0}
            currency: "EUR"
            billingCycle: ${billingCycle}
            durationDays: ${membership.duration || 30}
            isActive: ${membership.isActive !== false}
            maxMembers: 0
            benefits: [${benefitsInput}]
          }) {
            documentId
            name
            description
            code
            price
            currency
            billingCycle
            durationDays
            isActive
            maxMembers
            benefits {
              id
              name
              description
              category
              isHighlighted
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
      const newMembership = response.data.data.createMembership;
      results.push({ 
        oldId: membership.id, 
        newId: newMembership.documentId, 
        name: membership.name,
        response: newMembership
      });
      
      console.log(`✅ Membresía importada correctamente. Nuevo ID: ${newMembership.documentId}`);
    } catch (error) {
      console.error('❌ Error al importar membresía:');
      
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
        membership, 
        error: error.response?.data || error.message 
      });
    }
    
    // Pequeña pausa entre solicitudes
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Mostrar resumen
  console.log('\n📊 Resumen de importación:');
  console.log(`  ✅ Membresías importadas: ${results.length}`);
  console.log(`  ❌ Errores: ${errors.length}`);
  
  // Guardar resultados en archivos
  if (results.length > 0) {
    fs.writeFileSync('memberships-imported.json', JSON.stringify(results, null, 2));
    console.log('  📄 Resultados guardados en memberships-imported.json');
  }
  
  if (errors.length > 0) {
    fs.writeFileSync('memberships-errors.json', JSON.stringify(errors, null, 2));
    console.log('  📄 Errores guardados en memberships-errors.json');
  }
  
  return { results, errors };
}

// Ejecutar la importación
importMembershipsWithGraphQL()
  .then(({ results, errors }) => {
    if (errors.length === 0) {
      console.log('\n🎉 Importación completada con éxito!');
    } else {
      console.log('\n⚠️ Importación completada con errores. Revisa memberships-errors.json');
    }
  })
  .catch(error => {
    console.error('\n💥 Error crítico durante la importación:');
    console.error(error);
  });