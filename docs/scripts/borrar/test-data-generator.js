/**
 * Script de prueba para verificar la generación de datos del sistema makerspace
 * 
 * Este script prueba la generación de datos sin modificar el archivo original
 * 
 * Uso: node test-makerspace-data.js
 */

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

// Importar el script completo (sin necesidad de exportar funciones)
const generatorScript = require('./generate-makerspace-data');

// Configuración para las pruebas
const TEST_OUTPUT_DIR = './test-output';

// Crear directorio de salida para pruebas si no existe
if (!fs.existsSync(TEST_OUTPUT_DIR)) {
  fs.mkdirSync(TEST_OUTPUT_DIR, { recursive: true });
}

// Función para guardar resultados de prueba
function saveTestResult(filename, data) {
  const filePath = path.join(TEST_OUTPUT_DIR, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Resultado de prueba guardado en ${filePath}`);
}

// Función principal para ejecutar pruebas
async function runTests() {
  console.log('🚀 Iniciando pruebas del generador de datos para el sistema de makerspace...');
  
  try {
    // Ejecutar la generación completa con un tamaño reducido para pruebas
    // Modificar temporalmente las constantes para generar menos datos
    const originalTagCount = generatorScript.TAG_COUNT;
    const originalMemberCount = generatorScript.MEMBER_COUNT;
    
    // Reducir temporalmente el tamaño de los datos para pruebas
    generatorScript.TAG_COUNT = 5;
    generatorScript.SKILL_CATEGORY_COUNT = 3;
    generatorScript.SKILL_COUNT = 10;
    generatorScript.SKILL_LEVEL_COUNT = 3;
    generatorScript.MEMBERSHIP_COUNT = 2;
    generatorScript.MEMBER_COUNT = 5;
    generatorScript.SPACE_COUNT = 3;
    generatorScript.AREA_COUNT = 5;
    generatorScript.EQUIPMENT_COUNT = 5;
    generatorScript.TOOL_COUNT = 5;
    generatorScript.CONSUMABLE_COUNT = 5;
    generatorScript.RESOURCE_COUNT = 5;
    generatorScript.EVENT_COUNT = 3;
    generatorScript.PROJECT_COUNT = 3;
    generatorScript.RESERVATION_COUNT = 5;
    generatorScript.TRAINING_COUNT = 3;
    
    // Redirigir la salida a un directorio de prueba
    const originalOutputDir = process.argv[2] || generatorScript.DEFAULT_OUTPUT_DIR;
    process.argv[2] = TEST_OUTPUT_DIR;
    
    // Ejecutar la generación
    console.log('Ejecutando generación de datos de prueba...');
    await generatorScript.generateData();
    
    // Verificar que se generaron todos los archivos esperados
    const expectedFiles = [
      'tags.json',
      'skill-categories.json',
      'skills.json',
      'skill-levels.json',
      'memberships.json',
      'members.json',
      'member-skills.json',
      'membership-subscriptions.json',
      'spaces.json',
      'areas.json',
      'equipment.json',
      'tools.json',
      'consumables.json',
      'resources.json',
      'events.json',
      'projects.json',
      'reservations.json',
      'trainings.json',
      'metadata.json'
    ];
    
    let allFilesExist = true;
    for (const file of expectedFiles) {
      const filePath = path.join(TEST_OUTPUT_DIR, file);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Archivo no generado: ${file}`);
        allFilesExist = false;
      } else {
        // Verificar que el archivo contiene datos válidos
        try {
          const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          if (!Array.isArray(data) && file !== 'metadata.json') {
            console.error(`❌ El archivo ${file} no contiene un array válido`);
            allFilesExist = false;
          } else if (Array.isArray(data) && data.length === 0) {
            console.error(`❌ El archivo ${file} está vacío`);
            allFilesExist = false;
          } else {
            console.log(`✅ Archivo ${file} generado correctamente`);
          }
        } catch (error) {
          console.error(`❌ Error al leer el archivo ${file}: ${error.message}`);
          allFilesExist = false;
        }
      }
    }
    
    // Restaurar las constantes originales
    generatorScript.TAG_COUNT = originalTagCount;
    generatorScript.MEMBER_COUNT = originalMemberCount;
    
    // Restaurar el directorio de salida original
    process.argv[2] = originalOutputDir;
    
    if (allFilesExist) {
      console.log('\n✅ Todas las pruebas completadas con éxito.');
      console.log(`📊 Resultados guardados en el directorio: ${TEST_OUTPUT_DIR}`);
    } else {
      console.error('\n❌ Algunas pruebas fallaron. Revisa los mensajes de error.');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ Error durante las pruebas:', error);
    process.exit(1);
  }
}

// Ejecutar las pruebas
runTests();