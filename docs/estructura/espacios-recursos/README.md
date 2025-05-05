# Espacios y Recursos

Esta sección documenta los diferentes espacios físicos y recursos disponibles en el Maker Space.

## Espacios Disponibles

- [Advanced Tech Lab](./advanced-tech-lab.md) - Laboratorio de tecnologías avanzadas
- [Creative Media Studio](./creative-media-studio.md) - Estudio de medios creativos
- [Main Fabrication Lab](./main-fabrication-lab.md) - Laboratorio principal de fabricación
- [Makers Rapid Prototyping Zone](./makers-rapid-prototyping-zone.md) - Zona de prototipado rápido
- [Specialty Technologies Lab](./specialty-technologies-lab.md) - Laboratorio de tecnologías especializadas

## Resumen

Para una visión general de todos los espacios y recursos, consulta el [resumen](./resume.md).

## Modelo de Datos

Los espacios y recursos se implementan en Strapi mediante los siguientes content types:
- `space` - Representa áreas físicas del Maker Space
- `equipment` - Representa herramientas y equipos disponibles
- `resource` - Representa recursos consumibles y materiales

## Relaciones Principales

- Los espacios contienen equipamiento
- Las membresías otorgan acceso a espacios y equipamiento
- Las habilidades pueden ser requeridas para usar ciertos equipos
