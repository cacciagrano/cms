# Resumen de Membresías

## Estructura General

Las membresías son el sistema que define los diferentes niveles de acceso y beneficios disponibles para los usuarios del Maker Space. Cada tipo de membresía está diseñado para satisfacer diferentes necesidades, niveles de experiencia y compromisos de tiempo.

### Tipos de Membresías

| ID | Tipo | Duración | Enfoque | Estado |
|----|------|----------|---------|--------|
| MEMBERSHIP-DAY | Pase de Día | 1 día | Visitantes ocasionales | Activa |
| MEMBERSHIP-000 | Introducción/Prueba | 2 semanas | Nuevos usuarios | Activa |
| MEMBERSHIP-001 | Básica | Mensual/Anual | Uso ocasional | Activa |
| MEMBERSHIP-002 | Estándar | Mensual/Anual | Uso regular | Activa |
| MEMBERSHIP-003 | Premium | Mensual/Anual | Uso intensivo | Activa |
| MEMBERSHIP-004 | Corporativa | Personalizable | Empresas/Grupos | Activa |
| MEMBERSHIP-005 | Educativa | Semestral | Instituciones educativas | En desarrollo |

## Atributos Comunes

Cada membresía contiene los siguientes atributos principales:

### Información General
- **ID**: Identificador único de la membresía
- **Tipo**: Categoría de la membresía
- **Estado**: Activa, Inactiva, En desarrollo
- **Descripción**: Explicación detallada del propósito y beneficios
- **Duración**: Período de validez
- **Renovación**: Políticas de renovación
- **Precio Base**: Costo estándar
- **Descuentos Disponibles**: Reducciones aplicables

### Acceso a Espacios
Tabla que define qué espacios están disponibles para cada membresía:
- Espacio ID
- Nombre del Espacio
- Nivel de Acceso (Básico, Estándar, Completo)
- Horario disponible
- Restricciones
- Notas adicionales

### Acceso a Equipamiento
Tabla que define qué equipos pueden utilizarse:
- Equipo ID
- Nombre del Equipo
- Nivel de Acceso (Supervisado, Limitado, Completo)
- Costo Adicional (si aplica)
- Requisitos de Capacitación
- Notas adicionales

### Beneficios Incluidos
Tabla de beneficios específicos:
- Tipo de Beneficio
- Descripción
- Límites de uso
- Notas adicionales

### Programa de Orientación
Detalle del proceso de incorporación:
- Tour inicial
- Talleres introductorios
- Asesorías
- Evaluaciones

### Requisitos y Proceso de Solicitud
- Requisitos mínimos
- Pasos del proceso
- Documentación necesaria

### Términos y Condiciones
- Políticas de cancelación
- Políticas de reembolso
- Reglas de conducta
- Responsabilidades

## Relaciones con Otros Componentes

### Membresía → Miembros
- Una membresía puede estar asociada a uno o más miembros (dependiendo del tipo)
- Cada miembro activo debe tener exactamente una membresía vigente
- Se mantiene historial de membresías anteriores

### Membresía → Espacios
- Cada membresía define el nivel de acceso a diferentes espacios
- Los horarios pueden variar según el tipo de membresía
- Algunas membresías pueden tener acceso prioritario a ciertos espacios

### Membresía → Equipamiento
- Cada membresía define el nivel de acceso a diferentes equipos
- Algunas membresías incluyen horas gratuitas en equipos específicos
- Los requisitos de capacitación son independientes del tipo de membresía

### Membresía → Habilidades
- Algunas membresías requieren verificación de habilidades para ciertos accesos
- Las membresías avanzadas pueden incluir programas de desarrollo de habilidades

## Implementación Técnica

### Tablas de Base de Datos
- `memberships`: Catálogo de tipos de membresías disponibles
- `member_memberships`: Relación entre miembros y sus membresías (actuales e históricas)
- `membership_benefits`: Beneficios específicos de cada tipo de membresía
- `membership_access`: Definición de accesos a espacios y equipos por tipo de membresía

### API Endpoints
- `/api/memberships`: CRUD para tipos de membresías
- `/api/memberships/{id}/benefits`: Gestión de beneficios por membresía
- `/api/memberships/{id}/access`: Gestión de accesos por membresía
- `/api/members/{id}/membership`: Asignación y gestión de membresía para un miembro

### Interfaces de Usuario
- Catálogo de membresías disponibles
- Comparador de beneficios entre membresías
- Panel de administración de membresías
- Proceso de selección y compra de membresías

## Estado Actual de Implementación

- **Definición de tipos**: Completado (80%)
- **Sistema de beneficios**: Parcialmente implementado (60%)
- **Control de acceso**: En desarrollo (40%)
- **Sistema de pagos**: Planificado (20%)
- **Renovaciones automáticas**: Planificado (10%)

## Próximos Pasos

1. Completar la definición de todos los tipos de membresías
2. Implementar el sistema de control de acceso basado en membresías
3. Desarrollar el sistema de pagos y renovaciones
4. Crear el panel de administración para gestión de membresías
5. Implementar sistema de notificaciones para vencimientos y renovaciones
\`\`\`

## 2. Resumen de Miembros

\`\`\`md project="Maker Space Documentation" file="docs/estructura/memberships-miembros/miembros-resume.md" type="markdown"
# Resumen de Miembros

## Estructura General

Los miembros son los usuarios registrados en el sistema Maker Space que tienen acceso a las instalaciones, equipamiento y servicios según su tipo de membresía. El sistema de miembros gestiona toda la información relacionada con los usuarios, sus perfiles, habilidades, accesos y actividad.

### Tipos de Miembros

| Tipo | Descripción | Características Especiales |
|------|------------|---------------------------|
| Individual | Persona física con membresía personal | Perfil individual, progresión personal |
| Corporativo | Miembro asociado a una empresa | Acceso mediante membresía corporativa, permisos específicos |
| Educativo | Estudiante o docente | Vinculado a institución educativa, acceso en horarios específicos |
| Staff | Personal del Maker Space | Acceso completo, capacidad de supervisión |
| Mentor | Miembro con rol de enseñanza | Capacidad para verificar habilidades, dirigir talleres |

## Atributos Principales

### Información Personal
- **ID**: Identificador único del miembro
- **Nombre Completo**: Nombre y apellidos
- **Correo Electrónico**: Dirección de contacto principal (usuario del sistema)
- **Teléfono**: Número de contacto
- **Dirección**: Información de ubicación
- **Fecha de Nacimiento**: Para verificar requisitos de edad
- **Documento de Identidad**: Tipo y número de documento

### Información de Cuenta
- **Estado**: Activo, Inactivo, Suspendido, Pendiente
- **Fecha de Registro**: Cuando se unió al Maker Space
- **Última Actividad**: Fecha de último acceso o uso
- **Credenciales de Acceso**: Métodos de autenticación (tarjeta, biométrico, código)
- **Permisos Especiales**: Accesos o capacidades adicionales

### Información de Membresía
- **Membresía Actual**: Tipo de membresía activa
- **Fecha de Inicio**: Cuando comenzó la membresía actual
- **Fecha de Vencimiento**: Cuando termina la membresía actual
- **Historial de Membresías**: Registro de membresías anteriores
- **Método de Pago**: Forma de pago asociada
- **Renovación Automática**: Si está habilitada o no

### Habilidades y Certificaciones
- **Habilidades Verificadas**: Lista de habilidades que ha demostrado
- **Nivel por Habilidad**: Principiante, Intermedio, Avanzado, Experto
- **Certificaciones**: Certificaciones formales obtenidas
- **Verificador**: Quién verificó cada habilidad
- **Fecha de Verificación**: Cuándo se verificó cada habilidad

### Actividad y Uso
- **Historial de Acceso**: Registro de entradas y salidas
- **Uso de Espacios**: Registro de reservas y uso de espacios
- **Uso de Equipamiento**: Registro de reservas y uso de equipos
- **Proyectos**: Proyectos asociados al miembro
- **Participación en Eventos**: Talleres, cursos y eventos asistidos

## Procesos Clave

### Registro de Nuevos Miembros
1. Completar formulario de registro (online o presencial)
2. Verificación de identidad y documentación
3. Selección de tipo de membresía
4. Proceso de pago
5. Orientación inicial
6. Configuración de credenciales de acceso
7. Activación de cuenta

### Gestión de Perfil
1. Actualización de información personal
2. Cambio de preferencias y configuraciones
3. Gestión de métodos de pago
4. Visualización de historial de actividad
5. Gestión de habilidades y certificaciones

### Verificación de Habilidades
1. Solicitud de verificación por parte del miembro
2. Asignación de evaluador (mentor o staff)
3. Programación de evaluación práctica
4. Realización de prueba de habilidad
5. Registro de resultado y nivel alcanzado
6. Actualización de permisos de acceso a equipamiento

### Renovación y Cambio de Membresía
1. Notificación previa al vencimiento
2. Opciones de renovación o cambio
3. Proceso de pago
4. Actualización de permisos y accesos
5. Confirmación de nueva vigencia

## Relaciones con Otros Componentes

### Miembro → Membresía
- Cada miembro activo tiene una membresía vigente
- La membresía determina los accesos y beneficios
- Se mantiene historial de cambios de membresía

### Miembro → Habilidades
- Los miembros adquieren y verifican habilidades
- Las habilidades determinan acceso a equipamiento
- El nivel de habilidad puede determinar si requiere supervisión

### Miembro → Espacios/Equipamiento
- Los miembros pueden reservar y utilizar espacios según su membresía
- El acceso a equipamiento depende de membresía y habilidades verificadas
- Se registra todo el uso para análisis y facturación

### Miembro → Proyectos
- Los miembros pueden registrar sus proyectos
- Los proyectos pueden ser individuales o colaborativos
- Los proyectos pueden requerir acceso a recursos específicos

## Implementación Técnica

### Tablas de Base de Datos
- `members`: Información principal de miembros
- `member_skills`: Habilidades verificadas de cada miembro
- `member_access_logs`: Registro de accesos físicos
- `member_equipment_usage`: Registro de uso de equipamiento
- `member_projects`: Proyectos asociados a miembros

### API Endpoints
- `/api/members`: CRUD para miembros
- `/api/members/{id}/skills`: Gestión de habilidades
- `/api/members/{id}/access`: Verificación y registro de accesos
- `/api/members/{id}/usage`: Registro de uso de recursos
- `/api/members/{id}/projects`: Gestión de proyectos

### Interfaces de Usuario
- Formulario de registro de miembros
- Perfil de miembro
- Panel de gestión de habilidades
- Sistema de reservas
- Dashboard de actividad

## Estado Actual de Implementación

- **Registro básico**: Implementado (90%)
- **Perfiles de miembro**: Parcialmente implementado (70%)
- **Verificación de habilidades**: En desarrollo (40%)
- **Sistema de acceso**: Planificado (30%)
- **Análisis de uso**: Planificado (20%)

## Próximos Pasos

1. Completar el sistema de perfiles de miembros
2. Implementar el proceso de verificación de habilidades
3. Desarrollar el sistema de control de acceso
4. Crear el dashboard de actividad y uso
5. Implementar sistema de notificaciones y comunicaciones
\`\`\`

## 3. Documento para la Carga de Miembros

\`\`\`md project="Maker Space Documentation" file="docs/estructura/memberships-miembros/carga-miembros.md" type="markdown"
# Proceso de Carga de Miembros

## Descripción General

Este documento detalla el proceso completo para registrar y dar de alta nuevos miembros en el sistema Maker Space, incluyendo la recopilación de información personal, asignación de membresías, verificación de habilidades iniciales y configuración de accesos.

## Formulario de Registro

### Información Personal
- **Nombre completo**: Nombre y apellidos del miembro
- **Correo electrónico**: Dirección de correo electrónico principal (será el usuario)
- **Teléfono**: Número de contacto
- **Dirección**: Información de ubicación física
- **Fecha de nacimiento**: Para verificar requisitos de edad
- **Documento de identidad**: Tipo y número de documento

### Información Profesional
- **Ocupación**: Actividad profesional principal
- **Empresa/Institución**: Donde trabaja o estudia
- **Áreas de interés**: Campos de interés dentro del Maker Space
- **Experiencia previa**: Experiencia relevante en fabricación, diseño, etc.

### Información de Contacto de Emergencia
- **Nombre**: Persona de contacto en caso de emergencia
- **Relación**: Parentesco o relación con el miembro
- **Teléfono**: Número de contacto de emergencia

## Proceso de Selección de Membresía

### Tipos de Membresía Disponibles
- **Pase de Día**: Acceso por un día específico
- **Membresía Introductoria**: Período de prueba de 2 semanas
- **Membresía Básica**: Acceso general con limitaciones
- **Membresía Estándar**: Acceso regular a instalaciones
- **Membresía Premium**: Acceso completo a instalaciones
- **Membresía Corporativa**: Para empresas o grupos

### Información de Pago
- **Método de pago**: Tarjeta, transferencia, efectivo
- **Frecuencia**: Mensual, trimestral, anual
- **Descuentos aplicables**: Estudiantes, grupos, promociones
- **Renovación automática**: Habilitada/Deshabilitada

## Proceso de Orientación

### Sesión de Bienvenida
- **Duración**: 60 minutos
- **Contenido**: Introducción al Maker Space, normas, seguridad
- **Programación**: Fechas y horarios disponibles

### Recorrido por Instalaciones
- **Espacios disponibles**: Presentación de cada área
- **Equipamiento**: Demostración básica de equipos
- **Protocolos de seguridad**: Procedimientos de emergencia

## Verificación Inicial de Habilidades

### Auto-evaluación
- **Formulario de habilidades**: El miembro indica su nivel en cada habilidad
- **Áreas de conocimiento**: Fabricación digital, electrónica, programación, etc.
- **Nivel declarado**: Principiante, intermedio, avanzado

### Proceso de Verificación
- **Programación de evaluaciones**: Fechas para verificar habilidades
- **Evaluadores asignados**: Personal que realizará las verificaciones
- **Registro de resultados**: Documentación de habilidades verificadas

## Configuración de Acceso

### Credenciales Digitales
- **Usuario del sistema**: Creación de cuenta en plataforma
- **Tarjeta/llave de acceso**: Asignación de credencial física
- **Código QR personal**: Generación de código para check-in

### Permisos Iniciales
- **Espacios accesibles**: Según tipo de membresía
- **Equipamiento autorizado**: Según habilidades verificadas
- **Horarios permitidos**: Franjas horarias de acceso

## Documentación y Acuerdos

### Términos y Condiciones
- **Reglamento interno**: Normas de convivencia y uso
- **Política de seguridad**: Protocolos y responsabilidades
- **Política de privacidad**: Tratamiento de datos personales

### Responsabilidad y Seguros
- **Exención de responsabilidad**: Documento legal
- **Cobertura de seguro**: Alcance y limitaciones
- **Responsabilidad por daños**: Políticas sobre equipamiento

## Proceso Técnico de Carga

### Pasos para el Administrador
1. Acceder al panel de administración
2. Seleccionar "Nuevo Miembro"
3. Completar formulario con datos del miembro
4. Asignar tipo de membresía
5. Configurar método de pago
6. Registrar habilidades iniciales declaradas
7. Asignar credenciales de acceso
8. Programar orientación
9. Activar cuenta

### Validaciones del Sistema
- Verificación de correo electrónico único
- Comprobación de datos obligatorios
- Validación de formato de documentos
- Verificación de pago inicial

### Notificaciones Automáticas
- Correo de bienvenida al nuevo miembro
- Recordatorio de sesión de orientación
- Credenciales de acceso al sistema
- Información sobre próximos pasos

## Flujo de Trabajo para Carga Masiva

### Preparación de Datos
- Formato de archivo CSV/Excel para carga múltiple
- Campos requeridos y opcionales
- Validaciones previas a la importación

### Proceso de Importación
1. Subir archivo de datos
2. Validar formato y contenido
3. Previsualizar información a importar
4. Confirmar importación
5. Revisar registro de errores/advertencias
6. Enviar notificaciones masivas

## Métricas y Seguimiento

### Indicadores de Proceso
- Tiempo promedio de registro
- Tasa de completitud de perfiles
- Porcentaje de verificaciones de habilidades completadas
- Tasa de conversión de visitas a membresías

### Seguimiento Post-Registro
- Encuesta de satisfacción del proceso
- Seguimiento de primera visita
- Recordatorio para completar verificaciones pendientes
- Sugerencias personalizadas basadas en intereses

## Estado Actual de Implementación

- **Formulario de registro**: Implementado (90%)
- **Proceso de pago**: En desarrollo (60%)
- **Verificación de habilidades**: Planificado (20%)
- **Sistema de acceso**: Planificado (10%)
- **Carga masiva**: No iniciado (0%)

## Próximos Pasos

1. Completar integración con sistema de pagos
2. Implementar proceso de verificación de habilidades
3. Desarrollar sistema de credenciales digitales
4. Crear funcionalidad de carga masiva
5. Implementar métricas y reportes de seguimiento
\`\`\`

¿Te parece bien esta estructura? He separado la documentación en tres archivos:

1. `memberships-resume.md` - Resumen general del sistema de membresías
2. `miembros-resume.md` - Resumen general del sistema de miembros
3. `carga-miembros.md` - Proceso detallado para la carga de miembros

Puedo hacer ajustes adicionales o crear documentos más específicos para cada tipo de membresía si lo necesitas.

<Actions>
  <Action name="Crear documentos para cada tipo de membresía" description="Desarrollar documentos detallados para cada tipo de membresía (Básica, Estándar, Premium, etc.)" />
  <Action name="Desarrollar proceso de verificación de habilidades" description="Crear un documento específico para el proceso de verificación de habilidades" />
  <Action name="Crear diagrama de relaciones" description="Desarrollar un diagrama que muestre las relaciones entre miembros, membresías y otros componentes" />
  <Action name="Documentar proceso de renovación" description="Crear un documento detallado sobre el proceso de renovación y cambio de membresías" />
  <Action name="Elaborar plantillas de formularios" description="Diseñar plantillas para los formularios de registro y gestión de miembros" />
</Actions>

\`\`\`
