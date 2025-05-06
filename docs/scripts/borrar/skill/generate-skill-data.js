/**
 * Script para generar datos de ejemplo de categorías, habilidades y niveles de habilidad para Strapi v5.12.6 con GraphQL
 *
 * Este script genera datos compatibles con los esquemas proporcionados y puede ser importado a través de la API GraphQL.
 *
 * Uso: node generate-skill-data.js [archivo_salida]
 * - archivo_salida: Ruta del archivo JSON de salida (predeterminado: skill-data.json)
 */

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Configuración
const DEFAULT_OUTPUT = 'skill-data.json';

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const outputFile = args[0] || DEFAULT_OUTPUT;

// Constantes para generación de datos
const CATEGORY_COUNT = 8;
const SKILL_COUNT = 40;
const SKILL_LEVEL_COUNT = 5;

const SKILL_ICONS = ['code', 'brush', 'wrench', 'beaker', 'chip', 'terminal', 'database', 'cloud', 'camera', 'pen'];
const CATEGORY_ICONS = ['computer', 'chip', 'saw', 'code', 'hammer', 'printer3d', 'laser', 'cnc'];
const COLORS = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#34495e', '#e67e22'];

// Categorías predefinidas para asegurar datos realistas
const PREDEFINED_CATEGORIES = [
  { name: 'Programación', icon: 'code' },
  { name: 'Diseño', icon: 'brush' },
  { name: 'Electrónica', icon: 'chip' },
  { name: 'Fabricación', icon: 'hammer' },
  { name: 'Impresión 3D', icon: 'printer3d' },
  { name: 'Robótica', icon: 'robot' },
  { name: 'IoT', icon: 'wifi' },
  { name: 'Ciencia de Datos', icon: 'database' }
];

// Función para generar un componente de metadatos
function generateMetadata() {
  return {
    key: faker.helpers.arrayElement(['difficulty', 'popularity', 'relevance', 'source', 'tag']),
    value: faker.lorem.words(2)
  };
}

// Función para generar un componente de auditoría
function generateAudit() {
  const createdAt = faker.date.past({ years: 2 });
  const updatedAt = faker.date.between({ from: createdAt, to: new Date() });
  
  return {
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    createdBy: faker.helpers.arrayElement([null, 'system', 'admin', 'import']),
    updatedBy: faker.helpers.arrayElement([null, 'system', 'admin', 'member'])
  };
}

// Función para generar una categoría
function generateCategory(index, existingCategories = []) {
  // Usar categoría predefinida si está disponible
  const predefined = PREDEFINED_CATEGORIES[index - 1];
  const name = predefined ? predefined.name : faker.helpers.unique(faker.lorem.word);
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  const icon = predefined ? predefined.icon : faker.helpers.arrayElement(CATEGORY_ICONS);
  
  // Determinar si esta categoría tendrá un padre (20% de probabilidad si hay categorías existentes)
  let parentCategory = null;
  if (existingCategories.length > 0 && Math.random() < 0.2) {
    parentCategory = faker.helpers.arrayElement(existingCategories).id;
  }
  
  return {
    id: index,
    name,
    description: faker.lorem.paragraph(),
    slug,
    icon,
    color: COLORS[index - 1] || faker.color.rgb({ format: 'hex' }),
    isActive: faker.datatype.boolean(0.9), // 90% de probabilidad de estar activo
    order: index, // Orden basado en el índice
    parentCategory,
    metadata: Array.from(
      { length: faker.number.int({ min: 0, max: 2 }) },
      generateMetadata
    ),
    audit: generateAudit(),
    publishedAt: new Date().toISOString(),
    deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null // 5% de probabilidad de estar eliminado
  };
}

// Función para generar una habilidad
function generateSkill(index, categories, existingSkills = []) {
  // Generar nombres de habilidades más realistas basados en la categoría
  const category = faker.helpers.arrayElement(categories);
  let name;
  
  // Asignar nombres de habilidades según la categoría
  switch (category.name) {
    case 'Programación':
      name = faker.helpers.arrayElement(['JavaScript', 'Python', 'Java', 'C++', 'PHP', 'Ruby', 'Go', 'Rust', 'TypeScript', 'Swift']);
      break;
    case 'Diseño':
      name = faker.helpers.arrayElement(['Illustrator', 'Photoshop', 'Figma', 'Sketch', 'InDesign', 'UI/UX', 'Diseño Web', 'Diseño Gráfico']);
      break;
    case 'Electrónica':
      name = faker.helpers.arrayElement(['Arduino', 'Circuitos', 'Soldadura', 'PCB', 'Microcontroladores', 'Sensores', 'Raspberry Pi']);
      break;
    case 'Fabricación':
      name = faker.helpers.arrayElement(['Corte Láser', 'Fresado CNC', 'Carpintería', 'Metalurgia', 'Moldeado', 'Prototipado']);
      break;
    case 'Impresión 3D':
      name = faker.helpers.arrayElement(['FDM', 'SLA', 'Modelado 3D', 'Slicing', 'Post-procesado', 'Diseño para impresión']);
      break;
    case 'Robótica':
      name = faker.helpers.arrayElement(['ROS', 'Servomotores', 'Cinemática', 'Visión Artificial', 'Automatización', 'Drones']);
      break;
    case 'IoT':
      name = faker.helpers.arrayElement(['MQTT', 'ESP32', 'Sensores IoT', 'Domótica', 'Redes', 'Protocolos Inalámbricos']);
      break;
    case 'Ciencia de Datos':
      name = faker.helpers.arrayElement(['Machine Learning', 'Pandas', 'Visualización', 'Estadística', 'Big Data', 'TensorFlow']);
      break;
    default:
      name = faker.helpers.unique(faker.lorem.words, [2]);
  }
  
  // Asegurar que el nombre sea único añadiendo un sufijo si es necesario
  let uniqueName = name;
  let counter = 1;
  while (existingSkills.some(s => s.name === uniqueName)) {
    uniqueName = `${name} ${counter}`;
    counter++;
  }
  
  const slug = uniqueName.toLowerCase().replace(/\s+/g, '-');
  
  // Determinar si esta habilidad tendrá un padre (30% de probabilidad si hay habilidades existentes)
  let parentSkill = null;
  if (existingSkills.length > 0 && Math.random() < 0.3) {
    // Intentar encontrar un padre de la misma categoría
    const potentialParents = existingSkills.filter(s => s.category === category.id);
    if (potentialParents.length > 0) {
      parentSkill = faker.helpers.arrayElement(potentialParents).id;
    }
  }
  
  return {
    id: index,
    name: uniqueName,
    description: faker.lorem.paragraph(),
    slug,
    icon: faker.helpers.arrayElement(SKILL_ICONS),
    color: faker.color.rgb({ format: 'hex' }),
    isActive: faker.datatype.boolean(0.9), // 90% de probabilidad de estar activo
    isVerifiable: faker.datatype.boolean(0.8), // 80% de probabilidad de ser verificable
    verificationCriteria: faker.datatype.boolean(0.7) ? 
      `Para verificar esta habilidad, el miembro debe: ${faker.lorem.sentences(3)}` : null,
    parentSkill,
    category: category.id,
    metadata: Array.from(
      { length: faker.number.int({ min: 0, max: 3 }) },
      generateMetadata
    ),
    audit: generateAudit(),
    publishedAt: new Date().toISOString(),
    deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null // 5% de probabilidad de estar eliminado
  };
}

// Función para generar niveles de habilidad para una habilidad específica
function generateSkillLevels(skillId, startIndex) {
  const levelNames = ['Principiante', 'Básico', 'Intermedio', 'Avanzado', 'Experto'];
  const levelDescriptions = [
    'Conocimiento básico y familiaridad con los conceptos fundamentales',
    'Capacidad para realizar tareas básicas con ayuda ocasional',
    'Competencia para trabajar de forma independiente en la mayoría de las tareas',
    'Dominio profundo y capacidad para resolver problemas complejos',
    'Maestría completa y capacidad para innovar y enseñar a otros'
  ];
  
  // Determinar aleatoriamente cuál será el nivel predeterminado (normalmente el nivel 1 o 2)
  const defaultLevelIndex = faker.helpers.arrayElement([0, 1]);
  
  const levels = [];
  for (let i = 0; i < SKILL_LEVEL_COUNT; i++) {
    const levelIndex = startIndex + i;
    const isDefault = i === defaultLevelIndex;
    
    levels.push({
      id: levelIndex,
      name: levelNames[i],
      description: levelDescriptions[i],
      value: i + 1,
      icon: faker.helpers.arrayElement(['star', 'stars', 'grade', 'trending_up', 'emoji_events']),
      color: faker.color.rgb({ format: 'hex' }),
      isDefault,
      criteria: `Para alcanzar el nivel ${levelNames[i]}, debes: ${faker.lorem.paragraph()}`,
      skill: skillId,
      metadata: Array.from(
        { length: faker.number.int({ min: 0, max: 2 }) },
        generateMetadata
      ),
      audit: generateAudit(),
      publishedAt: new Date().toISOString(),
      deletedAt: faker.datatype.boolean(0.02) ? faker.date.recent().toISOString() : null // 2% de probabilidad de estar eliminado
    });
  }
  
  return levels;
}

// Función principal para generar todos los datos
function generateData() {
  console.log('Generando datos de categorías, habilidades y niveles...');

  // Generar categorías
  const categories = [];
  for (let i = 1; i <= CATEGORY_COUNT; i++) {
    // Pasar las categorías existentes para establecer relaciones padre-hijo
    const category = generateCategory(i, categories);
    categories.push(category);
  }
  console.log(`Generadas ${categories.length} categorías`);
  
  // Generar habilidades
  const skills = [];
  for (let i = 1; i <= SKILL_COUNT; i++) {
    // Pasar las habilidades existentes para establecer relaciones padre-hijo
    const skill = generateSkill(i, categories, skills);
    skills.push(skill);
    
    if (i % 10 === 0) {
      console.log(`Generadas ${i} habilidades...`);
    }
  }
  
  // Generar niveles de habilidad
  const skillLevels = [];
  let levelIndex = 1;
  
  skills.forEach(skill => {
    // Generar los 5 niveles para esta habilidad
    const levels = generateSkillLevels(skill.id, levelIndex);
    skillLevels.push(...levels);
    levelIndex += SKILL_LEVEL_COUNT;
  });
  
  console.log(`Generados ${skillLevels.length} niveles de habilidad`);
  
  // Crear objeto de datos completo
  const data = {
    categories,
    skills,
    skillLevels,
    meta: {
      generated: new Date().toISOString(),
      count: {
        categories: categories.length,
        skills: skills.length,
        skillLevels: skillLevels.length
      }
    }
  };

  // Guardar en archivo
  const outputPath = path.resolve(outputFile);
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

  console.log(`Datos generados exitosamente en ${outputPath}`);
  console.log(`Total: ${categories.length} categorías, ${skills.length} habilidades, ${skillLevels.length} niveles de habilidad`);
}

// Ejecutar la generación de datos
generateData();