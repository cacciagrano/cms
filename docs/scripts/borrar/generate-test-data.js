/**
 * Script de Generación de Datos de Prueba para Strapi GraphQL
 * 
 * Este script genera datos de prueba para un sistema basado en Strapi v5.12.6
 * con GraphQL, creando habilidades, niveles de habilidad, miembros, proyectos y sus relaciones.
 * 
 * Uso: node generate-test-data.js [--members=100] [--output=data.json] [--import]
 * 
 * Opciones:
 *   --members=N     Número de miembros a generar (predeterminado: 50)
 *   --output=FILE   Archivo de salida para los datos JSON (predeterminado: strapi-test-data.json)
 *   --import        Importar datos directamente a Strapi usando GraphQL
 *   --endpoint=URL  URL del endpoint GraphQL (predeterminado: http://localhost:1337/graphql)
 */

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');
const { request, gql } = require('graphql-request');
const { program } = require('commander');

// Configurar opciones de línea de comandos
program
  .option('--members <number>', 'Número de miembros a generar', 50)
  .option('--output <file>', 'Archivo de salida para los datos JSON', 'strapi-test-data.json')
  .option('--import', 'Importar datos directamente a Strapi usando GraphQL', false)
  .option('--endpoint <url>', 'URL del endpoint GraphQL', 'http://localhost:1337/graphql')
  .parse(process.argv);

const options = program.opts();

// Configuraciones
const NUM_MEMBERS = parseInt(options.members);
const OUTPUT_FILE = options.output;
const SHOULD_IMPORT = options.import;
const GRAPHQL_ENDPOINT = options.endpoint;

// Constantes para generación de datos
const SKILL_CATEGORIES = [
  { id: 1, name: 'CAD', description: 'Diseño asistido por computadora', icon: 'computer', color: '#4285F4' },
  { id: 2, name: 'Electronics', description: 'Electrónica y circuitos', icon: 'chip', color: '#EA4335' },
  { id: 3, name: 'Woodworking', description: 'Trabajo en madera', icon: 'saw', color: '#FBBC05' },
  { id: 4, name: 'Programming', description: 'Programación y desarrollo de software', icon: 'code', color: '#34A853' },
  { id: 5, name: 'Metalwork', description: 'Trabajo en metal', icon: 'hammer', color: '#8F8F8F' },
  { id: 6, name: '3D Printing', description: 'Impresión 3D y fabricación aditiva', icon: 'printer3d', color: '#FF6D01' },
  { id: 7, name: 'Laser Cutting', description: 'Corte y grabado láser', icon: 'laser', color: '#FF0266' },
  { id: 8, name: 'CNC', description: 'Control numérico computarizado', icon: 'cnc', color: '#673AB7' },
  { id: 9, name: 'IoT', description: 'Internet de las cosas', icon: 'wifi', color: '#03A9F4' },
  { id: 10, name: 'Robotics', description: 'Robótica y automatización', icon: 'robot', color: '#009688' }
];

const MEMBERSHIP_TYPES = ['Basic', 'Standard', 'Premium', 'Instructor', 'Corporate'];
const MEMBER_STATUSES = ['active', 'inactive', 'suspended', 'pending', 'alumni'];
const PROJECT_STATUSES = ['planning', 'active', 'paused', 'completed', 'cancelled'];
const PROJECT_CATEGORIES = ['technology', 'art', 'education', 'social', 'environmental', 'business', 'research', 'other'];
const PROJECT_VISIBILITIES = ['public', 'members_only', 'private', 'invitation_only'];

// Generar niveles de habilidad
function generateSkillLevels() {
  return [
    { id: 1, name: 'Beginner', description: 'Conocimientos básicos', value: 1, icon: 'star_outline', color: '#4CAF50', isDefault: true, criteria: 'Comprensión básica de conceptos fundamentales' },
    { id: 2, name: 'Intermediate', description: 'Conocimientos intermedios', value: 2, icon: 'star_half', color: '#2196F3', isDefault: false, criteria: 'Capacidad para trabajar de forma independiente en tareas estándar' },
    { id: 3, name: 'Advanced', description: 'Conocimientos avanzados', value: 3, icon: 'star', color: '#FFC107', isDefault: false, criteria: 'Dominio de técnicas avanzadas y resolución de problemas complejos' },
    { id: 4, name: 'Expert', description: 'Conocimientos expertos', value: 4, icon: 'stars', color: '#FF5722', isDefault: false, criteria: 'Capacidad para innovar y enseñar a otros' },
    { id: 5, name: 'Master', description: 'Maestría', value: 5, icon: 'auto_awesome', color: '#9C27B0', isDefault: false, criteria: 'Reconocimiento en la comunidad y contribuciones significativas' }
  ];
}

// Generar un conjunto de habilidades
function generateSkills(numSkills = 50) {
  const skills = [];
  const skillLevels = generateSkillLevels();
  
  // Habilidades predefinidas por categoría
  const skillsByCategory = {
    'CAD': ['Fusion 360', 'SolidWorks', 'AutoCAD', 'Blender', 'SketchUp', 'Rhino', 'OnShape'],
    'Electronics': ['Circuit Design', 'PCB Layout', 'Soldering', 'Microcontrollers', 'Analog Electronics', 'Digital Electronics', 'Power Systems'],
    'Woodworking': ['Joinery', 'Turning', 'Carving', 'Furniture Making', 'Finishing', 'CNC Woodworking'],
    'Programming': ['Python', 'JavaScript', 'C++', 'Arduino', 'Raspberry Pi', 'Web Development', 'Mobile Apps', 'Embedded Systems'],
    'Metalwork': ['Welding', 'Machining', 'Sheet Metal', 'Casting', 'Forging', 'Metal Finishing'],
    '3D Printing': ['FDM Printing', 'Resin Printing', 'Multi-material Printing', '3D Modeling for Print', 'Print Finishing', 'Print Repair'],
    'Laser Cutting': ['Vector Design', 'Raster Engraving', 'Material Selection', 'Laser Safety', 'Multi-layer Design'],
    'CNC': ['CAM Programming', 'Tool Selection', 'Material Fixturing', 'G-code', 'CNC Maintenance'],
    'IoT': ['Sensors', 'Actuators', 'Wireless Communication', 'Cloud Integration', 'Data Visualization'],
    'Robotics': ['Robot Kinematics', 'Sensor Integration', 'Control Systems', 'Robot Programming', 'Computer Vision']
  };
  
  let id = 1;
  
  // Crear habilidades para cada categoría
  for (const category of SKILL_CATEGORIES) {
    const categorySkills = skillsByCategory[category.name] || [];
    
    for (const skillName of categorySkills) {
      // Determinar si esta habilidad tendrá una habilidad padre
      const hasParent = faker.datatype.boolean(0.2); // 20% de probabilidad
      let parentSkillId = null;
      
      if (hasParent && id > 5) { // Solo asignar padres si ya tenemos algunas habilidades
        parentSkillId = faker.number.int({ min: 1, max: id - 1 });
      }
      
      // Crear la habilidad
      const skill = {
        id,
        name: skillName,
        description: faker.lorem.sentence(),
        slug: skillName.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        icon: faker.helpers.arrayElement(['star', 'build', 'code', 'brush', 'settings', 'science']),
        color: faker.internet.color(),
        isActive: faker.datatype.boolean(0.9), // 90% activas
        isVerifiable: faker.datatype.boolean(0.8), // 80% verificables
        verificationCriteria: faker.datatype.boolean(0.7) ? faker.lorem.paragraph() : null,
        parentSkillId,
        categoryId: category.id,
        // Los niveles se asignarán después
        levels: []
      };
      
      // Asignar niveles a esta habilidad
      // Cada habilidad tendrá entre 3 y 5 niveles
      const numLevels = faker.number.int({ min: 3, max: 5 });
      const selectedLevels = skillLevels.slice(0, numLevels);
      
      skill.levels = selectedLevels.map(level => ({
        ...level,
        skillId: id
      }));
      
      skills.push(skill);
      id++;
    }
  }
  
  return skills.slice(0, numSkills);
}

// Generar un miembro
function generateMember(id, skills) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const joinDate = faker.date.past({ years: 5 });
  
  // Generar habilidades para este miembro (entre 1 y 8)
  const numSkills = faker.number.int({ min: 1, max: 8 });
  const memberSkills = [];
  
  // Seleccionar habilidades aleatorias
  const selectedSkillIds = new Set();
  while (selectedSkillIds.size < numSkills && selectedSkillIds.size < skills.length) {
    const skillIndex = faker.number.int({ min: 0, max: skills.length - 1 });
    selectedSkillIds.add(skillIndex);
  }
  
  // Crear las habilidades del miembro
  let skillId = 1;
  for (const skillIndex of selectedSkillIds) {
    const skill = skills[skillIndex];
    
    // Seleccionar un nivel aleatorio para esta habilidad
    const levelIndex = faker.number.int({ min: 0, max: skill.levels.length - 1 });
    const level = skill.levels[levelIndex];
    
    const isVerified = faker.datatype.boolean(0.7); // 70% de probabilidad de estar verificado
    let verifiedBy = null;
    let verifiedAt = null;
    
    if (isVerified) {
      verifiedBy = faker.number.int({ min: 1, max: 10 }); // Asumimos que hay algunos verificadores
      verifiedAt = faker.date.between({ from: joinDate, to: new Date() });
    }
    
    memberSkills.push({
      id: skillId++,
      skillId: skill.id,
      skillName: skill.name,
      levelId: level.id,
      levelName: level.name,
      levelValue: level.value,
      isVerified,
      verifiedBy,
      verifiedAt: verifiedAt ? verifiedAt.toISOString() : null,
      yearsExperience: faker.number.float({ min: 0.5, max: 10, precision: 0.5 }),
      isPublic: faker.datatype.boolean(0.9),
      isAvailableForProjects: faker.datatype.boolean(0.6),
      notes: faker.lorem.sentence()
    });
  }
  
  // Generar datos de contacto
  const contactInfo = {
    email: faker.internet.email({ firstName, lastName }),
    phone: faker.phone.number(),
    website: faker.datatype.boolean(0.3) ? faker.internet.url() : null,
    socialMedia: {
      linkedin: faker.datatype.boolean(0.5) ? `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${faker.string.alphanumeric(6)}` : null,
      twitter: faker.datatype.boolean(0.4) ? `https://twitter.com/${firstName.toLowerCase()}${faker.string.alphanumeric(4)}` : null,
      instagram: faker.datatype.boolean(0.3) ? `https://instagram.com/${firstName.toLowerCase()}_${faker.string.alphanumeric(5)}` : null
    }
  };
  
  // Generar información de perfil
  const profileInfo = {
    pronouns: faker.helpers.arrayElement(['he/him', 'she/her', 'they/them', null]),
    occupation: faker.person.jobTitle(),
    organization: faker.datatype.boolean(0.7) ? faker.company.name() : null,
    education: faker.datatype.boolean(0.6) ? faker.helpers.arrayElement(['High School', 'Bachelor', 'Master', 'PhD', 'Self-taught']) : null,
    languages: faker.helpers.arrayElements(['English', 'Spanish', 'French', 'German', 'Chinese', 'Portuguese'], { min: 1, max: 3 })
  };
  
  // Generar contacto de emergencia
  const emergencyContact = {
    name: faker.person.fullName(),
    relationship: faker.helpers.arrayElement(['Family', 'Friend', 'Partner', 'Spouse', 'Colleague']),
    phone: faker.phone.number()
  };
  
  // Generar preferencias
  const preferences = {
    notifications: {
      email: faker.datatype.boolean(0.8),
      sms: faker.datatype.boolean(0.4),
      app: faker.datatype.boolean(0.6)
    },
    privacy: {
      showProfile: faker.datatype.boolean(0.9),
      showSkills: faker.datatype.boolean(0.8),
      showProjects: faker.datatype.boolean(0.7)
    },
    theme: faker.helpers.arrayElement(['light', 'dark', 'system']),
    language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de'])
  };
  
  return {
    id,
    memberCode: `M${String(id).padStart(5, '0')}`,
    firstName,
    lastName,
    displayName: faker.datatype.boolean(0.3) ? faker.internet.userName({ firstName, lastName }) : `${firstName} ${lastName}`,
    joinDate: joinDate.toISOString().split('T')[0],
    memberStatus: faker.helpers.arrayElement(MEMBER_STATUSES),
    contactInfo,
    profileInfo,
    emergencyContact,
    preferences,
    bio: faker.lorem.paragraphs(2),
    interests: faker.helpers.arrayElements(
      ['Technology', 'Art', 'Science', 'Education', 'Environment', 'Community', 'Design', 'Engineering', 'Music', 'Photography', 'Sustainability'],
      { min: 2, max: 6 }
    ),
    isPublicProfile: faker.datatype.boolean(0.8),
    skills: memberSkills,
    // Estos campos se llenarán después cuando creemos proyectos
    ownedProjects: [],
    projects: []
  };
}

// Generar un proyecto
function generateProject(id, members) {
  // Seleccionar un propietario aleatorio
  const ownerIndex = faker.number.int({ min: 0, max: members.length - 1 });
  const owner = members[ownerIndex];
  
  // Determinar fechas del proyecto
  const startDate = faker.date.recent({ days: 365 * 2 }); // En los últimos 2 años
  const projectStatus = faker.helpers.arrayElement(PROJECT_STATUSES);
  
  let endDate = null;
  if (['completed', 'cancelled'].includes(projectStatus)) {
    endDate = faker.date.between({ from: startDate, to: new Date() });
  } else if (projectStatus !== 'planning') {
    // Para proyectos activos o pausados, podría haber una fecha de finalización estimada en el futuro
    if (faker.datatype.boolean(0.7)) {
      endDate = faker.date.future({ years: 1, refDate: startDate });
    }
  }
  
  // Generar título y descripción
  const title = faker.helpers.arrayElement([
    `${faker.word.adjective()} ${faker.word.noun()} ${faker.word.noun()}`,
    `${faker.company.buzzNoun()} ${faker.company.buzzVerb()}`,
    `${faker.word.adjective()} ${faker.commerce.productName()}`,
    `${faker.hacker.ingverb()} ${faker.hacker.noun()}`
  ]);
  
  // Seleccionar miembros aleatorios para el proyecto (entre 1 y 5 adicionales)
  const numProjectMembers = faker.number.int({ min: 1, max: 5 });
  const projectMemberIds = new Set([owner.id]); // Incluir al propietario
  
  while (projectMemberIds.size < numProjectMembers + 1 && projectMemberIds.size < members.length) {
    const memberIndex = faker.number.int({ min: 0, max: members.length - 1 });
    const memberId = members[memberIndex].id;
    if (memberId !== owner.id) { // No incluir al propietario dos veces
      projectMemberIds.add(memberId);
    }
  }
  
  // Convertir a array y eliminar al propietario (ya que estará en owner)
  const projectMembers = Array.from(projectMemberIds).filter(memberId => memberId !== owner.id);
  
  // Generar etiquetas para el proyecto
  const tags = faker.helpers.arrayElements(
    ['innovation', 'sustainability', 'education', 'community', 'technology', 'art', 'science', 'engineering', 'social', 'environmental', 'research', 'prototype'],
    { min: 2, max: 6 }
  );
  
  // Crear el proyecto
  const project = {
    id,
    title,
    slug: title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
    description: faker.lorem.paragraphs(3),
    shortDescription: faker.lorem.sentence(),
    projectStatus,
    visibility: faker.helpers.arrayElement(PROJECT_VISIBILITIES),
    startDate: startDate.toISOString().split('T')[0],
    endDate: endDate ? endDate.toISOString().split('T')[0] : null,
    estimatedDuration: faker.helpers.arrayElement(['2 weeks', '1 month', '3 months', '6 months', '1 year']),
    category: faker.helpers.arrayElement(PROJECT_CATEGORIES),
    tags,
    website: faker.datatype.boolean(0.3) ? faker.internet.url() : null,
    repositoryUrl: faker.datatype.boolean(0.4) ? `https://github.com/user/${title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-')}` : null,
    budget: faker.datatype.boolean(0.6) ? faker.number.float({ min: 100, max: 10000, precision: 0.01 }) : null,
    currency: 'EUR',
    isFunded: faker.datatype.boolean(0.3),
    fundingSource: faker.datatype.boolean(0.3) ? faker.helpers.arrayElement(['Self-funded', 'Grant', 'Crowdfunding', 'Sponsorship', 'Organization']) : null,
    isOpenSource: faker.datatype.boolean(0.5),
    license: faker.datatype.boolean(0.5) ? faker.helpers.arrayElement(['MIT', 'GPL', 'Apache', 'Creative Commons', 'Proprietary']) : null,
    ownerId: owner.id,
    memberIds: projectMembers
  };
  
  // Actualizar los miembros con este proyecto
  owner.ownedProjects.push(id);
  for (const memberId of projectMemberIds) {
    const member = members.find(m => m.id === memberId);
    if (member) {
      member.projects.push(id);
    }
  }
  
  return project;
}

// Función principal para generar todos los datos
async function generateData() {
  console.log(`Generando datos de prueba para ${NUM_MEMBERS} miembros...`);
  
  // Generar habilidades y niveles
  const skills = generateSkills();
  console.log(`Generadas ${skills.length} habilidades con sus niveles`);
  
  // Generar miembros
  const members = [];
  for (let i = 1; i <= NUM_MEMBERS; i++) {
    members.push(generateMember(i, skills));
    if (i % 10 === 0) {
      console.log(`Generados ${i} miembros...`);
    }
  }
  console.log(`Generados ${members.length} miembros con sus habilidades`);
  
  // Generar proyectos (aproximadamente 1 proyecto por cada 3 miembros)
  const numProjects = Math.ceil(NUM_MEMBERS / 3);
  const projects = [];
  
  for (let i = 1; i <= numProjects; i++) {
    projects.push(generateProject(i, members));
  }
  console.log(`Generados ${projects.length} proyectos`);
  
  // Crear el objeto de datos completo
  const data = {
    categories: SKILL_CATEGORIES,
    skills,
    members,
    projects,
    metadata: {
      generated: new Date().toISOString(),
      counts: {
        categories: SKILL_CATEGORIES.length,
        skills: skills.length,
        members: members.length,
        projects: projects.length
      }
    }
  };
  
  // Guardar los datos en un archivo JSON
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
  console.log(`Datos guardados en ${OUTPUT_FILE}`);
  
  // Importar datos a Strapi si se solicitó
  if (SHOULD_IMPORT) {
    await importDataToStrapi(data);
  }
  
  return data;
}

// Función para importar datos a Strapi usando GraphQL
async function importDataToStrapi(data) {
  console.log(`Importando datos a Strapi en ${GRAPHQL_ENDPOINT}...`);
  
  // Definir las mutaciones GraphQL
  const CREATE_SKILL_CATEGORY = gql`
    mutation CreateSkillCategory($data: SkillcategoryInput!) {
      createSkillcategory(data: $data) {
        data {
          id
        }
      }
    }
  `;
  
  const CREATE_SKILL = gql`
    mutation CreateSkill($data: SkillInput!) {
      createSkill(data: $data) {
        data {
          id
        }
      }
    }
  `;
  
  const CREATE_SKILL_LEVEL = gql`
    mutation CreateSkillLevel($data: SkilllevelInput!) {
      createSkilllevel(data: $data) {
        data {
          id
        }
      }
    }
  `;
  
  const CREATE_MEMBER = gql`
    mutation CreateMember($data: MemberInput!) {
      createMember(data: $data) {
        data {
          id
        }
      }
    }
  `;
  
  const CREATE_MEMBER_SKILL = gql`
    mutation CreateMemberSkill($data: MemberskillInput!) {
      createMemberskill(data: $data) {
        data {
          id
        }
      }
    }
  `;
  
  const CREATE_PROJECT = gql`
    mutation CreateProject($data: ProjectInput!) {
      createProject(data: $data) {
        data {
          id
        }
      }
    }
  `;
  
  // Mapeo de IDs locales a IDs de Strapi
  const idMappings = {
    categories: {},
    skills: {},
    skillLevels: {},
    members: {},
    projects: {}
  };
  
  try {
    // 1. Importar categorías de habilidades
    console.log("Importando categorías de habilidades...");
    for (const [index, category] of data.categories.entries()) {
      try {
        const categoryData = {
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color,
          publishedAt: new Date().toISOString()
        };
        
        const result = await request(GRAPHQL_ENDPOINT, CREATE_SKILL_CATEGORY, { data: categoryData });
        const strapiId = result.createSkillcategory.data.id;
        idMappings.categories[category.id] = strapiId;
        
        console.log(`Importada categoría ${index + 1}/${data.categories.length}: ${category.name}`);
        
        // Pequeña pausa para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error importando categoría ${category.name}:`, error.message);
      }
    }
    
    // 2. Importar habilidades
    console.log("Importando habilidades...");
    for (const [index, skill] of data.skills.entries()) {
      try {
        const skillData = {
          name: skill.name,
          description: skill.description,
          slug: skill.slug,
          icon: skill.icon,
          color: skill.color,
          isActive: skill.isActive,
          isVerifiable: skill.isVerifiable,
          verificationCriteria: skill.verificationCriteria,
          category: idMappings.categories[skill.categoryId],
          publishedAt: new Date().toISOString()
        };
        
        // Si tiene habilidad padre, añadirla
        if (skill.parentSkillId && idMappings.skills[skill.parentSkillId]) {
          skillData.parentSkill = idMappings.skills[skill.parentSkillId];
        }
        
        const result = await request(GRAPHQL_ENDPOINT, CREATE_SKILL, { data: skillData });
        const strapiId = result.createSkill.data.id;
        idMappings.skills[skill.id] = strapiId;
        
        if ((index + 1) % 10 === 0) {
          console.log(`Importadas ${index + 1}/${data.skills.length} habilidades...`);
        }
        
        // Pequeña pausa para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Error importando habilidad ${skill.name}:`, error.message);
      }
    }
    
    // 3. Importar niveles de habilidad
    console.log("Importando niveles de habilidad...");
    let levelCount = 0;
    let totalLevels = data.skills.reduce((acc, skill) => acc + skill.levels.length, 0);
    
    for (const skill of data.skills) {
      for (const level of skill.levels) {
        try {
          const levelData = {
            name: level.name,
            description: level.description,
            value: level.value,
            icon: level.icon,
            color: level.color,
            isDefault: level.isDefault,
            criteria: level.criteria,
            skill: idMappings.skills[skill.id],
            publishedAt: new Date().toISOString()
          };
          
          const result = await request(GRAPHQL_ENDPOINT, CREATE_SKILL_LEVEL, { data: levelData });
          const strapiId = result.createSkilllevel.data.id;
          idMappings.skillLevels[`${skill.id}_${level.id}`] = strapiId;
          
          levelCount++;
          if (levelCount % 20 === 0) {
            console.log(`Importados ${levelCount}/${totalLevels} niveles de habilidad...`);
          }
          
          // Pequeña pausa para no sobrecargar el servidor
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error importando nivel ${level.name} para habilidad ${skill.name}:`, error.message);
        }
      }
    }
    
    // 4. Importar miembros
    console.log("Importando miembros...");
    for (const [index, member] of data.members.entries()) {
      try {
        const memberData = {
          firstName: member.firstName,
          lastName: member.lastName,
          displayName: member.displayName,
          memberCode: member.memberCode,
          joinDate: member.joinDate,
          memberStatus: member.memberStatus,
          bio: member.bio,
          isPublicProfile: member.isPublicProfile,
          profileInfo: {
            pronouns: member.profileInfo.pronouns,
            occupation: member.profileInfo.occupation,
            organization: member.profileInfo.organization,
            education: member.profileInfo.education,
            languages: member.profileInfo.languages
          },
          contactInfo: {
            email: member.contactInfo.email,
            phone: member.contactInfo.phone,
            website: member.contactInfo.website,
            socialMedia: member.contactInfo.socialMedia
          },
          emergencyContact: {
            name: member.emergencyContact.name,
            relationship: member.emergencyContact.relationship,
            phone: member.emergencyContact.phone
          },
          preferences: member.preferences,
          interests: member.interests,
          publishedAt: new Date().toISOString()
        };
        
        const result = await request(GRAPHQL_ENDPOINT, CREATE_MEMBER, { data: memberData });
        const strapiId = result.createMember.data.id;
        idMappings.members[member.id] = strapiId;
        
        if ((index + 1) % 10 === 0) {
          console.log(`Importados ${index + 1}/${data.members.length} miembros...`);
        }
        
        // Pequeña pausa para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.error(`Error importando miembro ${member.firstName} ${member.lastName}:`, error.message);
      }
    }
    
    // 5. Importar habilidades de miembros
    console.log("Importando habilidades de miembros...");
    let skillCount = 0;
    let totalSkills = data.members.reduce((acc, member) => acc + member.skills.length, 0);
    
    for (const member of data.members) {
      for (const skill of member.skills) {
        try {
          const memberSkillData = {
            member: idMappings.members[member.id],
            skill: idMappings.skills[skill.skillId],
            level: idMappings.skillLevels[`${skill.skillId}_${skill.levelId}`],
            isVerified: skill.isVerified,
            verifiedAt: skill.verifiedAt,
            yearsExperience: skill.yearsExperience,
            isPublic: skill.isPublic,
            isAvailableForProjects: skill.isAvailableForProjects,
            notes: skill.notes,
            publishedAt: new Date().toISOString()
          };
          
          // Si hay un verificador, añadirlo
          if (skill.verifiedBy && idMappings.members[skill.verifiedBy]) {
            memberSkillData.verifiedBy = idMappings.members[skill.verifiedBy];
          }
          
          await request(GRAPHQL_ENDPOINT, CREATE_MEMBER_SKILL, { data: memberSkillData });
          skillCount++;
          
          if (skillCount % 20 === 0) {
            console.log(`Importadas ${skillCount}/${totalSkills} habilidades de miembros...`);
          }
          
          // Pequeña pausa para no sobrecargar el servidor
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Error importando habilidad ${skill.skillName} para miembro ${member.firstName} ${member.lastName}:`, error.message);
        }
      }
    }
    
    // 6. Importar proyectos
    console.log("Importando proyectos...");
    for (const [index, project] of data.projects.entries()) {
      try {
        const projectData = {
          title: project.title,
          slug: project.slug,
          description: project.description,
          shortDescription: project.shortDescription,
          projectStatus: project.projectStatus,
          visibility: project.visibility,
          startDate: project.startDate,
          endDate: project.endDate,
          estimatedDuration: project.estimatedDuration,
          category: project.category,
          tags: project.tags,
          website: project.website,
          repositoryUrl: project.repositoryUrl,
          budget: project.budget,
          currency: project.currency,
          isFunded: project.isFunded,
          fundingSource: project.fundingSource,
          isOpenSource: project.isOpenSource,
          license: project.license,
          owner: idMappings.members[project.ownerId],
          members: project.memberIds.map(id => idMappings.members[id]).filter(id => id),
          publishedAt: new Date().toISOString()
        };
        
        const result = await request(GRAPHQL_ENDPOINT, CREATE_PROJECT, { data: projectData });
        const strapiId = result.createProject.data.id;
        idMappings.projects[project.id] = strapiId;
        
        if ((index + 1) % 5 === 0) {
          console.log(`Importados ${index + 1}/${data.projects.length} proyectos...`);
        }
        
        // Pequeña pausa para no sobrecargar el servidor
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (error) {
        console.error(`Error importando proyecto ${project.title}:`, error.message);
      }
    }
    
    console.log("Importación completada con éxito!");
    
    // Guardar el mapeo de IDs para referencia futura
    fs.writeFileSync('id-mappings.json', JSON.stringify(idMappings, null, 2));
    console.log("Mapeo de IDs guardado en id-mappings.json");
    
  } catch (error) {
    console.error("Error durante la importación:", error);
  }
}

// Ejecutar la función principal
generateData().catch(console.error);