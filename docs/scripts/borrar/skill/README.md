### Generador de Datos para Sistema de Habilidades

## Descripción

Este script genera datos de ejemplo para un sistema de gestión de habilidades en Strapi v5.12.6 con GraphQL. Crea un conjunto completo de datos para tres modelos principales:

1. **Categorías de Habilidades** (SkillCategory)
2. **Habilidades** (Skill)
3. **Niveles de Habilidad** (SkillLevel)


Los datos generados mantienen relaciones jerárquicas entre categorías, entre habilidades, y entre habilidades y sus niveles, siguiendo la estructura definida en los esquemas de Strapi.

## Instalación

### Requisitos previos

- Node.js (v14 o superior)
- npm o yarn


### Dependencias

El script requiere la biblioteca Faker.js para generar datos realistas:

```shellscript
npm install @faker-js/faker
```

## Uso

### Ejecución básica

```shellscript
node generate-skill-data.js
```

Por defecto, el script generará un archivo llamado `skill-data.json` en el directorio actual.

### Especificar archivo de salida

```shellscript
node generate-skill-data.js ruta/personalizada/datos-habilidades.json
```

## Estructura de datos generados

### Categorías de Habilidades

El script genera 8 categorías predefinidas relacionadas con tecnología y fabricación:

- Programación
- Diseño
- Electrónica
- Fabricación
- Impresión 3D
- Robótica
- IoT
- Ciencia de Datos


Cada categoría incluye:

- Nombre y descripción
- Slug único
- Icono y color
- Estado de activación
- Orden de visualización
- Relaciones jerárquicas (padre-hijo)
- Metadatos y datos de auditoría


### Habilidades

Se generan 40 habilidades distribuidas entre las categorías. Las habilidades son específicas para cada categoría (por ejemplo, "JavaScript" para Programación, "Arduino" para Electrónica).

Cada habilidad incluye:

- Nombre y descripción
- Slug único
- Icono y color
- Estado de activación
- Verificabilidad y criterios de verificación
- Relación con su categoría
- Relaciones jerárquicas (padre-hijo)
- Metadatos y datos de auditoría


### Niveles de Habilidad

Para cada habilidad, se generan 5 niveles estándar:

- Principiante
- Básico
- Intermedio
- Avanzado
- Experto


Cada nivel incluye:

- Nombre y descripción
- Valor numérico (1-5)
- Icono y color
- Indicador de nivel predeterminado
- Criterios para alcanzar el nivel
- Relación con su habilidad
- Metadatos y datos de auditoría


## Personalización

### Constantes configurables

Al inicio del script, puedes modificar varias constantes para personalizar la generación de datos:

```javascript
// Constantes para generación de datos
const CATEGORY_COUNT = 8;     // Número de categorías
const SKILL_COUNT = 40;       // Número de habilidades
const SKILL_LEVEL_COUNT = 5;  // Niveles por habilidad
```

### Categorías predefinidas

Puedes modificar el array `PREDEFINED_CATEGORIES` para cambiar las categorías generadas:

```javascript
const PREDEFINED_CATEGORIES = [
  { name: 'Programación', icon: 'code' },
  { name: 'Diseño', icon: 'brush' },
  // Añadir o modificar categorías aquí
];
```

### Habilidades por categoría

Puedes modificar las habilidades generadas para cada categoría en la función `generateSkill`:

```javascript
switch (category.name) {
  case 'Programación':
    name = faker.helpers.arrayElement(['JavaScript', 'Python', 'Java', /* ... */]);
    break;
  // Modificar o añadir casos para otras categorías
}
```

## Estructura del archivo de salida

El archivo JSON generado tiene la siguiente estructura:

```json
{
  "categories": [
    {
      "id": 1,
      "name": "Programación",
      "description": "...",
      "slug": "programacion",
      "icon": "code",
      "color": "#3498db",
      "isActive": true,
      "order": 1,
      "parentCategory": null,
      "metadata": [...],
      "audit": {...},
      "publishedAt": "...",
      "deletedAt": null
    },
    // Más categorías...
  ],
  "skills": [
    {
      "id": 1,
      "name": "JavaScript",
      "description": "...",
      "slug": "javascript",
      "icon": "code",
      "color": "#e74c3c",
      "isActive": true,
      "isVerifiable": true,
      "verificationCriteria": "...",
      "parentSkill": null,
      "category": 1,
      "metadata": [...],
      "audit": {...},
      "publishedAt": "...",
      "deletedAt": null
    },
    // Más habilidades...
  ],
  "skillLevels": [
    {
      "id": 1,
      "name": "Principiante",
      "description": "...",
      "value": 1,
      "icon": "star",
      "color": "#f39c12",
      "isDefault": true,
      "criteria": "...",
      "skill": 1,
      "metadata": [...],
      "audit": {...},
      "publishedAt": "...",
      "deletedAt": null
    },
    // Más niveles...
  ],
  "meta": {
    "generated": "2023-05-06T09:41:43.000Z",
    "count": {
      "categories": 8,
      "skills": 40,
      "skillLevels": 200
    }
  }
}
```

## Características clave

1. **Relaciones jerárquicas**: El script genera relaciones padre-hijo tanto para categorías como para habilidades.
2. **Datos realistas**: Utiliza nombres y descripciones realistas para categorías y habilidades relacionadas con tecnología y fabricación.
3. **Niveles estandarizados**: Cada habilidad tiene los mismos cinco niveles, pero con criterios específicos.
4. **Nivel predeterminado**: Para cada habilidad, uno de los niveles (generalmente Principiante o Básico) se marca como predeterminado.
5. **Metadatos y auditoría**: Todos los registros incluyen componentes de metadatos y auditoría compatibles con Strapi.
6. **Soft delete**: Algunos registros (aproximadamente 5% de habilidades y categorías, 2% de niveles) tienen una fecha en el campo `deletedAt` para simular eliminación lógica.


## Solución de problemas

### Error: Cannot find module '@faker-js/faker'

Asegúrate de haber instalado la dependencia:

```shellscript
npm install @faker-js/faker
```

### Nombres duplicados

El script intenta evitar nombres duplicados añadiendo un sufijo numérico cuando es necesario. Si encuentras problemas con duplicados, puedes aumentar la variedad de nombres en los arrays de selección.

### Personalización avanzada

Para personalización más avanzada, puedes modificar directamente las funciones `generateCategory`, `generateSkill` y `generateSkillLevels` para ajustar la lógica de generación de datos.

## Importación a Strapi

Los datos generados están diseñados para ser importados a Strapi mediante la API GraphQL. Para importarlos, necesitarás un script de importación separado que utilice las mutaciones GraphQL apropiadas para cada tipo de entidad.