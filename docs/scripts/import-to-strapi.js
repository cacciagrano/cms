const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Configuración
const STRAPI_URL = 'http://localhost:1337';
const API_TOKEN = 'tu-token-api'; // Genera uno en Strapi > Settings > API Tokens
const DATA_DIR = './data';

// Cliente axios con configuración base
const strapiClient = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_TOKEN}`
  }
});

// Mapas para almacenar las relaciones entre IDs antiguos y nuevos
const idMaps = {
  tags: {},
  skillCategories: {},
  skills: {},
  skillLevels: {},
  memberships: {},
  spaces: {},
  areas: {},
  members: {},
  equipment: {},
  tools: {},
  consumables: {},
  resources: {}
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

// Función para importar datos con manejo de errores
async function importData(endpoint, data, transformFn) {
  console.log(`\n🔄 Importando ${endpoint}...`);
  const results = [];
  const errors = [];
  
  for (const item of data) {
    try {
      const transformedItem = transformFn(item);
      const response = await strapiClient.post(`/api/${endpoint}`, transformedItem);
      const newId = response.data.data.id;
      results.push({ oldId: item.id, newId, data: response.data });
      console.log(`✅ Importado ${endpoint} ID: ${item.id} → ${newId}`);
    } catch (error) {
      console.error(`❌ Error importando ${endpoint} ID ${item.id}:`, 
        error.response?.data?.error || error.message);
      errors.push({ item, error: error.response?.data || error.message });
    }
    
    // Pequeña pausa para no sobrecargar la API
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`✅ Importados ${results.length}/${data.length} ${endpoint}`);
  if (errors.length > 0) {
    console.log(`❌ Errores: ${errors.length}`);
    fs.writeFileSync(
      `${endpoint}-errors.json`, 
      JSON.stringify(errors, null, 2)
    );
  }
  
  return results;
}

// Función principal de importación
async function importAllData() {
  console.log('🚀 Iniciando importación de datos a Strapi...');
  
  // 1. ENTIDADES INDEPENDIENTES
  
  // 1.1 Tags
  const tags = loadJsonFile('tags.json');
  const importedTags = await importData('tags', tags, 
    item => ({
      data: {
        name: item.name,
        category: item.category,
        description: item.description || '',
        color: item.color || null
      }
    })
  );
  importedTags.forEach(({ oldId, newId }) => {
    idMaps.tags[oldId] = newId;
  });
  
  // 1.2 Categorías de habilidades
  const skillCategories = loadJsonFile('skill-categories.json');
  const importedCategories = await importData('skill-categories', skillCategories, 
    item => ({
      data: {
        name: item.name,
        description: item.description,
        slug: item.slug,
        icon: item.icon || null,
        color: item.color || null,
        isActive: item.isActive !== false,
        order: item.order || 0
      }
    })
  );
  importedCategories.forEach(({ oldId, newId }) => {
    idMaps.skillCategories[oldId] = newId;
  });
  
  // 1.3 Membresías
  const memberships = loadJsonFile('memberships.json');
  const importedMemberships = await importData('memberships', memberships, 
    item => ({
      data: {
        name: item.name,
        level: item.level,
        description: item.description || '',
        price: item.price,
        duration: item.duration || 30,
        benefits: item.benefits || [],
        isActive: item.isActive !== false
      }
    })
  );
  importedMemberships.forEach(({ oldId, newId }) => {
    idMaps.memberships[oldId] = newId;
  });
  
  // 1.4 Espacios
  const spaces = loadJsonFile('spaces.json');
  const importedSpaces = await importData('spaces', spaces, 
    item => ({
      data: {
        name: item.name,
        description: item.description,
        type: item.type,
        capacity: item.capacity || 10,
        size: item.size || 0,
        floor: item.floor || null,
        building: item.building || null,
        isActive: item.isActive !== false,
        spaceStatus: item.spaceStatus || 'available',
        requiredMembershipLevel: item.requiredMembershipLevel || null,
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  importedSpaces.forEach(({ oldId, newId }) => {
    idMaps.spaces[oldId] = newId;
  });
  
  // 2. ENTIDADES CON DEPENDENCIAS SIMPLES
  
  // 2.1 Habilidades
  const skills = loadJsonFile('skills.json');
  const importedSkills = await importData('skills', skills,
    item => ({
      data: {
        name: item.name,
        description: item.description,
        slug: item.slug || item.name.toLowerCase().replace(/\s+/g, '-'),
        icon: item.icon || null,
        color: item.color || null,
        isActive: item.isActive !== false,
        isVerifiable: item.isVerifiable !== false,
        verificationCriteria: item.verificationCriteria || null,
        category: {
          connect: [idMaps.skillCategories[item.category]]
        }
      }
    })
  );
  importedSkills.forEach(({ oldId, newId }) => {
    idMaps.skills[oldId] = newId;
  });
  
  // 2.2 Niveles de habilidad
  const skillLevels = loadJsonFile('skill-levels.json');
  const importedSkillLevels = await importData('skill-levels', skillLevels,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        value: item.value,
        icon: item.icon || null,
        color: item.color || null,
        isDefault: item.isDefault === true,
        criteria: item.criteria || null,
        skill: {
          connect: [idMaps.skills[item.skill]]
        }
      }
    })
  );
  importedSkillLevels.forEach(({ oldId, newId }) => {
    idMaps.skillLevels[oldId] = newId;
  });
  
  // 2.3 Áreas
  const areas = loadJsonFile('areas.json');
  const importedAreas = await importData('areas', areas,
    item => ({
      data: {
        name: item.name,
        description: item.description,
        isActive: item.isActive !== false,
        code: item.code || `AREA-${item.id}`,
        color: item.color || '#CCCCCC',
        slug: item.slug || item.name.toLowerCase().replace(/\s+/g, '-'),
        isReservable: item.isReservable !== false,
        areaStatus: item.areaStatus || 'available',
        space: {
          connect: [idMaps.spaces[item.space]]
        },
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  importedAreas.forEach(({ oldId, newId }) => {
    idMaps.areas[oldId] = newId;
  });
  
  // 3. ENTIDADES CON MÚLTIPLES DEPENDENCIAS
  
  // 3.1 Miembros
  const members = loadJsonFile('members.json');
  const importedMembers = await importData('members', members,
    item => ({
      data: {
        firstName: item.firstName,
        lastName: item.lastName,
        displayName: item.displayName || `${item.firstName} ${item.lastName}`,
        memberCode: item.memberCode,
        joinDate: item.joinDate || new Date().toISOString().split('T')[0],
        memberStatus: item.memberStatus || 'active',
        bio: item.bio || null,
        isPublicProfile: item.isPublicProfile !== false
      }
    })
  );
  importedMembers.forEach(({ oldId, newId }) => {
    idMaps.members[oldId] = newId;
  });
  
  // 3.2 Equipamiento
  const equipment = loadJsonFile('equipment.json');
  const importedEquipment = await importData('equipment', equipment,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        internalCode: item.internalCode || `EQ-${item.id}`,
        locationType: item.locationType || 'fixed',
        area: {
          connect: [idMaps.areas[item.area]]
        },
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  importedEquipment.forEach(({ oldId, newId }) => {
    idMaps.equipment[oldId] = newId;
  });
  
  // 3.3 Herramientas
  const tools = loadJsonFile('tools.json');
  const importedTools = await importData('tools', tools,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        toolType: item.toolType || 'manual',
        internalCode: item.internalCode || `TOOL-${item.id}`,
        area: {
          connect: [idMaps.areas[item.area]]
        },
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  importedTools.forEach(({ oldId, newId }) => {
    idMaps.tools[oldId] = newId;
  });
  
  // 3.4 Consumibles
  const consumables = loadJsonFile('consumables.json');
  const importedConsumables = await importData('consumables', consumables,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        type: item.type || 'material',
        unit: item.unit || 'unit',
        isReusable: item.isReusable === true,
        consumableStatus: item.consumableStatus || 'available',
        area: {
          connect: [idMaps.areas[item.area]]
        },
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  importedConsumables.forEach(({ oldId, newId }) => {
    idMaps.consumables[oldId] = newId;
  });
  
  // 3.5 Recursos
  const resources = loadJsonFile('resources.json');
  const importedResources = await importData('resources', resources,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        type: item.type || 'book',
        format: item.format || 'physical',
        author: item.author || 'Unknown',
        publisher: item.publisher || 'Unknown',
        publicationDate: item.publicationDate || '2023-01-01',
        language: item.language || 'es',
        licenseType: item.licenseType || 'standard',
        accessLevel: item.accessLevel || 'public',
        isAvailable: item.isAvailable !== false,
        resourceStatus: item.resourceStatus || 'available',
        area: {
          connect: [idMaps.areas[item.area]]
        },
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : [],
        relatedSkills: item.relatedSkills ? 
          item.relatedSkills.map(id => idMaps.skills[id]).filter(Boolean) : []
      }
    })
  );
  importedResources.forEach(({ oldId, newId }) => {
    idMaps.resources[oldId] = newId;
  });
  
  // 4. ENTIDADES CON RELACIONES COMPLEJAS
  
  // 4.1 Habilidades de miembros
  const memberSkills = loadJsonFile('member-skills.json');
  await importData('member-skills', memberSkills,
    item => ({
      data: {
        isVerified: item.isVerified === true,
        yearsExperience: item.yearsExperience || 0,
        isPublic: item.isPublic !== false,
        isAvailableForProjects: item.isAvailableForProjects === true,
        notes: item.notes || null,
        member: {
          connect: [idMaps.members[item.member]]
        },
        skill: {
          connect: [idMaps.skills[item.skill]]
        },
        level: {
          connect: [idMaps.skillLevels[item.level]]
        },
        verifiedBy: item.verifiedBy ? {
          connect: [idMaps.members[item.verifiedBy]]
        } : null
      }
    })
  );
  
  // 4.2 Suscripciones de membresía
  const membershipSubscriptions = loadJsonFile('membership-subscriptions.json');
  await importData('membership-subscriptions', membershipSubscriptions,
    item => ({
      data: {
        startDate: item.startDate || new Date().toISOString().split('T')[0],
        endDate: item.endDate || new Date(Date.now() + 31536000000).toISOString().split('T')[0],
        status: item.status || 'active',
        paymentStatus: item.paymentStatus || 'paid',
        autoRenew: item.autoRenew === true,
        notes: item.notes || null,
        member: {
          connect: [idMaps.members[item.member]]
        },
        membership: {
          connect: [idMaps.memberships[item.membership]]
        }
      }
    })
  );
  
  // 4.3 Eventos
  const events = loadJsonFile('events.json');
  await importData('events', events,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        eventType: item.eventType || 'workshop',
        startDate: item.startDate || new Date().toISOString(),
        endDate: item.endDate || new Date(Date.now() + 7200000).toISOString(),
        capacity: item.capacity || 10,
        price: item.price || 0,
        isFree: item.price === 0 || item.isFree === true,
        isPublic: item.isPublic !== false,
        registrationRequired: item.registrationRequired !== false,
        registrationDeadline: item.registrationDeadline || item.startDate,
        status: item.status || 'scheduled',
        location: {
          connect: [idMaps.spaces[item.location]]
        },
        organizer: {
          connect: [idMaps.members[item.organizer]]
        },
        attendees: item.attendees ? {
          connect: item.attendees.map(id => idMaps.members[id]).filter(Boolean)
        } : null,
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : [],
        requiredSkills: item.requiredSkills ? 
          item.requiredSkills.map(id => idMaps.skills[id]).filter(Boolean) : [],
        providedSkills: item.providedSkills ? 
          item.providedSkills.map(id => idMaps.skills[id]).filter(Boolean) : []
      }
    })
  );
  
  // 4.4 Proyectos
  const projects = loadJsonFile('projects.json');
  await importData('projects', projects,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        projectType: item.projectType || 'personal',
        category: item.category || 'other',
        startDate: item.startDate || new Date().toISOString().split('T')[0],
        endDate: item.endDate || null,
        status: item.status || 'active',
        progress: item.progress || 0,
        isPublic: item.isPublic !== false,
        repositoryUrl: item.repositoryUrl || null,
        websiteUrl: item.websiteUrl || null,
        budget: item.budget || null,
        leader: {
          connect: [idMaps.members[item.leader]]
        },
        team: {
          connect: item.team.map(id => idMaps.members[id]).filter(Boolean)
        },
        requiredSkills: {
          connect: item.requiredSkills.map(id => idMaps.skills[id]).filter(Boolean)
        },
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  
  // 4.5 Reservas
  const reservations = loadJsonFile('reservations.json');
  await importData('reservations', reservations,
    item => {
      // Determinar el tipo de recurso y su ID correspondiente
      let resourceConnect = null;
      if (item.resourceType === 'space') {
        resourceConnect = idMaps.spaces[item.resourceId];
      } else if (item.resourceType === 'area') {
        resourceConnect = idMaps.areas[item.resourceId];
      } else if (item.resourceType === 'equipment') {
        resourceConnect = idMaps.equipment[item.resourceId];
      } else if (item.resourceType === 'tool') {
        resourceConnect = idMaps.tools[item.resourceId];
      }
      
      return {
        data: {
          resourceType: item.resourceType,
          startDate: item.startDate || new Date().toISOString(),
          endDate: item.endDate || new Date(Date.now() + 7200000).toISOString(),
          status: item.status || 'confirmed',
          reservationType: item.reservationType || 'standard',
          attendeeCount: item.attendeeCount || 1,
          purpose: item.purpose || 'general use',
          notes: item.notes || null,
          isRecurring: item.isRecurring === true,
          recurrencePattern: item.recurrencePattern || null,
          recurrenceEndDate: item.recurrenceEndDate || null,
          member: {
            connect: [idMaps.members[item.member]]
          },
          // Conectar con el recurso apropiado según el tipo
          ...(resourceConnect ? {
            [item.resourceType]: {
              connect: [resourceConnect]
            }
          } : {})
        }
      };
    }
  );
  
  // 4.6 Formaciones
  const trainings = loadJsonFile('trainings.json');
  await importData('trainings', trainings,
    item => ({
      data: {
        name: item.name,
        description: item.description || '',
        trainingType: item.trainingType || 'workshop',
        difficultyLevel: item.difficultyLevel || 'beginner',
        duration: item.duration || 60,
        sessions: item.sessions || 1,
        startDate: item.startDate || new Date().toISOString(),
        endDate: item.endDate || new Date(Date.now() + 86400000).toISOString(),
        capacity: item.capacity || 10,
        price: item.price || 0,
        isFree: item.price === 0 || item.isFree === true,
        isOnline: item.isOnline === true,
        prerequisites: item.prerequisites || [],
        learningOutcomes: item.learningOutcomes || [],
        materials: item.materials || [],
        status: item.status || 'scheduled',
        isPublic: item.isPublic !== false,
        registrationRequired: item.registrationRequired !== false,
        registrationDeadline: item.registrationDeadline || item.startDate,
        skill: {
          connect: [idMaps.skills[item.skill]]
        },
        instructor: {
          connect: [idMaps.members[item.instructor]]
        },
        location: item.location ? {
          connect: [idMaps.spaces[item.location]]
        } : null,
        tags: item.tags ? item.tags.map(id => idMaps.tags[id]).filter(Boolean) : []
      }
    })
  );
  
  // Guardar los mapas de IDs para referencia futura
  fs.writeFileSync('id-maps.json', JSON.stringify(idMaps, null, 2));
  
  console.log('\n✅ Importación completada con éxito');
  console.log('📝 Se ha guardado un mapa de IDs en id-maps.json para referencia');
}

// Ejecutar la importación
importAllData().catch(error => {
  console.error('❌ Error durante la importación:', error);
});