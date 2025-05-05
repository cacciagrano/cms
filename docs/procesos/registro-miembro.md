# Proceso de Registro de Miembros

## Introducción

El proceso de registro de miembros es el punto de entrada principal para los usuarios que desean unirse al Maker Space. Este proceso está diseñado para recopilar la información necesaria, verificar la identidad del usuario, gestionar el pago de la membresía y proporcionar acceso a los recursos según el tipo de membresía seleccionada.

### Objetivos del Proceso

- Recopilar información precisa y completa del nuevo miembro
- Verificar la identidad y elegibilidad del solicitante
- Facilitar la selección y pago de la membresía adecuada
- Activar los accesos y permisos correspondientes
- Introducir al nuevo miembro a los recursos y comunidad

### Roles Involucrados

- **Solicitante/Usuario**: Persona que desea convertirse en miembro
- **Administrador**: Personal encargado de verificar y aprobar solicitudes
- **Sistema Strapi**: Automatización del proceso y gestión de datos
- **Pasarela de Pago**: Servicio externo para procesar pagos

## Diagrama de Flujo del Proceso

```mermaid
graph TD
    A[Usuario Inicia Registro] -->|Completa Formulario| B[Envío de Datos Básicos]
    B --> C{Validación de Datos}
    C -->|Datos Incorrectos| D[Notificar Errores]
    D --> B
    C -->|Datos Correctos| E[Crear Perfil Preliminar]
    E --> F[Selección de Membresía]
    F --> G[Proceso de Pago]
    G -->|Pago Exitoso| H[Verificación de Identidad]
    G -->|Pago Fallido| I[Notificar Error de Pago]
    I --> G
    H -->|Verificación Automática| J[Activación de Cuenta]
    H -->|Requiere Revisión Manual| K[Cola de Revisión Admin]
    K -->|Aprobado| J
    K -->|Rechazado| L[Notificar Rechazo]
    J --> M[Enviar Bienvenida]
    M --> N[Orientación Inicial]
    N --> O[Miembro Activo]