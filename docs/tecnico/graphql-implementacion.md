# Implementación de GraphQL en Maker Space (Strapi v5.12.6)

## Introducción

Este documento detalla la implementación de GraphQL en el sistema Maker Space utilizando Strapi v5.12.6. GraphQL proporciona una capa de API flexible y eficiente que permite consultas precisas y reduce el tráfico de red, lo cual es especialmente beneficioso para las complejas relaciones de datos en nuestro sistema.

## Configuración en Strapi v5.12.6

### Instalación del Plugin

En Strapi v5.12.6, la instalación del plugin GraphQL se realiza mediante:

```bash
npm install @strapi/plugin-graphql@5.12.6
```

> **Nota importante**: Es crucial utilizar la misma versión del plugin que la versión de Strapi para evitar incompatibilidades.

### Configuración del Plugin

A diferencia de versiones anteriores, en Strapi v5.12.6 la configuración del plugin se realiza en el archivo `./config/plugins.js`:

```javascript
module.exports = {
  graphql: {
    config: {
      endpoint: '/graphql',
      shadowCRUD: true,
      playgroundAlways: false,
      depthLimit: 7,
      amountLimit: 100,
      apolloServer: {
        tracing: false,
        introspection: true,
      },
    },
  },
};
```

#### Parámetros clave:

- `endpoint`: Ruta donde se expondrá la API GraphQL
- `shadowCRUD`: Habilita la generación automática de tipos y resolvers basados en los modelos de contenido
- `playgroundAlways`: Determina si el playground de GraphQL está disponible en producción
- `depthLimit`: Limita la profundidad de las consultas anidadas para prevenir ataques DoS
- `amountLimit`: Limita la cantidad de entidades que se pueden solicitar en una sola consulta

### Reinicio y Verificación

Después de la instalación y configuración:

1. Reinicia el servidor Strapi:
   ```bash
   npm run develop
   ```

2. Verifica que el endpoint GraphQL esté disponible en:
   ```
   http://localhost:1337/graphql
   ```

## Particularidades de GraphQL en Strapi v5.12.6

### Cambios en la Estructura de Tipos

En Strapi v5.12.6, la estructura de tipos de GraphQL ha sido modificada respecto a versiones anteriores:

1. **Nomenclatura de tipos**: Los tipos ahora siguen una convención más estricta:
   - `Query`: Contiene todas las consultas disponibles
   - `Mutation`: Contiene todas las mutaciones disponibles
   - `EntityName`: Representa el tipo de entidad (por ejemplo, `Member`, `Skill`)
   - `EntityNameEntity`: Representa la entidad con metadatos (por ejemplo, `MemberEntity`)
   - `EntityNameEntityResponse`: Representa la respuesta para una entidad única
   - `EntityNameEntityResponseCollection`: Representa la respuesta para una colección de entidades

2. **Campos de metadatos**: Cada entidad ahora incluye campos de metadatos adicionales:
   - `id`: ID único de la entidad
   - `attributes`: Contiene los atributos de la entidad
   - `__typename`: Nombre del tipo GraphQL

### Ejemplo de Estructura de Tipos en v5.12.6

```graphql
type Query {
  member(id: ID!): MemberEntityResponse
  members(
    filters: MemberFiltersInput
    pagination: PaginationArg = {}
    sort: [String] = []
  ): MemberEntityResponseCollection
  # Otras consultas...
}

type MemberEntity {
  id: ID
  attributes: Member
}

type Member {
  name: String
  email: String
  status: ENUM_MEMBER_STATUS
  membershipNumber: String
  createdAt: DateTime
  updatedAt: DateTime
  membership: MembershipEntityResponse
  skills: MemberSkillRelationResponseCollection
  # Otros campos...
}

type MemberEntityResponse {
  data: MemberEntity
}

type MemberEntityResponseCollection {
  data: [MemberEntity]
  meta: ResponseCollectionMeta
}
