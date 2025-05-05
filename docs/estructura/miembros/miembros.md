# Sistema de Miembros en Maker Space

## Descripción General

El sistema de miembros gestiona los usuarios registrados en el Maker Space, sus perfiles, habilidades y relaciones con otros componentes del sistema como membresías, reservas y pagos.

## Modelo de Datos

El miembro es la entidad central que representa a un usuario registrado en el sistema. Cada miembro puede tener diferentes tipos de membresías, habilidades certificadas, y acceso a diversos recursos según su nivel de membresía.

### Content Type: Member

\`\`\`json
{
  "kind": "collectionType",
  "collectionName": "members",
  "info": {
    "singularName": "member",
    "pluralName": "members",
    "displayName": "Member",
    "description": "Usuarios registrados en el Maker Space"
  },
  "options": {
    "draftAndPublish": true
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true
    },
    "email": {
      "type": "email",
      "required": true,
      "unique": true
    },
    "phone": {
      "type": "string"
    },
    "birthDate": {
      "type": "date"
    },
    "status": {
      "type": "enumeration",
      "enum": [
        "active",
        "inactive",
        "pending",
        "suspended"
      ],
      "default": "pending",
      "required": true
    },
    "contactInfo": {
      "type": "component",
      "repeatable": false,
      "component": "member.contactinfo"
    },
    "profileInfo": {
      "type": "component",
      "repeatable": false,
      "component": "member.profileinfo"
    },
    "emergencyContact": {
      "type": "component",
      "repeatable": false,
      "component": "member.emergencycontact"
    },
    "preferences": {
      "type": "component",
      "repeatable": false,
      "component": "member.preferences"
    },
    "memberships": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::membership.membership",
      "inversedBy": "members"
    },
    "membershipPeriods": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::membershipperiod.membershipperiod",
      "mappedBy": "member"
    },
    "skills": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::memberskill.memberskill",
      "mappedBy": "member"
    }
  }
}
\`\`\`

## Perfiles de Usuario

Para entender mejor los diferentes tipos de miembros y sus necesidades, hemos desarrollado [perfiles de usuario típicos](./perfiles-usuario.md) que representan casos de uso comunes.

## Relaciones con Otros Componentes

### Membresías

Los miembros pueden suscribirse a diferentes [tipos de membresías](../membresias/membresias.md), que determinan su nivel de acceso y beneficios en el Maker Space.

### Habilidades

Los miembros pueden adquirir y certificar [habilidades](../habilidades/README.md) que les permiten utilizar equipamiento específico o participar en ciertas actividades.

### Espacios y Recursos

Los miembros acceden a [espacios y recursos](../espacios-recursos/README.md) según los permisos otorgados por su membresía y habilidades certificadas.

## Procesos Relacionados

* [Registro de Miembro](../../procesos/registro-miembro.md) - Proceso de alta de nuevos miembros
* [Verificación de Habilidades](../../procesos/verificacion-habilidades.md) - Certificación de competencias
* [Gestión de Membresías](../../procesos/gestion-membresias.md) - Administración de suscripciones

## Implementación Técnica

Para detalles sobre la implementación técnica y ejemplos de código, consulta la [documentación técnica de miembros](../../tecnico/ejemplos-codigo.md#miembros).
