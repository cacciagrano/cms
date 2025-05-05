# [Nombre del Content Type]

## Descripción General

Breve descripción del propósito y función de este content type en el sistema.

## Modelo de Datos

\`\`\`json
{
  "kind": "collectionType",
  "collectionName": "nombre_coleccion",
  "info": {
    "singularName": "nombre_singular",
    "pluralName": "nombre_plural",
    "displayName": "Nombre Mostrado",
    "description": "Descripción del content type"
  },
  "options": {
    "draftAndPublish": true|false
  },
  "attributes": {
    // Atributos del modelo
  }
}
\`\`\`

## Atributos

| Nombre | Tipo | Descripción | Requerido | Único | Valor por defecto |
|--------|------|-------------|-----------|-------|-------------------|
| attr1  | tipo | descripción | Sí/No     | Sí/No | valor             |
| attr2  | tipo | descripción | Sí/No     | Sí/No | valor             |

## Relaciones

| Relación | Tipo | Content Type Relacionado | Descripción |
|----------|------|--------------------------|-------------|
| rel1     | tipo | content-type             | descripción |
| rel2     | tipo | content-type             | descripción |

## API Endpoints

### Obtener todos los registros

\`\`\`
GET /api/[nombre-plural]
\`\`\`

### Obtener un registro específico

\`\`\`
GET /api/[nombre-plural]/:id
\`\`\`

## Ejemplos de Uso

### Ejemplo de creación

\`\`\`javascript
// Código de ejemplo para crear un nuevo registro
\`\`\`

### Ejemplo de consulta

\`\`\`javascript
// Código de ejemplo para consultar registros
\`\`\`

## Reglas de Negocio

* Lista de reglas de negocio aplicables a este content type
* Validaciones específicas
* Comportamientos esperados

## Notas Adicionales

Información adicional relevante para este content type.
