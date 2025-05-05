# Proceso de Verificación de Habilidades

## Introducción

El proceso de verificación de habilidades es fundamental para garantizar la seguridad y el uso adecuado de los equipos y recursos del Maker Space. Este proceso permite validar que los miembros poseen los conocimientos y competencias necesarias para utilizar determinados equipos, espacios o herramientas, especialmente aquellos que requieren capacitación específica o presentan riesgos potenciales.

### Objetivos del Proceso

- Garantizar la seguridad de los miembros durante el uso de equipos
- Prevenir daños a los equipos por uso inadecuado
- Establecer un sistema de progresión de habilidades para los miembros
- Fomentar el aprendizaje continuo y el desarrollo de competencias
- Crear una comunidad de mentores y aprendices

### Roles Involucrados

- **Miembro**: Persona que busca verificar sus habilidades
- **Verificador**: Miembro con autorización para validar habilidades (instructor, staff o miembro avanzado)
- **Administrador**: Personal encargado de gestionar el sistema de habilidades
- **Sistema Strapi**: Plataforma que registra y gestiona las verificaciones

## Diagrama de Flujo del Proceso

```mermaid
graph TD
    A[Miembro Solicita Verificación] --> B{¿Requiere Capacitación?}
    B -->|Sí| C[Inscripción en Capacitación]
    C --> D[Completar Capacitación]
    D --> E[Evaluación Práctica]
    B -->|No| E
    E -->|No Aprobado| F[Feedback y Recomendaciones]
    F --> B
    E -->|Aprobado| G[Registro de Habilidad]
    G --> H[Actualización de Permisos]
    H --> I[Notificación al Miembro]
    I --> J[Habilidad Verificada]