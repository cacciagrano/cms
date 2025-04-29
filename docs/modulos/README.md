# Documentación del Sistema de Gestión para Espacios Colaborativos

Este directorio contiene la documentación completa del sistema.

## Estructura de Archivos

- `project-overview.md` - Descripción general del proyecto y sus características principales
- `espacios-y-recursos.md` - Documentación detallada del módulo de gestión de espacios y recursos
- `comunidad-y-miembros.md` - Documentación detallada del módulo de comunidad y miembros
- `proyectos-y-colaboracion.md` - Documentación detallada del módulo de proyectos y colaboración
- `operaciones.md` - Documentación detallada del módulo de operaciones (eventos, reservas, etc.)
- `sistema-financiero.md` - Documentación detallada del módulo financiero (pagos, facturas, transacciones)
- (Próximamente) Documentación adicional sobre optimizaciones y guías de implementación

## Módulos del Sistema

### Gestión de Espacios y Recursos
- Espacios físicos (Space)
- Áreas especializadas (Area)
- Equipamiento (Equipment)
- Herramientas (Tool)
- Consumibles (Consumable)
- Recursos educativos (Resource)

### Comunidad y Miembros
- Miembros (Member)
- Membresías (Membership)
- Suscripciones (MembershipSubscription)
- Habilidades (Skill)
- Intercambio de conocimientos (SkillExchange)
- Mentorías (Mentorship)

### Proyectos y Colaboración
- Proyectos (Project)
- Necesidades de proyectos (ProjectNeed)
- Ofertas de colaboración (CollaborationOffer)
- Solicitudes de colaboración (CollaborationRequest)
- Coincidencias (CollaborationMatch)
- Acuerdos de colaboración (CollaborationAgreement)

### Operaciones
- Eventos (Event)
- Reservas (Reservation)
- Asistencia (Attendance)
- Registro de accesos (AccessLog)
- Capacitaciones (Training)

### Sistema Financiero
- Pagos (Payment)
- Facturas (Invoice)
- Transacciones (Transaction)
- Métodos de pago (PaymentMethod)
- Pasarelas de pago (PaymentGateway)
- Planes de pago (PaymentPlan)
- Descuentos (Discount)

## Componentes Reutilizables

El sistema utiliza componentes reutilizables para estructurar la información:

- **Información de activos** (asset.info)
- **Seguimiento de auditoría** (audit.tracking)
- **Colaboración** (collaboration.*)
- **Metadatos** (common.metadata, metadata.*)
- **Ubicación** (location.geo)
- **Información de miembros** (member.*)
- **Pagos** (payment.*)
