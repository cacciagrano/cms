/**
* Script coordinador para generar datos completos para un sistema de makerspace
* 
* Este script coordina la generación de datos para todas las entidades del sistema:
* - Tags
* - Habilidades (Categorías, Habilidades, Niveles)
* - Membresías
* - Miembros
* - Espacios
* - Áreas
* - Equipamiento, Herramientas, Consumibles y Recursos
* - Eventos
* - Proyectos
* - Reservas
* - Formaciones
* 
* Uso: node generate-makerspace-data.js [directorio_salida]
* - directorio_salida: Directorio donde se guardarán los archivos JSON (predeterminado: ./data)
*/

const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

// Configuración
const DEFAULT_OUTPUT_DIR = './data';

// Obtener argumentos de la línea de comandos
const args = process.argv.slice(2);
const outputDir = args[0] || DEFAULT_OUTPUT_DIR;

// Constantes para generación de datos
const TAG_COUNT = 30;
const SKILL_CATEGORY_COUNT = 8;
const SKILL_COUNT = 40;
const SKILL_LEVEL_COUNT = 5;
const MEMBERSHIP_COUNT = 4;
const MEMBER_COUNT = 50;
const SPACE_COUNT = 10;
const AREA_COUNT = 20;
const EQUIPMENT_COUNT = 30;
const TOOL_COUNT = 40;
const CONSUMABLE_COUNT = 25;
const RESOURCE_COUNT = 35;
const EVENT_COUNT = 20;
const PROJECT_COUNT = 15;
const RESERVATION_COUNT = 50;
const TRAINING_COUNT = 12;

// Asegurar que el directorio de salida exista
if (!fs.existsSync(outputDir)) {
 fs.mkdirSync(outputDir, { recursive: true });
}

// Función para guardar datos en un archivo JSON
function saveToFile(filename, data) {
 const filePath = path.join(outputDir, filename);
 fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
 console.log(`Datos guardados en ${filePath}`);
}

// Función para generar un componente de metadatos
function generateMetadata() {
 return {
   key: faker.helpers.arrayElement(['difficulty', 'popularity', 'relevance', 'source', 'tag', 'priority', 'department']),
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

// Función para generar un componente de geolocalización
function generateGeoLocation() {
 return {
   latitude: faker.location.latitude(),
   longitude: faker.location.longitude(),
   address: faker.location.streetAddress(),
   city: faker.location.city(),
   state: faker.location.state(),
   postalCode: faker.location.zipCode(),
   country: faker.location.country(),
   formattedAddress: `${faker.location.streetAddress()}, ${faker.location.city()}, ${faker.location.state()} ${faker.location.zipCode()}`
 };
}

// Función para generar un componente de información de contacto
function generateContactInfo() {
 return {
   email: faker.internet.email(),
   phone: faker.phone.number(),
   address: {
     street: faker.location.streetAddress(),
     city: faker.location.city(),
     state: faker.location.state(),
     postalCode: faker.location.zipCode(),
     country: faker.location.country()
   }
 };
}

// Función para generar un componente de información de perfil
function generateProfileInfo() {
 return {
   pronouns: faker.helpers.arrayElement(['he/him', 'she/her', 'they/them', null]),
   occupation: faker.person.jobTitle(),
   company: Math.random() > 0.3 ? faker.company.name() : null,
   website: Math.random() > 0.7 ? faker.internet.url() : null,
   socialLinks: {
     linkedin: Math.random() > 0.6 ? `https://linkedin.com/in/${faker.internet.userName()}` : null,
     twitter: Math.random() > 0.7 ? `https://twitter.com/${faker.internet.userName()}` : null,
     github: Math.random() > 0.5 ? `https://github.com/${faker.internet.userName()}` : null,
     instagram: Math.random() > 0.8 ? `https://instagram.com/${faker.internet.userName()}` : null
   }
 };
}

// Función para generar un componente de preferencias
function generatePreferences() {
 return {
   notifications: {
     email: faker.datatype.boolean(),
     sms: faker.datatype.boolean(),
     app: faker.datatype.boolean()
   },
   privacy: {
     showEmail: faker.datatype.boolean(),
     showPhone: faker.datatype.boolean(),
     showProjects: faker.datatype.boolean()
   },
   theme: faker.helpers.arrayElement(['light', 'dark', 'system']),
   language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de'])
 };
}

// Función para generar un componente de contacto de emergencia
function generateEmergencyContact() {
 return {
   name: faker.person.fullName(),
   relationship: faker.helpers.arrayElement(['Parent', 'Spouse', 'Sibling', 'Friend', 'Partner']),
   phone: faker.phone.number(),
   email: faker.internet.email()
 };
}

// Función para generar un componente de seguimiento
function generateTracking() {
 return {
   lastLogin: faker.date.recent().toISOString(),
   loginCount: faker.number.int({ min: 1, max: 100 }),
   lastActivity: faker.date.recent().toISOString(),
   activityLog: Array.from(
     { length: faker.number.int({ min: 1, max: 5 }) },
     () => ({
       action: faker.helpers.arrayElement(['login', 'view', 'edit', 'create', 'delete', 'reserve']),
       timestamp: faker.date.recent().toISOString(),
       details: faker.lorem.sentence()
     })
   )
 };
}

// Función para generar un tag
function generateTag(index) {
 const categories = ['Ubicación', 'Equipamiento', 'Tipo', 'Accesibilidad', 'Uso', 'Tecnología', 'Material', 'Evento'];
 const category = faker.helpers.arrayElement(categories);
 
 let name;
 switch (category) {
   case 'Ubicación':
     name = faker.helpers.arrayElement(['Centro', 'Norte', 'Sur', 'Este', 'Oeste', 'Interior', 'Exterior']);
     break;
   case 'Equipamiento':
     name = faker.helpers.arrayElement(['Alta tecnología', 'Básico', 'Completo', 'Especializado', 'Multimedia']);
     break;
   case 'Tipo':
     name = faker.helpers.arrayElement(['Silencioso', 'Colaborativo', 'Creativo', 'Formal', 'Informal']);
     break;
   case 'Accesibilidad':
     name = faker.helpers.arrayElement(['Accesible', 'Familiar', 'Pet-friendly', '24h', 'Reserva previa']);
     break;
   case 'Uso':
     name = faker.helpers.arrayElement(['Eventos', 'Formación', 'Networking', 'Producción', 'Investigación']);
     break;
   case 'Tecnología':
     name = faker.helpers.arrayElement(['Digital', 'Analógico', 'Híbrido', 'IoT', 'IA', 'Robótica']);
     break;
   case 'Material':
     name = faker.helpers.arrayElement(['Madera', 'Metal', 'Plástico', 'Textil', 'Electrónica', 'Papel']);
     break;
   case 'Evento':
     name = faker.helpers.arrayElement(['Workshop', 'Conferencia', 'Hackathon', 'Exposición', 'Demo Day']);
     break;
   default:
     name = faker.word.noun();
 }
 
 // Asegurar que el nombre sea único añadiendo un sufijo si es necesario
 name = `${name} ${index}`;
 
 return {
   id: index,
   name,
   category,
   description: faker.lorem.sentence(),
   color: faker.color.rgb({ format: 'hex' }),
   publishedAt: new Date().toISOString()
 };
}

// Función para generar una categoría de habilidad
function generateSkillCategory(index, existingCategories = []) {
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
 
 // Usar categoría predefinida si está disponible
 const predefined = PREDEFINED_CATEGORIES[index - 1];
 const name = predefined ? predefined.name : faker.helpers.unique(faker.lorem.word);
 const slug = name.toLowerCase().replace(/\s+/g, '-');
 const icon = predefined ? predefined.icon : faker.helpers.arrayElement(['computer', 'chip', 'saw', 'code', 'hammer', 'printer3d', 'laser', 'cnc']);
 
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
   color: faker.color.rgb({ format: 'hex' }),
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
   icon: faker.helpers.arrayElement(['code', 'brush', 'wrench', 'beaker', 'chip', 'terminal', 'database', 'cloud', 'camera', 'pen']),
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

// Función para generar una membresía
function generateMembership(index) {
 const names = ['Básica', 'Estándar', 'Premium', 'Corporativa'];
 const levels = ['basic', 'standard', 'premium', 'premium'];
 
 return {
   id: index,
   name: names[index - 1],
   level: levels[index - 1],
   description: faker.lorem.paragraph(),
   price: faker.number.int({ min: 50, max: 500 }),
   duration: faker.helpers.arrayElement([1, 3, 6, 12]), // meses
   benefits: Array.from(
     { length: faker.number.int({ min: 3, max: 7 }) },
     () => faker.lorem.sentence()
   ),
   isActive: faker.datatype.boolean(0.9),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString()
 };
}

// Función para generar un código de miembro único
function generateMemberCode(index) {
 return `MEM-${String(index).padStart(5, '0')}`;
}

// Función para generar un miembro
function generateMember(index) {
 const firstName = faker.person.firstName();
 const lastName = faker.person.lastName();
 const displayName = Math.random() > 0.7 ? faker.internet.userName() : null;
 const joinDate = faker.date.past({ years: 5 });
 
 return {
   id: index,
   firstName,
   lastName,
   displayName,
   memberCode: generateMemberCode(index),
   joinDate: joinDate.toISOString().split('T')[0],
   memberStatus: faker.helpers.arrayElement(['active', 'inactive', 'suspended', 'pending', 'alumni']),
   profileInfo: generateProfileInfo(),
   contactInfo: generateContactInfo(),
   preferences: generatePreferences(),
   emergencyContact: generateEmergencyContact(),
   bio: faker.lorem.paragraphs(2),
   interests: {
     technology: Array.from(
       { length: faker.number.int({ min: 1, max: 5 }) },
       () => faker.lorem.word()
     ),
     art: Array.from(
       { length: faker.number.int({ min: 0, max: 3 }) },
       () => faker.lorem.word()
     ),
     science: Array.from(
       { length: faker.number.int({ min: 0, max: 3 }) },
       () => faker.lorem.word()
     )
   },
   isPublicProfile: faker.datatype.boolean(),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     generateMetadata
   ),
   tracking: generateTracking(),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar habilidades para un miembro
// MODIFICADA: Cambié el nombre del parámetro 'skills' a 'availableSkills' para evitar confusión
function generateMemberSkills(memberId, availableSkills, skillLevels) {
 // Determinar cuántas habilidades tendrá este miembro
 // MODIFICADO: Asegurar que skillCount nunca sea mayor que la cantidad de habilidades disponibles
 const skillCount = faker.number.int({ min: 1, max: Math.min(8, availableSkills.length) });
 
 // Seleccionar habilidades aleatorias sin repetir
 const selectedSkills = faker.helpers.arrayElements(
   availableSkills,
   skillCount
 );
 
 // Generar las habilidades del miembro
 return selectedSkills.map((skill, index) => {
   const createdAt = faker.date.past({ years: 1 });
   const isVerified = Math.random() > 0.5;
   let verifiedAt = null;
   let verifiedById = null;
   
   if (isVerified) {
     verifiedAt = faker.date.between({ from: createdAt, to: new Date() });
     // Asumimos que el verificador es otro miembro con ID entre 1 y memberCount
     // MODIFICADO: Asegurar que verifiedById nunca sea 0 o negativo
     verifiedById = memberId > 1 ? faker.number.int({ min: 1, max: memberId - 1 }) : null;
   }
   
   // Encontrar los niveles disponibles para esta habilidad
   const availableLevels = skillLevels.filter(level => level.skill === skill.id);
   // MODIFICADO: Verificar que hay niveles disponibles antes de seleccionar uno
   const selectedLevel = availableLevels.length > 0 ? 
     faker.helpers.arrayElement(availableLevels) : 
     { id: 1 }; // Valor predeterminado si no hay niveles
   
   return {
     id: (memberId - 1) * 10 + index + 1,
     member: memberId,
     skill: skill.id,
     level: selectedLevel.id,
     isVerified,
     verifiedBy: verifiedById,
     verifiedAt: verifiedAt ? verifiedAt.toISOString() : null,
     yearsExperience: faker.number.float({ min: 0.5, max: 15, precision: 0.5 }),
     isPublic: faker.datatype.boolean(0.8), // 80% de probabilidad de ser público
     isAvailableForProjects: faker.datatype.boolean(0.6), // 60% de probabilidad
     notes: Math.random() > 0.7 ? faker.lorem.paragraph() : null,
     audit: generateAudit()
   };
 });
}

// Función para generar una suscripción de membresía
function generateMembershipSubscription(memberId, membershipId) {
 const startDate = faker.date.recent(90);
 const duration = faker.helpers.arrayElement([1, 3, 6, 12]); // meses
 
 // Calcular fecha de fin basada en la duración
 const endDate = new Date(startDate);
 endDate.setMonth(endDate.getMonth() + duration);
 
 return {
   id: memberId,
   member: memberId,
   membership: membershipId,
   startDate: startDate.toISOString().split('T')[0],
   endDate: endDate.toISOString().split('T')[0],
   status: faker.helpers.arrayElement(['active', 'expired', 'cancelled', 'pending']),
   paymentStatus: faker.helpers.arrayElement(['paid', 'pending', 'failed', 'refunded']),
   autoRenew: faker.datatype.boolean(0.7),
   notes: Math.random() > 0.8 ? faker.lorem.sentence() : null,
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit()
 };
}

// Función para generar un espacio
function generateSpace(index) {
 // Tipos de espacio
 const types = ['meeting_room', 'classroom', 'coworking', 'office', 'lab', 'workshop', 'other'];
 const type = faker.helpers.arrayElement(types);
 
 // Nombres según el tipo
 const spaceNames = {
   meeting_room: ['Sala de Reuniones A', 'Sala de Conferencias', 'Sala de Juntas', 'Sala de Proyectos', 'Sala Colaborativa'],
   classroom: ['Aula de Formación 1', 'Aula Digital', 'Aula Maker', 'Espacio Educativo', 'Aula Multimedia'],
   coworking: ['Coworking Abierto', 'Zona Flex', 'Espacio Colaborativo', 'Hub Central', 'Área de Trabajo Compartido'],
   office: ['Oficina Privada 1', 'Despacho Ejecutivo', 'Oficina Compartida', 'Suite Empresarial', 'Espacio Profesional'],
   lab: ['Laboratorio Digital', 'Lab de Prototipado', 'Laboratorio de Innovación', 'Espacio de Experimentación', 'Lab Creativo'],
   workshop: ['Taller de Fabricación', 'Taller Maker', 'Espacio de Producción', 'Zona de Trabajo Manual', 'Taller Creativo'],
   other: ['Zona Relax', 'Área de Descanso', 'Espacio Multiusos', 'Zona de Eventos', 'Espacio Flexible']
 };
 
 const name = `${faker.helpers.arrayElement(spaceNames[type])} ${index}`;
 
 // Generar estado actual
 const spaceStatus = faker.helpers.arrayElement(['available', 'occupied', 'maintenance', 'reserved', 'closed']);
 
 // Generar historial de estados
 const statusHistory = [];
 let currentDate = faker.date.past({ years: 1 });
 
 // Generar entre 3 y 8 cambios de estado
 const changeCount = faker.number.int({ min: 3, max: 8 });
 
 for (let i = 0; i < changeCount; i++) {
   const status = faker.helpers.arrayElement(['available', 'occupied', 'maintenance', 'reserved', 'closed']);
   
   statusHistory.push({
     status,
     changedAt: currentDate.toISOString(),
     changedBy: faker.helpers.arrayElement(['system', 'admin', 'maintenance', 'scheduler']),
     reason: faker.helpers.arrayElement([
       'Mantenimiento programado', 
       'Reserva de cliente', 
       'Finalización de mantenimiento',
       'Cierre temporal',
       'Disponibilidad restaurada',
       null
     ])
   });
   
   // Avanzar la fecha para el siguiente cambio
   currentDate = faker.date.between({ from: currentDate, to: new Date() });
 }
 
 statusHistory.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt));
 
 // Generar nivel de membresía requerido
 const requiredMembershipLevel = faker.helpers.arrayElement(['basic', 'standard', 'premium', 'all']);
 
 // Generar características del espacio
 const features = {
   hasWifi: faker.datatype.boolean(0.8),
   hasProjector: faker.datatype.boolean(0.6),
   hasWhiteboard: faker.datatype.boolean(0.7),
   hasVideoconference: faker.datatype.boolean(0.5),
   hasAirConditioning: faker.datatype.boolean(0.8),
   hasNaturalLight: faker.datatype.boolean(0.6),
   hasKitchen: faker.datatype.boolean(0.3),
   hasPrivateBathroom: faker.datatype.boolean(0.4),
   isWheelchairAccessible: faker.datatype.boolean(0.9),
   hasParkingNearby: faker.datatype.boolean(0.7),
   equipment: Array.from(
     { length: faker.number.int({ min: 1, max: 5 }) },
     () => faker.helpers.arrayElement([
       'Mesa de reuniones', 'Sillas ergonómicas', 'Pantalla interactiva', 
       'Sistema de sonido', 'Pizarra digital', 'Ordenador', 'Impresora 3D',
       'Herramientas', 'Máquinas CNC', 'Estaciones de trabajo'
     ])
   ),
   services: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.helpers.arrayElement([
       'Café gratuito', 'Servicio de impresión', 'Soporte técnico',
       'Catering bajo demanda', 'Asistencia virtual', 'Recepción de paquetería'
     ])
   )
 };
 
 // Generar horarios de apertura
 const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
 const openingHoursData = {};
 
 days.forEach(day => {
   // Fin de semana: 50% probabilidad de estar cerrado
   const isClosed = (day === 'saturday' || day === 'sunday') ?
     faker.datatype.boolean(50) : faker.datatype.boolean(10);

   if (isClosed) {
     openingHoursData[day] = { isClosed: true };
   } else {
     // Horario típico de oficina con variaciones
     const openHour = faker.helpers.arrayElement([8, 9, 10]);
     const closeHour = faker.helpers.arrayElement([17, 18, 19, 20]);
     
     openingHoursData[day] = {
       isClosed: false,
       open: `${openHour}:00`,
       close: `${closeHour}:00`,
       breaks: day !== 'saturday' && day !== 'sunday' ? [
         { start: '13:00', end: '14:00', description: 'Almuerzo' }
       ] : []
     };
   }
 });
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraphs(2),
   type,
   capacity: faker.number.int({ min: 1, max: 50 }),
   size: faker.number.float({ min: 10, max: 200, precision: 0.01 }),
   floor: faker.helpers.arrayElement(['Planta Baja', 'Primera Planta', 'Segunda Planta', 'Sótano', 'Ático']),
   building: faker.helpers.arrayElement(['Edificio Principal', 'Anexo Norte', 'Torre Sur', 'Campus Este', 'Centro de Innovación']),
   features,
   geoLocation: generateGeoLocation(),
   isActive: faker.datatype.boolean(0.9),
   openingHours: openingHoursData,
   spaceStatus,
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     generateMetadata
   ),
   allowedMemberships: Array.from(
     { length: faker.number.int({ min: 1, max: MEMBERSHIP_COUNT }) },
     () => faker.number.int({ min: 1, max: MEMBERSHIP_COUNT })
   ),
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 5 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null,
   statusChangedAt: statusHistory.length > 0 ? statusHistory[0].changedAt : null,
   previousStatus: statusHistory.length > 1 ? statusHistory[1].status : null,
   statusHistory,
   audit: generateAudit(),
   requiredMembershipLevel,
   accessRestrictions: Math.random() > 0.4 ? {
     timeRestrictions: Math.random() > 0.5 ? {
       maxHoursPerDay: faker.helpers.arrayElement([2, 4, 8]),
       maxBookingsPerWeek: faker.helpers.arrayElement([1, 2, 3, 5])
     } : null,
     membershipRestrictions: Math.random() > 0.3 ? {
       minMembershipDuration: faker.helpers.arrayElement([1, 3, 6]), // meses
       requiresApproval: faker.datatype.boolean(0.3)
     } : null
   } : null,
   publishedAt: new Date().toISOString()
 };
}

// Función para generar un área
function generateArea(index, spaces) {
 const space = faker.helpers.arrayElement(spaces);
 
 // Colores disponibles
 const colors = ['rojo', 'blanco', 'verde', 'azul', 'amarillo', 'morado', 'naranja', 'gris', 'negro', 'celeste'];
 
 // Nombres según el tipo de espacio
 let namePrefix;
 switch (space.type) {
   case 'lab':
     namePrefix = faker.helpers.arrayElement(['Zona de Experimentación', 'Estación de Trabajo', 'Área de Pruebas', 'Módulo']);
     break;
   case 'workshop':
     namePrefix = faker.helpers.arrayElement(['Zona de Herramientas', 'Estación de Trabajo', 'Área de Fabricación', 'Puesto']);
     break;
   case 'coworking':
     namePrefix = faker.helpers.arrayElement(['Isla', 'Zona', 'Sector', 'Módulo']);
     break;
   default:
     namePrefix = faker.helpers.arrayElement(['Sección', 'Zona', 'Área', 'Sector']);
 }
 
 const name = `${namePrefix} ${index}`;
 const code = `A${String(index).padStart(3, '0')}`;
 const slug = name.toLowerCase().replace(/\s+/g, '-');
 
 // Generar estado actual
 const areaStatus = faker.helpers.arrayElement(['available', 'occupied', 'maintenance', 'reserved', 'closed']);
 
 // Generar historial de estados
 const statusHistory = [];
 let currentDate = faker.date.past({ years: 1 });
 
 // Generar entre 2 y 6 cambios de estado
 const changeCount = faker.number.int({ min: 2, max: 6 });
 
 for (let i = 0; i < changeCount; i++) {
   const status = faker.helpers.arrayElement(['available', 'occupied', 'maintenance', 'reserved', 'closed']);
   
   statusHistory.push({
     status,
     changedAt: currentDate.toISOString(),
     changedBy: faker.helpers.arrayElement(['system', 'admin', 'maintenance', 'scheduler']),
     reason: faker.helpers.arrayElement([
       'Mantenimiento programado', 
       'Uso por miembro', 
       'Finalización de mantenimiento',
       'Cierre temporal',
       'Disponibilidad restaurada',
       null
     ])
   });
   
   // Avanzar la fecha para el siguiente cambio
   currentDate = faker.date.between({ from: currentDate, to: new Date() });
 }
 
 statusHistory.sort((a, b) => new Date(b.changedAt) - new Date(a.changedAt));
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraph(),
   isActive: faker.datatype.boolean(0.9),
   code,
   color: faker.helpers.arrayElement(colors),
   slug,
   geoLocation: generateGeoLocation(),
   openingHours: space.openingHours, // Heredar horarios del espacio
   isReservable: faker.datatype.boolean(0.8),
   primarySupervisor: Math.random() > 0.5 ? faker.number.int({ min: 1, max: MEMBER_COUNT }) : null,
   space: space.id,
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 3 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   areaStatus,
   statusChangedAt: statusHistory.length > 0 ? statusHistory[0].changedAt : null,
   previousStatus: statusHistory.length > 1 ? statusHistory[1].status : null,
   statusHistory,
   requiredSkillLevel: faker.helpers.arrayElement(['none', 'beginner', 'intermediate', 'advanced', 'expert']),
   additionalSupervisors: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.number.int({ min: 1, max: MEMBER_COUNT })
   ),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar información de activo
function generateAssetInfo() {
 return {
   inventoryNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
   acquisitionDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
   acquisitionCost: faker.number.float({ min: 50, max: 10000, precision: 0.01 }),
   currentValue: faker.number.float({ min: 10, max: 8000, precision: 0.01 }),
   condition: faker.helpers.arrayElement(['new', 'excellent', 'good', 'fair', 'poor']),
   warranty: {
     hasWarranty: faker.datatype.boolean(0.7),
     expirationDate: faker.date.future({ years: 2 }).toISOString().split('T')[0],
     provider: faker.company.name()
   },
   maintenanceSchedule: faker.helpers.arrayElement(['monthly', 'quarterly', 'biannual', 'annual', null]),
   lastMaintenance: faker.date.recent(90).toISOString().split('T')[0],
   nextMaintenance: faker.date.soon(90).toISOString().split('T')[0],
   instructions: faker.datatype.boolean(0.6) ? faker.lorem.paragraphs(2) : null,
   safetyGuidelines: faker.datatype.boolean(0.7) ? faker.lorem.paragraphs(1) : null
 };
}

// Función para generar un equipo
function generateEquipment(index, areas) {
 const area = faker.helpers.arrayElement(areas);
 
 // Generar nombre basado en el área
 let name;
 if (area.name.includes('Fabricación') || area.name.includes('Taller')) {
   name = faker.helpers.arrayElement(['Fresadora', 'Torno', 'Sierra', 'Taladro', 'Lijadora', 'Soldadora', 'Cortadora']);
 } else if (area.name.includes('Digital') || area.name.includes('Electrónica')) {
   name = faker.helpers.arrayElement(['Osciloscopio', 'Fuente de alimentación', 'Estación de soldadura', 'Analizador lógico', 'Multímetro']);
 } else if (area.name.includes('Impresión') || area.name.includes('3D')) {
   name = faker.helpers.arrayElement(['Impresora 3D FDM', 'Impresora 3D SLA', 'Escáner 3D', 'Estación de post-procesado']);
 } else if (area.name.includes('Láser') || area.name.includes('Corte')) {
   name = faker.helpers.arrayElement(['Cortadora láser', 'Sistema de extracción', 'Compresor de aire']);
 } else {
   name = faker.helpers.arrayElement(['Ordenador', 'Proyector', 'Pantalla', 'Sistema de audio', 'Cámara', 'Escáner']);
 }
 
 // Asegurar que el nombre sea único
 name = `${name} ${index}`;
 
 // Generar código interno único
 const internalCode = `EQ-${String(index).padStart(4, '0')}`;
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraph(),
   assetInfo: generateAssetInfo(),
   internalCode,
   locationType: faker.helpers.arrayElement(['fixed', 'mobile', 'shared']),
   currentUser: Math.random() > 0.7 ? faker.number.int({ min: 1, max: MEMBER_COUNT }) : null,
   area: area.id,
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 3 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar una herramienta
function generateTool(index, areas) {
 const area = faker.helpers.arrayElement(areas);
 
 // Tipos de herramientas
 const toolTypes = ['hand_tool', 'measuring', 'cutting', 'fastening', 'safety', 'electrical', 'pneumatic', 'other'];
 const toolType = faker.helpers.arrayElement(toolTypes);
 
 // Generar nombre basado en el tipo
 let name;
 switch (toolType) {
   case 'hand_tool':
     name = faker.helpers.arrayElement(['Martillo', 'Destornillador', 'Llave inglesa', 'Alicates', 'Lima', 'Cincel']);
     break;
   case 'measuring':
     name = faker.helpers.arrayElement(['Cinta métrica', 'Calibre', 'Nivel', 'Escuadra', 'Transportador']);
     break;
   case 'cutting':
     name = faker.helpers.arrayElement(['Sierra manual', 'Cúter', 'Tijeras', 'Segueta', 'Cizalla']);
     break;
   case 'fastening':
     name = faker.helpers.arrayElement(['Pistola de clavos', 'Grapadora', 'Remachadora', 'Sargentos', 'Tornillo de banco']);
     break;
   case 'safety':
     name = faker.helpers.arrayElement(['Gafas protectoras', 'Guantes', 'Máscara', 'Protector auditivo', 'Extintor']);
     break;
   case 'electrical':
     name = faker.helpers.arrayElement(['Multímetro', 'Soldador', 'Crimpeadora', 'Pelacables', 'Probador de tensión']);
     break;
   case 'pneumatic':
     name = faker.helpers.arrayElement(['Pistola de aire', 'Compresor portátil', 'Inflador', 'Aerógrafo']);
     break;
   default:
     name = faker.helpers.arrayElement(['Kit de precisión', 'Juego de llaves', 'Set de brocas', 'Organizador']);
 }
 
 // Asegurar que el nombre sea único
 name = `${name} ${index}`;
 
 // Generar código interno único
 const internalCode = `TL-${String(index).padStart(4, '0')}`;
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraph(),
   assetInfo: generateAssetInfo(),
   toolType,
   internalCode,
   location: generateGeoLocation(),
   area: area.id,
   compatibleEquipment: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.number.int({ min: 1, max: EQUIPMENT_COUNT })
   ),
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 3 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar un consumible
function generateConsumable(index, areas) {
 const area = faker.helpers.arrayElement(areas);
 
 // Tipos de consumibles
 const types = ['office_supply', 'material', 'food', 'beverage', 'cleaning', 'chemical', 'other'];
 const type = faker.helpers.arrayElement(types);
 
 // Generar nombre basado en el tipo
 let name;
 switch (type) {
   case 'office_supply':
     name = faker.helpers.arrayElement(['Papel', 'Bolígrafos', 'Carpetas', 'Post-it', 'Clips', 'Grapas']);
     break;
   case 'material':
     name = faker.helpers.arrayElement(['Filamento PLA', 'Madera', 'Acrílico', 'Metal', 'Tela', 'Cartón']);
     break;
   case 'food':
     name = faker.helpers.arrayElement(['Galletas', 'Fruta', 'Snacks', 'Barritas energéticas', 'Chocolatinas']);
     break;
   case 'beverage':
     name = faker.helpers.arrayElement(['Café', 'Té', 'Agua', 'Refrescos', 'Zumos']);
     break;
   case 'cleaning':
     name = faker.helpers.arrayElement(['Papel higiénico', 'Jabón', 'Desinfectante', 'Toallitas', 'Detergente']);
     break;
   case 'chemical':
     name = faker.helpers.arrayElement(['Alcohol isopropílico', 'Acetona', 'Pegamento', 'Disolvente', 'Pintura']);
     break;
   default:
     name = faker.helpers.arrayElement(['Baterías', 'Bombillas', 'Cables', 'Cinta adhesiva', 'Etiquetas']);
 }
 
 // Asegurar que el nombre sea único
 name = `${name} ${index}`;
 
 // Generar unidad de medida según el tipo
 let unit;
 switch (type) {
   case 'office_supply':
   case 'material':
     unit = faker.helpers.arrayElement(['unidades', 'paquetes', 'cajas', 'rollos', 'metros']);
     break;
   case 'food':
   case 'beverage':
     unit = faker.helpers.arrayElement(['unidades', 'paquetes', 'kg', 'litros', 'botellas']);
     break;
   case 'cleaning':
   case 'chemical':
     unit = faker.helpers.arrayElement(['unidades', 'litros', 'ml', 'botes', 'sprays']);
     break;
   default:
     unit = faker.helpers.arrayElement(['unidades', 'paquetes', 'cajas']);
 }
 
 // Generar fecha de vencimiento para alimentos, bebidas y químicos
 const needsExpiration = ['food', 'beverage', 'chemical'].includes(type);
 const expirationDate = needsExpiration ? 
   faker.date.future({ years: 2 }).toISOString().split('T')[0] : null;
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraph(),
   type,
   unit,
   expirationDate,
   storageInstructions: Math.random() > 0.6 ? faker.lorem.sentence() : null,
   assetInfo: generateAssetInfo(),
   isReusable: faker.datatype.boolean(0.2),
   supplierCode: Math.random() > 0.5 ? `SUP-${faker.string.alphanumeric(6).toUpperCase()}` : null,
   area: area.id,
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 3 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   consumableStatus: faker.helpers.arrayElement(['available', 'low_stock', 'out_of_stock', 'expired', 'discontinued']),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar un recurso
function generateResource(index, areas) {
 const area = faker.helpers.arrayElement(areas);
 
 // Tipos de recursos
 const types = ['document', 'book', 'video', 'audio', 'course', 'template', 'other'];
 const type = faker.helpers.arrayElement(types);
 
 // Formatos disponibles
 const formats = ['physical', 'digital', 'both'];
 const format = faker.helpers.arrayElement(formats);
 
 // Generar nombre basado en el tipo
 let name;
 switch (type) {
   case 'document':
     name = faker.helpers.arrayElement(['Manual de usuario', 'Guía de referencia', 'Documentación técnica', 'Informe', 'Procedimiento']);
     break;
   case 'book':
     name = faker.helpers.arrayElement(['Libro de diseño', 'Manual técnico', 'Guía práctica', 'Enciclopedia', 'Compendio']);
     break;
   case 'video':
     name = faker.helpers.arrayElement(['Tutorial', 'Demostración', 'Webinar grabado', 'Curso en vídeo', 'Presentación']);
     break;
   case 'audio':
     name = faker.helpers.arrayElement(['Podcast', 'Audiolibro', 'Entrevista', 'Conferencia grabada', 'Guía de audio']);
     break;
   case 'course':
     name = faker.helpers.arrayElement(['Curso completo', 'Taller práctico', 'Masterclass', 'Bootcamp', 'Formación especializada']);
     break;
   case 'template':
     name = faker.helpers.arrayElement(['Plantilla de diseño', 'Modelo 3D', 'Esquema de circuito', 'Patrón de corte', 'Plantilla de documento']);
     break;
   default:
     name = faker.helpers.arrayElement(['Kit de recursos', 'Colección de materiales', 'Paquete de aprendizaje', 'Conjunto de herramientas']);
 }
 
 // Añadir tema específico al nombre
 const topics = ['Arduino', 'Impresión 3D', 'Diseño CAD', 'Programación', 'Electrónica', 'Robótica', 'Fabricación digital'];
 const topic = faker.helpers.arrayElement(topics);
 
 // Asegurar que el nombre sea único
 name = `${name} de ${topic} ${index}`;
 
 // Generar URL si es digital
 const url = (format === 'digital' || format === 'both') ? 
   `https://recursos.makerspace.org/${faker.helpers.slugify(name.toLowerCase())}` : null;
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraph(),
   type,
   format,
   url,
   author: faker.person.fullName(),
   publisher: faker.company.name(),
   publicationDate: faker.date.past({ years: 5 }).toISOString().split('T')[0],
   language: faker.helpers.arrayElement(['es', 'en', 'fr', 'de', 'it']),
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 5 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   licenseType: faker.helpers.arrayElement(['CC-BY', 'CC-BY-SA', 'CC0', 'open-source', 'proprietary', 'unknown']),
   accessLevel: faker.helpers.arrayElement(['public', 'internal', 'restricted']),
   isAvailable: faker.datatype.boolean(0.9),
   assetInfo: generateAssetInfo(),
   currentUser: Math.random() > 0.8 ? faker.number.int({ min: 1, max: MEMBER_COUNT }) : null,
   relatedSkills: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.number.int({ min: 1, max: SKILL_COUNT })
   ),
   area: area.id,
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   resourceStatus: faker.helpers.arrayElement(['available', 'in_use', 'unavailable', 'archived']),
   version: Math.random() > 0.5 ? `${faker.number.int({ min: 1, max: 5 })}.${faker.number.int({ min: 0, max: 9 })}` : null,
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar un evento
function generateEvent(index, spaces, members) {
 const space = faker.helpers.arrayElement(spaces);
 
 // Tipos de eventos
 const eventTypes = ['workshop', 'course', 'meetup', 'conference', 'hackathon', 'demo_day', 'open_day', 'other'];
 const eventType = faker.helpers.arrayElement(eventTypes);
 
 // Generar nombre basado en el tipo
 let name;
 switch (eventType) {
   case 'workshop':
     name = faker.helpers.arrayElement(['Taller de', 'Workshop de', 'Introducción a', 'Hands-on']);
     break;
   case 'course':
     name = faker.helpers.arrayElement(['Curso de', 'Formación en', 'Aprende', 'Masterclass de']);
     break;
   case 'meetup':
     name = faker.helpers.arrayElement(['Meetup de', 'Encuentro de', 'Comunidad', 'Grupo de']);
     break;
   case 'conference':
     name = faker.helpers.arrayElement(['Conferencia sobre', 'Charla de', 'Ponencia:', 'Presentación:']);
     break;
   case 'hackathon':
     name = faker.helpers.arrayElement(['Hackathon:', 'Hackatón de', 'Reto:', 'Desafío:']);
     break;
   case 'demo_day':
     name = faker.helpers.arrayElement(['Demo Day:', 'Demostración de', 'Showcase de', 'Exhibición de']);
     break;
   case 'open_day':
     name = faker.helpers.arrayElement(['Jornada de puertas abiertas', 'Open Day', 'Día abierto', 'Visita el makerspace']);
     break;
   default:
     name = faker.helpers.arrayElement(['Evento especial:', 'Actividad:', 'Experiencia:', 'Sesión de']);
 }
 
 // Añadir tema específico al nombre
 const topics = ['Arduino', 'Impresión 3D', 'Diseño CAD', 'Programación', 'Electrónica', 'Robótica', 'Fabricación digital', 'IoT', 'IA', 'Diseño', 'Prototipado'];
 const topic = faker.helpers.arrayElement(topics);
 
 // Asegurar que el nombre sea único
 name = `${name} ${topic} ${index}`;
 
 // Generar fechas
 const startDate = faker.date.future({ years: 1 });
 const duration = faker.helpers.arrayElement([1, 2, 3, 4, 8, 16, 24, 48]); // horas
 const endDate = new Date(startDate);
 endDate.setHours(endDate.getHours() + duration);
 
 // Generar organizador (un miembro)
 const organizer = faker.helpers.arrayElement(members);
 
 // Generar capacidad y asistentes
 const capacity = faker.number.int({ min: 5, max: 50 });
 const attendeeCount = faker.number.int({ min: 0, max: capacity });
 
 // Generar asistentes (IDs de miembros)
 const attendees = faker.helpers.arrayElements(
   members.map(m => m.id),
   attendeeCount
 );
 
 // Generar precio
 const isFree = faker.datatype.boolean(0.4); // 40% de probabilidad de ser gratuito
 const price = isFree ? 0 : faker.number.float({ min: 5, max: 200, precision: 0.01 });
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraphs(2),
   eventType,
   startDate: startDate.toISOString(),
   endDate: endDate.toISOString(),
   location: space.id,
   organizer: organizer.id,
   capacity,
   attendees,
   price,
   isFree,
   isPublic: faker.datatype.boolean(0.8),
   registrationRequired: faker.datatype.boolean(0.7),
   registrationDeadline: faker.date.between({ from: new Date(), to: startDate }).toISOString(),
   status: faker.helpers.arrayElement(['scheduled', 'cancelled', 'postponed', 'completed']),
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 5 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   requiredSkills: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.number.int({ min: 1, max: SKILL_COUNT })
   ),
   providedSkills: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.number.int({ min: 1, max: SKILL_COUNT })
   ),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar un proyecto
function generateProject(index, members, skills) {
 // Tipos de proyectos
 const projectTypes = ['personal', 'collaborative', 'educational', 'research', 'commercial', 'community', 'other'];
 const projectType = faker.helpers.arrayElement(projectTypes);
 
 // Categorías de proyectos
 const categories = ['hardware', 'software', 'art', 'science', 'education', 'social', 'sustainability', 'other'];
 const category = faker.helpers.arrayElement(categories);
 
 // Generar nombre basado en el tipo y categoría
 let namePrefix;
 switch (projectType) {
   case 'personal':
     namePrefix = faker.helpers.arrayElement(['Mi proyecto de', 'Proyecto personal:', 'Experimento con', 'Creación:']);
     break;
   case 'collaborative':
     namePrefix = faker.helpers.arrayElement(['Proyecto colaborativo:', 'Colaboración en', 'Equipo', 'Iniciativa:']);
     break;
   case 'educational':
     namePrefix = faker.helpers.arrayElement(['Proyecto educativo:', 'Aprendizaje de', 'Tutorial de', 'Guía práctica:']);
     break;
   case 'research':
     namePrefix = faker.helpers.arrayElement(['Investigación sobre', 'Estudio de', 'Análisis de', 'Exploración:']);
     break;
   case 'commercial':
     namePrefix = faker.helpers.arrayElement(['Producto:', 'Servicio:', 'Startup:', 'Emprendimiento:']);
     break;
   case 'community':
     namePrefix = faker.helpers.arrayElement(['Proyecto comunitario:', 'Iniciativa local:', 'Para la comunidad:', 'Acción colectiva:']);
     break;
   default:
     namePrefix = faker.helpers.arrayElement(['Proyecto:', 'Iniciativa:', 'Desarrollo de', 'Creación:']);
 }
 
 // Añadir tema específico al nombre
 const topics = ['Robot', 'App', 'Dispositivo IoT', 'Sistema', 'Plataforma', 'Herramienta', 'Prototipo', 'Modelo 3D', 'Instalación', 'Solución'];
 const topic = faker.helpers.arrayElement(topics);
 
 // Asegurar que el nombre sea único
 const name = `${namePrefix} ${topic} ${index}`;
 
 // Generar fechas
 const startDate = faker.date.past({ years: 2 });
 const isCompleted = faker.datatype.boolean(0.6); // 60% de probabilidad de estar completado
 const endDate = isCompleted ? 
   faker.date.between({ from: startDate, to: new Date() }).toISOString() : null;
 
 // Generar líder del proyecto (un miembro)
 const leader = faker.helpers.arrayElement(members);
 
 // Generar miembros del equipo (IDs de miembros)
 const teamSize = faker.number.int({ min: 1, max: 5 });
 const team = faker.helpers.arrayElements(
   members.map(m => m.id).filter(id => id !== leader.id),
   teamSize
 );
 team.push(leader.id); // Asegurar que el líder está en el equipo
 
 // Generar estado del proyecto
 const status = isCompleted ? 
   faker.helpers.arrayElement(['completed', 'archived']) : 
   faker.helpers.arrayElement(['planning', 'in_progress', 'on_hold']);
 
 // Generar habilidades requeridas
 const requiredSkills = faker.helpers.arrayElements(
   skills.map(s => s.id),
   faker.number.int({ min: 1, max: 5 })
 );
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraphs(2),
   projectType,
   category,
   startDate: startDate.toISOString(),
   endDate,
   leader: leader.id,
   team,
   status,
   progress: status === 'completed' ? 100 : faker.number.int({ min: 0, max: 99 }),
   isPublic: faker.datatype.boolean(0.7),
   requiredSkills,
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 5 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   repositoryUrl: Math.random() > 0.6 ? `https://github.com/makerspace/${faker.helpers.slugify(name.toLowerCase())}` : null,
   websiteUrl: Math.random() > 0.7 ? `https://${faker.helpers.slugify(name.toLowerCase())}.makerspace.org` : null,
   budget: Math.random() > 0.5 ? faker.number.float({ min: 100, max: 10000, precision: 0.01 }) : null,
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar una reserva
function generateReservation(index, members, spaces, areas) {
 // Determinar si la reserva es para un espacio o un área
 const isSpaceReservation = faker.datatype.boolean();
 
 // Seleccionar el recurso reservado
 const resource = isSpaceReservation ? 
   faker.helpers.arrayElement(spaces) : 
   faker.helpers.arrayElement(areas);
 
 // Generar miembro que hace la reserva
 const member = faker.helpers.arrayElement(members);
 
 // Generar fechas
 const startDate = faker.date.future({ years: 1 });
 const duration = faker.helpers.arrayElement([1, 2, 3, 4, 8]); // horas
 const endDate = new Date(startDate);
 endDate.setHours(endDate.getHours() + duration);
 
 // Generar estado de la reserva
 const status = faker.helpers.arrayElement(['pending', 'confirmed', 'cancelled', 'completed']);
 
 // Generar tipo de reserva
 const reservationType = faker.helpers.arrayElement(['individual', 'group', 'event', 'maintenance']);
 
 // Generar número de asistentes para reservas grupales o eventos
 const attendeeCount = reservationType === 'individual' ? 
   1 : faker.number.int({ min: 2, max: 20 });
 
 return {
   id: index,
   member: member.id,
   resourceType: isSpaceReservation ? 'space' : 'area',
   resourceId: resource.id,
   startDate: startDate.toISOString(),
   endDate: endDate.toISOString(),
   status,
   reservationType,
   attendeeCount,
   purpose: faker.lorem.sentence(),
   notes: Math.random() > 0.7 ? faker.lorem.paragraph() : null,
   isRecurring: faker.datatype.boolean(0.2), // 20% de probabilidad de ser recurrente
   recurrencePattern: Math.random() > 0.8 ? faker.helpers.arrayElement(['daily', 'weekly', 'biweekly', 'monthly']) : null,
   recurrenceEndDate: Math.random() > 0.8 ? 
     faker.date.future({ years: 1, refDate: endDate }).toISOString() : null,
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función para generar una formación
function generateTraining(index, skills, members) {
 // Seleccionar una habilidad relacionada
 const skill = faker.helpers.arrayElement(skills);
 
 // Tipos de formación
 const trainingTypes = ['course', 'workshop', 'tutorial', 'certification', 'mentorship', 'other'];
 const trainingType = faker.helpers.arrayElement(trainingTypes);
 
 // Generar nombre basado en el tipo y la habilidad
 let namePrefix;
 switch (trainingType) {
   case 'course':
     namePrefix = faker.helpers.arrayElement(['Curso de', 'Formación en', 'Aprende', 'Curso completo de']);
     break;
   case 'workshop':
     namePrefix = faker.helpers.arrayElement(['Taller de', 'Workshop de', 'Introducción a', 'Hands-on']);
     break;
   case 'tutorial':
     namePrefix = faker.helpers.arrayElement(['Tutorial de', 'Guía paso a paso de', 'Cómo hacer', 'Aprende a']);
     break;
   case 'certification':
     namePrefix = faker.helpers.arrayElement(['Certificación en', 'Acreditación de', 'Programa de certificación', 'Validación de']);
     break;
   case 'mentorship':
     namePrefix = faker.helpers.arrayElement(['Mentoría en', 'Acompañamiento para', 'Asesoría en', 'Coaching de']);
     break;
   default:
     namePrefix = faker.helpers.arrayElement(['Formación en', 'Programa de', 'Aprendizaje de', 'Desarrollo de habilidades en']);
 }
 
 // Asegurar que el nombre sea único
 const name = `${namePrefix} ${skill.name} ${index}`;
 
 // Generar nivel de dificultad
 const difficultyLevel = faker.helpers.arrayElement(['beginner', 'intermediate', 'advanced', 'expert']);
 
 // Generar duración
 const duration = faker.number.int({ min: 1, max: 40 }); // horas
 
 // Generar instructor (un miembro)
 const instructor = faker.helpers.arrayElement(members);
 
 // Generar capacidad y precio
 const capacity = faker.number.int({ min: 5, max: 30 });
 const isFree = faker.datatype.boolean(0.3); // 30% de probabilidad de ser gratuito
 const price = isFree ? 0 : faker.number.float({ min: 20, max: 500, precision: 0.01 });
 
 // Generar fechas
 const startDate = faker.date.future({ years: 1 });
 const endDate = new Date(startDate);
 
 // Calcular fecha de fin basada en la duración y asumiendo sesiones de 4 horas
 const sessionDuration = 4; // horas por sesión
 const sessions = Math.ceil(duration / sessionDuration);
 const sessionFrequency = faker.helpers.arrayElement([1, 2, 3, 5]); // días entre sesiones
 
 endDate.setDate(endDate.getDate() + (sessions - 1) * sessionFrequency);
 
 return {
   id: index,
   name,
   description: faker.lorem.paragraphs(2),
   trainingType,
   skill: skill.id,
   difficultyLevel,
   duration, // en horas
   sessions,
   startDate: startDate.toISOString(),
   endDate: endDate.toISOString(),
   instructor: instructor.id,
   capacity,
   price,
   isFree,
   isOnline: faker.datatype.boolean(0.4),
   location: faker.datatype.boolean(0.7) ? 
     faker.number.int({ min: 1, max: SPACE_COUNT }) : null,
   prerequisites: Array.from(
     { length: faker.number.int({ min: 0, max: 3 }) },
     () => faker.lorem.sentence()
   ),
   learningOutcomes: Array.from(
     { length: faker.number.int({ min: 2, max: 5 }) },
     () => faker.lorem.sentence()
   ),
   materials: Array.from(
     { length: faker.number.int({ min: 0, max: 4 }) },
     () => faker.lorem.sentence()
   ),
   status: faker.helpers.arrayElement(['scheduled', 'in_progress', 'completed', 'cancelled']),
   isPublic: faker.datatype.boolean(0.8),
   registrationRequired: faker.datatype.boolean(0.9),
   registrationDeadline: faker.date.between({ from: new Date(), to: startDate }).toISOString(),
   tags: Array.from(
     { length: faker.number.int({ min: 1, max: 3 }) },
     () => faker.number.int({ min: 1, max: TAG_COUNT })
   ),
   metadata: Array.from(
     { length: faker.number.int({ min: 0, max: 2 }) },
     generateMetadata
   ),
   audit: generateAudit(),
   publishedAt: new Date().toISOString(),
   deletedAt: faker.datatype.boolean(0.05) ? faker.date.recent().toISOString() : null
 };
}

// Función principal para generar todos los datos
async function generateData() {
 console.log('Iniciando generación de datos para el sistema de makerspace...');
 
 // 1. Generar tags
 console.log(`Generando ${TAG_COUNT} tags...`);
 const tags = [];
 for (let i = 1; i <= TAG_COUNT; i++) {
   tags.push(generateTag(i));
 }
 saveToFile('tags.json', tags);
 
 // 2. Generar categorías de habilidades
 console.log(`Generando ${SKILL_CATEGORY_COUNT} categorías de habilidades...`);
 const skillCategories = [];
 for (let i = 1; i <= SKILL_CATEGORY_COUNT; i++) {
   skillCategories.push(generateSkillCategory(i, skillCategories));
 }
 saveToFile('skill-categories.json', skillCategories);
 
 // 3. Generar habilidades
 console.log(`Generando ${SKILL_COUNT} habilidades...`);
 const skills = [];
 for (let i = 1; i <= SKILL_COUNT; i++) {
   skills.push(generateSkill(i, skillCategories, skills));
 }
 saveToFile('skills.json', skills);
 
 // 4. Generar niveles de habilidad
 console.log(`Generando niveles para cada habilidad...`);
 const skillLevels = [];
 let levelIndex = 1;
 skills.forEach(skill => {
   const levels = generateSkillLevels(skill.id, levelIndex);
   skillLevels.push(...levels);
   levelIndex += SKILL_LEVEL_COUNT;
 });
 saveToFile('skill-levels.json', skillLevels);
 
 // 5. Generar membresías
 console.log(`Generando ${MEMBERSHIP_COUNT} tipos de membresía...`);
 const memberships = [];
 for (let i = 1; i <= MEMBERSHIP_COUNT; i++) {
   memberships.push(generateMembership(i));
 }
 saveToFile('memberships.json', memberships);
 
 // 6. Generar miembros
 console.log(`Generando ${MEMBER_COUNT} miembros...`);
 const members = [];
 for (let i = 1; i <= MEMBER_COUNT; i++) {
   members.push(generateMember(i));
 }
 saveToFile('members.json', members);
 
 // 7. Generar habilidades de miembros
 console.log('Generando habilidades para los miembros...');
 const memberSkills = [];
 members.forEach(member => {
   // MODIFICADO: Usar el nombre de parámetro correcto
   const memberSkillsData = generateMemberSkills(member.id, skills, skillLevels);
   memberSkills.push(...memberSkillsData);
 });
 saveToFile('member-skills.json', memberSkills);
 
 // 8. Generar suscripciones de membresía
 console.log('Generando suscripciones de membresía...');
 const membershipSubscriptions = [];
 members.forEach(member => {
   const membershipId = faker.number.int({ min: 1, max: MEMBERSHIP_COUNT });
   membershipSubscriptions.push(generateMembershipSubscription(member.id, membershipId));
 });
 saveToFile('membership-subscriptions.json', membershipSubscriptions);
 
 // 9. Generar espacios
 console.log(`Generando ${SPACE_COUNT} espacios...`);
 const spaces = [];
 for (let i = 1; i <= SPACE_COUNT; i++) {
   spaces.push(generateSpace(i));
 }
 saveToFile('spaces.json', spaces);
 
 // 10. Generar áreas
 console.log(`Generando ${AREA_COUNT} áreas...`);
 const areas = [];
 for (let i = 1; i <= AREA_COUNT; i++) {
   areas.push(generateArea(i, spaces));
 }
 saveToFile('areas.json', areas);
 
 // 11. Generar equipamiento
 console.log(`Generando ${EQUIPMENT_COUNT} equipos...`);
 const equipment = [];
 for (let i = 1; i <= EQUIPMENT_COUNT; i++) {
   equipment.push(generateEquipment(i, areas));
 }
 saveToFile('equipment.json', equipment);
 
 // 12. Generar herramientas
 console.log(`Generando ${TOOL_COUNT} herramientas...`);
 const tools = [];
 for (let i = 1; i <= TOOL_COUNT; i++) {
   tools.push(generateTool(i, areas));
 }
 saveToFile('tools.json', tools);
 
 // 13. Generar consumibles
 console.log(`Generando ${CONSUMABLE_COUNT} consumibles...`);
 const consumables = [];
 for (let i = 1; i <= CONSUMABLE_COUNT; i++) {
   consumables.push(generateConsumable(i, areas));
 }
 saveToFile('consumables.json', consumables);
 
 // 14. Generar recursos
 console.log(`Generando ${RESOURCE_COUNT} recursos...`);
 const resources = [];
 for (let i = 1; i <= RESOURCE_COUNT; i++) {
   resources.push(generateResource(i, areas));
 }
 saveToFile('resources.json', resources);
 
 // 15. Generar eventos
 console.log(`Generando ${EVENT_COUNT} eventos...`);
 const events = [];
 for (let i = 1; i <= EVENT_COUNT; i++) {
   events.push(generateEvent(i, spaces, members));
 }
 saveToFile('events.json', events);
 
 // 16. Generar proyectos
 console.log(`Generando ${PROJECT_COUNT} proyectos...`);
 const projects = [];
 for (let i = 1; i <= PROJECT_COUNT; i++) {
   projects.push(generateProject(i, members, skills));
 }
 saveToFile('projects.json', projects);
 
 // 17. Generar reservas
 console.log(`Generando ${RESERVATION_COUNT} reservas...`);
 const reservations = [];
 for (let i = 1; i <= RESERVATION_COUNT; i++) {
   reservations.push(generateReservation(i, members, spaces, areas));
 }
 saveToFile('reservations.json', reservations);
 
 // 18. Generar formaciones
 console.log(`Generando ${TRAINING_COUNT} formaciones...`);
 const trainings = [];
 for (let i = 1; i <= TRAINING_COUNT; i++) {
   trainings.push(generateTraining(i, skills, members));
 }
 saveToFile('trainings.json', trainings);
 
 // 19. Generar archivo de metadatos
 const metadata = {
   generated: new Date().toISOString(),
   counts: {
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
   }
 };
 saveToFile('metadata.json', metadata);
 
 console.log('Generación de datos completada con éxito.');
 console.log(`Todos los archivos han sido guardados en el directorio: ${outputDir}`);
}

// Ejecutar la generación de datos
generateData().catch(error => {
 console.error('Error durante la generación de datos:', error);
 process.exit(1);
});

// Al final del archivo generate-makerspace-data.js, añade:

// Exportar funciones para pruebas
module.exports = {
  generateMetadata,
  generateAudit,
  generateGeoLocation,
  generateContactInfo,
  generateProfileInfo,
  generatePreferences,
  generateEmergencyContact,
  generateTracking,
  generateTag,
  generateSkillCategory,
  generateSkill,
  generateSkillLevels,
  generateMembership,
  generateMember,
  generateMemberSkills,
  generateMembershipSubscription,
  generateSpace,
  generateArea,
  generateAssetInfo,
  generateEquipment,
  generateTool,
  generateConsumable,
  generateResource,
  generateEvent,
  generateProject,
  generateReservation,
  generateTraining,
  // También exportamos la función principal para permitir la generación completa
  generateData
};