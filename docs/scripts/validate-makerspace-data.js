/**
 * Script para validar los datos generados del sistema makerspace
 * 
 * Este script verifica que todos los archivos generados existan y contengan datos válidos,
 * además de validar las relaciones entre entidades.
 * 
 * Uso: node validate-makerspace-data.js [directorio_datos]
 * - directorio_datos: Directorio donde se encuentran los archivos JSON (predeterminado: ./data)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert').strict;

// Configuración
const DEFAULT_DATA_DIR = './data';

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const dataDir = args[0] || DEFAULT_DATA_DIR;

console.log(`🔍 Validando datos en el directorio: ${dataDir}`);

// Lista de archivos esperados
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

// Función para cargar datos de un archivo JSON
function loadJsonFile(filename) {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Archivo no encontrado: ${filePath}`);
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    return data;
  } catch (error) {
    throw new Error(`Error al leer el archivo ${filename}: ${error.message}`);
  }
}

// Función para verificar que un array no esté vacío
function verifyArrayNotEmpty(array, name) {
  if (!Array.isArray(array)) {
    throw new Error(`${name} no es un array`);
  }
  
  if (array.length === 0) {
    throw new Error(`${name} está vacío`);
  }
  
  return true;
}

// Función para verificar que todos los objetos en un array tengan ciertos campos
function verifyObjectFields(array, fields, name) {
  array.forEach((obj, index) => {
    fields.forEach(field => {
      if (!obj.hasOwnProperty(field)) {
        throw new Error(`El objeto #${index} en ${name} no tiene el campo '${field}'`);
      }
    });
  });
  
  return true;
}

// Función para verificar que los IDs sean únicos en un array
function verifyUniqueIds(array, name) {
  const ids = new Set();
  array.forEach(obj => {
    if (ids.has(obj.id)) {
      throw new Error(`ID duplicado ${obj.id} en ${name}`);
    }
    ids.add(obj.id);
  });
  
  return true;
}

// Función para verificar referencias
function verifyReferences(sourceArray, targetArray, sourceField, targetField, sourceName, targetName) {
  const targetIds = new Set(targetArray.map(obj => obj[targetField]));
  
  sourceArray.forEach((obj, index) => {
    const refId = obj[sourceField];
    if (refId !== null && !targetIds.has(refId)) {
      throw new Error(`Referencia inválida: ${sourceName}[${index}].${sourceField}=${refId} no existe en ${targetName}`);
    }
  });
  
  return true;
}

// Función para verificar referencias en arrays
function verifyArrayReferences(sourceArray, targetArray, sourceField, targetField, sourceName, targetName) {
  const targetIds = new Set(targetArray.map(obj => obj[targetField]));
  
  sourceArray.forEach((obj, index) => {
    if (Array.isArray(obj[sourceField])) {
      obj[sourceField].forEach(refId => {
        if (!targetIds.has(refId)) {
          throw new Error(`Referencia inválida en array: ${sourceName}[${index}].${sourceField} contiene ${refId} que no existe en ${targetName}`);
        }
      });
    }
  });
  
  return true;
}

// Función principal para validar todos los datos
async function validateData() {
  try {
    console.log('Verificando existencia de archivos...');
    let allFilesExist = true;
    let fileStats = {};
    
    for (const file of expectedFiles) {
      const filePath = path.join(dataDir, file);
      if (!fs.existsSync(filePath)) {
        console.error(`❌ Archivo no encontrado: ${file}`);
        allFilesExist = false;
      } else {
        const stats = fs.statSync(filePath);
        fileStats[file] = {
          size: (stats.size / 1024).toFixed(2) + ' KB',
          modified: stats.mtime
        };
        console.log(`✅ Archivo encontrado: ${file} (${fileStats[file].size})`);
      }
    }
    
    if (!allFilesExist) {
      throw new Error('Algunos archivos no existen. Verifica que la generación de datos se completó correctamente.');
    }
    
    console.log('\nCargando datos para validación...');
    
    // Cargar todos los datos
    const tags = loadJsonFile('tags.json');
    const skillCategories = loadJsonFile('skill-categories.json');
    const skills = loadJsonFile('skills.json');
    const skillLevels = loadJsonFile('skill-levels.json');
    const memberships = loadJsonFile('memberships.json');
    const members = loadJsonFile('members.json');
    const memberSkills = loadJsonFile('member-skills.json');
    const membershipSubscriptions = loadJsonFile('membership-subscriptions.json');
    const spaces = loadJsonFile('spaces.json');
    const areas = loadJsonFile('areas.json');
    const equipment = loadJsonFile('equipment.json');
    const tools = loadJsonFile('tools.json');
    const consumables = loadJsonFile('consumables.json');
    const resources = loadJsonFile('resources.json');
    const events = loadJsonFile('events.json');
    const projects = loadJsonFile('projects.json');
    const reservations = loadJsonFile('reservations.json');
    const trainings = loadJsonFile('trainings.json');
    const metadata = loadJsonFile('metadata.json');
    
    console.log('Datos cargados correctamente.');
    
    console.log('\nVerificando estructura de datos...');
    
    // Verificar que los arrays no estén vacíos
    verifyArrayNotEmpty(tags, 'Tags');
    verifyArrayNotEmpty(skillCategories, 'Categorías de habilidades');
    verifyArrayNotEmpty(skills, 'Habilidades');
    verifyArrayNotEmpty(skillLevels, 'Niveles de habilidad');
    verifyArrayNotEmpty(memberships, 'Membresías');
    verifyArrayNotEmpty(members, 'Miembros');
    verifyArrayNotEmpty(memberSkills, 'Habilidades de miembros');
    verifyArrayNotEmpty(membershipSubscriptions, 'Suscripciones de membresía');
    verifyArrayNotEmpty(spaces, 'Espacios');
    verifyArrayNotEmpty(areas, 'Áreas');
    verifyArrayNotEmpty(equipment, 'Equipamiento');
    verifyArrayNotEmpty(tools, 'Herramientas');
    verifyArrayNotEmpty(consumables, 'Consumibles');
    verifyArrayNotEmpty(resources, 'Recursos');
    verifyArrayNotEmpty(events, 'Eventos');
    verifyArrayNotEmpty(projects, 'Proyectos');
    verifyArrayNotEmpty(reservations, 'Reservas');
    verifyArrayNotEmpty(trainings, 'Formaciones');
    
    // Verificar campos requeridos
    verifyObjectFields(tags, ['id', 'name', 'category'], 'Tags');
    verifyObjectFields(skillCategories, ['id', 'name', 'description', 'slug'], 'Categorías de habilidades');
    verifyObjectFields(skills, ['id', 'name', 'description', 'category'], 'Habilidades');
    verifyObjectFields(skillLevels, ['id', 'name', 'value', 'skill'], 'Niveles de habilidad');
    verifyObjectFields(memberships, ['id', 'name', 'level', 'price'], 'Membresías');
    verifyObjectFields(members, ['id', 'firstName', 'lastName', 'memberCode'], 'Miembros');
    verifyObjectFields(memberSkills, ['id', 'member', 'skill', 'level'], 'Habilidades de miembros');
    verifyObjectFields(membershipSubscriptions, ['id', 'member', 'membership'], 'Suscripciones de membresía');
    verifyObjectFields(spaces, ['id', 'name', 'description', 'type'], 'Espacios');
    verifyObjectFields(areas, ['id', 'name', 'space'], 'Áreas');
    verifyObjectFields(equipment, ['id', 'name', 'area'], 'Equipamiento');
    verifyObjectFields(tools, ['id', 'name', 'area'], 'Herramientas');
    verifyObjectFields(consumables, ['id', 'name', 'area'], 'Consumibles');
    verifyObjectFields(resources, ['id', 'name', 'area'], 'Recursos');
    verifyObjectFields(events, ['id', 'name', 'location', 'organizer'], 'Eventos');
    verifyObjectFields(projects, ['id', 'name', 'leader', 'team'], 'Proyectos');
    verifyObjectFields(reservations, ['id', 'member', 'resourceType', 'resourceId'], 'Reservas');
    verifyObjectFields(trainings, ['id', 'name', 'skill', 'instructor'], 'Formaciones');
    
    // Verificar IDs únicos
    verifyUniqueIds(tags, 'Tags');
    verifyUniqueIds(skillCategories, 'Categorías de habilidades');
    verifyUniqueIds(skills, 'Habilidades');
    verifyUniqueIds(skillLevels, 'Niveles de habilidad');
    verifyUniqueIds(memberships, 'Membresías');
    verifyUniqueIds(members, 'Miembros');
    verifyUniqueIds(memberSkills, 'Habilidades de miembros');
    verifyUniqueIds(membershipSubscriptions, 'Suscripciones de membresía');
    verifyUniqueIds(spaces, 'Espacios');
    verifyUniqueIds(areas, 'Áreas');
    verifyUniqueIds(equipment, 'Equipamiento');
    verifyUniqueIds(tools, 'Herramientas');
    verifyUniqueIds(consumables, 'Consumibles');
    verifyUniqueIds(resources, 'Recursos');
    verifyUniqueIds(events, 'Eventos');
    verifyUniqueIds(projects, 'Proyectos');
    verifyUniqueIds(reservations, 'Reservas');
    verifyUniqueIds(trainings, 'Formaciones');
    
    console.log('Estructura de datos verificada correctamente.');
    
    console.log('\nVerificando relaciones entre entidades...');
    
    // Verificar relaciones
    verifyReferences(skills, skillCategories, 'category', 'id', 'Habilidades', 'Categorías de habilidades');
    verifyReferences(skillLevels, skills, 'skill', 'id', 'Niveles de habilidad', 'Habilidades');
    verifyReferences(memberSkills, members, 'member', 'id', 'Habilidades de miembros', 'Miembros');
    verifyReferences(memberSkills, skills, 'skill', 'id', 'Habilidades de miembros', 'Habilidades');
    verifyReferences(memberSkills, skillLevels, 'level', 'id', 'Habilidades de miembros', 'Niveles de habilidad');
    verifyReferences(membershipSubscriptions, members, 'member', 'id', 'Suscripciones de membresía', 'Miembros');
    verifyReferences(membershipSubscriptions, memberships, 'membership', 'id', 'Suscripciones de membresía', 'Membresías');
    verifyReferences(areas, spaces, 'space', 'id', 'Áreas', 'Espacios');
    verifyReferences(equipment, areas, 'area', 'id', 'Equipamiento', 'Áreas');
    verifyReferences(tools, areas, 'area', 'id', 'Herramientas', 'Áreas');
    verifyReferences(consumables, areas, 'area', 'id', 'Consumibles', 'Áreas');
    verifyReferences(resources, areas, 'area', 'id', 'Recursos', 'Áreas');
    verifyReferences(events, spaces, 'location', 'id', 'Eventos', 'Espacios');
    verifyReferences(events, members, 'organizer', 'id', 'Eventos', 'Miembros');
    verifyReferences(projects, members, 'leader', 'id', 'Proyectos', 'Miembros');
    verifyReferences(reservations, members, 'member', 'id', 'Reservas', 'Miembros');
    verifyReferences(trainings, skills, 'skill', 'id', 'Formaciones', 'Habilidades');
    verifyReferences(trainings, members, 'instructor', 'id', 'Formaciones', 'Miembros');
    
    // Verificar referencias en arrays
    verifyArrayReferences(events, members, 'attendees', 'id', 'Eventos', 'Miembros');
    verifyArrayReferences(projects, members, 'team', 'id', 'Proyectos', 'Miembros');
    verifyArrayReferences(projects, skills, 'requiredSkills', 'id', 'Proyectos', 'Habilidades');
    
    console.log('Relaciones entre entidades verificadas correctamente.');
    
    // Verificar metadatos
    console.log('\nVerificando metadatos...');
    if (!metadata.generated) {
      throw new Error('El archivo de metadatos no contiene la fecha de generación');
    }
    
    if (!metadata.counts) {
      throw new Error('El archivo de metadatos no contiene los conteos');
    }
    
    // Verificar que los conteos coincidan
    const actualCounts = {
      tags: tags.length,
      skillCategories: skillCategories.length,
      skills: skills.length,
      skillLevels: skillLevels.length,
      memberships: memberships.length,
      members: members.length,
      memberSkills: memberSkills.length,
      membershipSubscriptions: membershipSubscriptions.length,
      spaces: spaces.length,
      areas: areas.length,
      equipment: equipment.length,
      tools: tools.length,
      consumables: consumables.length,
      resources: resources.length,
      events: events.length,
      projects: projects.length,
      reservations: reservations.length,
      trainings: trainings.length
    };
    
    let countsMatch = true;
    for (const [key, value] of Object.entries(actualCounts)) {
      if (metadata.counts[key] !== value) {
        console.error(`❌ El conteo de ${key} no coincide: ${metadata.counts[key]} (metadatos) vs ${value} (actual)`);
        countsMatch = false;
      }
    }
    
    if (countsMatch) {
      console.log('Metadatos verificados correctamente.');
    } else {
      throw new Error('Los conteos en los metadatos no coinciden con los datos reales');
    }
    
    // Resumen
    console.log('\n📊 Resumen de datos:');
    for (const [key, value] of Object.entries(actualCounts)) {
      console.log(`- ${key}: ${value} registros`);
    }
    
    console.log('\n✅ Validación completada con éxito. Los datos son coherentes y válidos.');
    
  } catch (error) {
    console.error(`\n❌ Error durante la validación: ${error.message}`);
    process.exit(1);
  }
}

// Ejecutar la validación
validateData();