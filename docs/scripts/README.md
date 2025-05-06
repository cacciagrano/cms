# Generador y Validador de Datos para Sistema Makerspace

Este proyecto proporciona herramientas para generar y validar datos de prueba realistas y coherentes para un sistema de gestión de makerspace. Los scripts generan y validan datos para todas las entidades del sistema, incluyendo miembros, habilidades, espacios, equipamiento, eventos, proyectos y más.

## 📋 Características

### Generador de Datos (`generate-makerspace-data.js`)
- Generación de datos realistas para 18 tipos de entidades diferentes
- Relaciones coherentes entre entidades (miembros con habilidades, espacios con áreas, etc.)
- Datos aleatorios pero consistentes usando Faker.js
- Exportación a archivos JSON individuales para fácil importación
- Personalizable mediante constantes de configuración

### Validador de Datos (`validate-makerspace-data.js`)
- Verificación de la existencia de todos los archivos generados
- Validación de la estructura de datos y campos requeridos
- Comprobación de IDs únicos en cada entidad
- Validación de relaciones entre entidades
- Verificación de coherencia entre metadatos y datos reales

## 🔧 Requisitos previos

- Node.js (v14 o superior)
- npm o yarn

## 🚀 Instalación

1. Clona este repositorio o descarga los archivos
2. Instala las dependencias:

```bash
npm install
```

## 📊 Uso

### Generación de datos

Para generar datos de prueba, ejecuta:

```shellscript
node generate-makerspace-data.js [directorio_salida]
```

Donde:

- `directorio_salida`: Directorio donde se guardarán los archivos JSON (predeterminado: `./data`)


El script generará los siguientes archivos:

- `tags.json`: Etiquetas para clasificar entidades
- `skill-categories.json`: Categorías de habilidades
- `skills.json`: Habilidades específicas
- `skill-levels.json`: Niveles para cada habilidad
- `memberships.json`: Tipos de membresía
- `members.json`: Miembros del makerspace
- `member-skills.json`: Habilidades asignadas a miembros
- `membership-subscriptions.json`: Suscripciones de membresía
- `spaces.json`: Espacios físicos
- `areas.json`: Áreas dentro de espacios
- `equipment.json`: Equipamiento disponible
- `tools.json`: Herramientas disponibles
- `consumables.json`: Consumibles disponibles
- `resources.json`: Recursos disponibles
- `events.json`: Eventos programados
- `projects.json`: Proyectos en curso
- `reservations.json`: Reservas de espacios y áreas
- `trainings.json`: Formaciones disponibles
- `metadata.json`: Metadatos sobre la generación


### Validación de datos

Para validar los datos generados, ejecuta:

```shellscript
node validate-makerspace-data.js [directorio_datos]
```

Donde:

- `directorio_datos`: Directorio donde se encuentran los archivos JSON (predeterminado: `./data`)


El validador realizará las siguientes comprobaciones:

1. Verificación de existencia de archivos
2. Validación de estructura de datos
3. Comprobación de IDs únicos
4. Validación de relaciones entre entidades
5. Verificación de metadatos


## 📝 Configuración

Puedes personalizar la generación de datos modificando las constantes al inicio del archivo `generate-makerspace-data.js`:

```javascript
const TAG_COUNT = 30;
const SKILL_CATEGORY_COUNT = 8;
const SKILL_COUNT = 40;
const SKILL_LEVEL_COUNT = 5;
const MEMBERSHIP_COUNT = 4;
const MEMBER_COUNT = 50;
// ... etc.
```

## 🧪 Estructura de datos

### Miembros

Los miembros tienen la siguiente estructura:

```javascript
{
  id: 1,
  firstName: "Nombre",
  lastName: "Apellido",
  displayName: "Usuario",
  memberCode: "MEM-00001",
  joinDate: "2023-01-15",
  memberStatus: "active",
  profileInfo: { ... },
  contactInfo: { ... },
  preferences: { ... },
  emergencyContact: { ... },
  // ... etc.
}
```

### Habilidades

Las habilidades tienen la siguiente estructura:

```javascript
{
  id: 1,
  name: "JavaScript",
  description: "Lenguaje de programación...",
  slug: "javascript",
  icon: "code",
  color: "#f7df1e",
  isActive: true,
  isVerifiable: true,
  category: 1,
  // ... etc.
}
```

### Espacios

Los espacios tienen la siguiente estructura:

```javascript
{
  id: 1,
  name: "Sala de Reuniones A",
  description: "Espacio para reuniones...",
  type: "meeting_room",
  capacity: 10,
  size: 25.5,
  features: { ... },
  geoLocation: { ... },
  isActive: true,
  // ... etc.
}
```

## 📈 Ejemplos de uso

### Importación de datos en una aplicación

```javascript
const fs = require('fs');
const path = require('path');

// Cargar miembros
const members = JSON.parse(fs.readFileSync(path.join('./data', 'members.json'), 'utf8'));

// Usar los datos
console.log(`Cargados ${members.length} miembros`);
```

### Filtrado de datos

```javascript
// Cargar habilidades
const skills = JSON.parse(fs.readFileSync(path.join('./data', 'skills.json'), 'utf8'));

// Filtrar habilidades activas de programación
const programmingSkills = skills.filter(skill => 
  skill.isActive && skill.category === 1 // Asumiendo que la categoría 1 es Programación
);

console.log(`Encontradas ${programmingSkills.length} habilidades de programación activas`);
```

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue para discutir los cambios propuestos.

## 📄 Licencia

Este proyecto está licenciado bajo la licencia MIT.

```plaintext

Este README proporciona:

1. **Descripción general** de ambos scripts
2. **Instrucciones de instalación y uso**
3. **Detalles de configuración**
4. **Ejemplos de estructura de datos**
5. **Ejemplos de uso** para importar y filtrar datos
6. **Información sobre contribuciones y licencia**
```


### Guía para importar datos JSON a Strapi

Vamos a enfocarnos en la importación de tus archivos JSON a Strapi. Es crucial seguir un orden específico para mantener las relaciones intactas.

## Orden de importación recomendado

El orden debe respetar las dependencias entre entidades:

1. **Entidades independientes** (sin relaciones a otras entidades):

1. Tags
2. Categorías de habilidades (skill-categories)
3. Membresías (memberships)
4. Espacios (spaces)



2. **Entidades con dependencias simples**:

1. Habilidades (skills) → dependen de categorías
2. Niveles de habilidad (skill-levels) → dependen de habilidades
3. Áreas (areas) → dependen de espacios



3. **Entidades con múltiples dependencias**:

1. Miembros (members)
2. Equipamiento (equipment) → depende de áreas
3. Herramientas (tools) → depende de áreas
4. Consumibles (consumables) → depende de áreas
5. Recursos (resources) → depende de áreas



4. **Entidades con relaciones complejas**:

1. Habilidades de miembros (member-skills) → depende de miembros, habilidades y niveles
2. Suscripciones de membresía (membership-subscriptions) → depende de miembros y membresías
3. Eventos (events) → depende de espacios y miembros
4. Proyectos (projects) → depende de miembros y habilidades
5. Reservas (reservations) → depende de miembros y varios tipos de recursos
6. Formaciones (trainings) → depende de habilidades y miembros



## Script de importación paso a paso

## Instrucciones de uso
1. **Instala las dependencias necesarias**:

```shellscript
npm install axios
```

2. **Genera un token API en Strapi**:
1. Ve a Strapi > Settings > API Tokens
2. Crea un nuevo token con permisos completos
3. Copia el token y reemplázalo en el script (`API_TOKEN`)

3. **Ajusta la configuración**:
1. Verifica que `STRAPI_URL` apunte a tu instancia de Strapi
2. Asegúrate de que `DATA_DIR` apunte al directorio donde están tus archivos JSON

4. **Ejecuta el script**:
```shellscript
node import-to-strapi.js
```

5. **Verifica los resultados**:
1. El script mostrará el progreso en la consola
2. Creará archivos de error para cada entidad que tenga problemas
3. Generará un archivo `id-maps.json` con la correspondencia entre IDs antiguos y nuevos

## Consideraciones importantes
1. **Ajusta los campos según tu modelo**: Es posible que necesites modificar los campos en las funciones de transformación para que coincidan exactamente con tu modelo en Strapi.
2. **Manejo de errores**: El script guarda los errores en archivos separados para que puedas revisarlos y corregirlos manualmente si es necesario.
3. **Relaciones**: El script maneja las relaciones usando el nuevo formato de Strapi v5 con `connect`.
4. **Campos requeridos**: Asegúrate de que todos los campos requeridos en tu modelo de Strapi estén incluidos en las transformaciones.
5. **Importación incremental**: Si necesitas importar datos adicionales más tarde, puedes modificar el script para cargar el archivo `id-maps.json` existente y continuar desde allí.