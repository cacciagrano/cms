## Documentación Actualizada

### Descripción General

Este script mejorado genera datos de prueba para un sistema basado en Strapi v5.12.6 con GraphQL, creando categorías de habilidades, habilidades, niveles de habilidad, miembros, proyectos y todas sus relaciones. Los datos generados son compatibles con los esquemas que has proporcionado.

### Mejoras Implementadas

1. **Soporte para Categorías de Habilidades**: Ahora el script genera categorías de habilidades con sus atributos completos (nombre, descripción, icono, color).
2. **Estructura Jerárquica de Habilidades**: Se ha implementado la relación padre-hijo entre habilidades, permitiendo crear una estructura jerárquica.
3. **Niveles de Habilidad Personalizados**: Cada habilidad ahora tiene sus propios niveles con atributos completos (nombre, descripción, valor, icono, color, criterios).
4. **Relaciones Completas**: Se han implementado todas las relaciones definidas en los esquemas, incluyendo las relaciones entre habilidades, niveles, miembros y proyectos.
5. **Datos Más Realistas**: Se han mejorado los generadores de datos para crear información más realista y coherente.

## Instalación de dependencias

Antes de ejecutar el script, necesitas instalar las dependencias requeridas. Puedes hacerlo con npm:

```shellscript
npm install @faker-js/faker graphql-request commander
```

Este comando instalará:

- `@faker-js/faker`: Para generar datos aleatorios realistas
- `graphql-request`: Para realizar peticiones GraphQL a Strapi
- `commander`: Para gestionar los argumentos de línea de comandos


### Uso

El uso del script sigue siendo el mismo:

```shellscript
node generate-test-data.js [opciones]
```

#### Opciones

- `--members=N`: Número de miembros a generar (predeterminado: 50)
- `--output=FILE`: Archivo de salida para los datos JSON (predeterminado: strapi-test-data.json)
- `--import`: Importar datos directamente a Strapi usando GraphQL
- `--endpoint=URL`: URL del endpoint GraphQL (predeterminado: [http://localhost:1337/graphql](http://localhost:1337/graphql))


### Estructura de Datos Generados

El script ahora genera una estructura de datos más completa:

**Categorías de Habilidades**:

1. Nombre, descripción, icono, color
2. Relaciones con habilidades



**Habilidades**:

1. Nombre, descripción, slug, icono, color
2. Estado (activo, verificable)
3. Criterios de verificación
4. Relaciones jerárquicas (padre-hijo)
5. Relación con categoría



**Niveles de Habilidad**:

1. Nombre, descripción, valor
2. Icono, color
3. Criterios para alcanzar el nivel
4. Relación con habilidad



**Miembros**:

1. Información personal y de contacto
2. Preferencias y configuración
3. Habilidades con niveles y verificaciones
4. Relaciones con proyectos



**Proyectos**:

1. Información básica y descripción
2. Estado, categoría, visibilidad
3. Información de financiación y licencia
4. Relaciones con miembros (propietario y participantes)





### Proceso de Importación Mejorado

El proceso de importación ahora sigue un orden lógico que respeta las dependencias entre entidades:

1. Primero se importan las categorías de habilidades
2. Luego las habilidades, estableciendo las relaciones jerárquicas
3. Después los niveles de habilidad para cada habilidad
4. A continuación los miembros
5. Seguido por las habilidades de los miembros
6. Finalmente los proyectos con sus relaciones


### Ejemplo de Uso

Para generar 100 miembros con todas sus relaciones:

```shellscript
node generate-test-data.js --members=100 --output=makerspace-data.json
```

Para generar e importar directamente a Strapi:

```shellscript
node generate-test-data.js --members=50 --import --endpoint=http://localhost:1337/graphql
```

### Consideraciones Adicionales

- El script ahora maneja correctamente las relaciones jerárquicas entre habilidades.
- Se ha mejorado la gestión de errores durante la importación para que un fallo en una entidad no detenga todo el proceso.
- Se guardan los mapeos de IDs para facilitar la referencia y depuración.