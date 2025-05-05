# Proyectos y Colaboración

## Descripción General

El módulo de Proyectos y Colaboración es el núcleo social y productivo del sistema, facilitando la creación de proyectos, la identificación de necesidades de habilidades, y el establecimiento de conexiones entre miembros para colaborar. Este módulo implementa un sofisticado sistema de matching que conecta las necesidades de los proyectos con las habilidades de los miembros, promoviendo la colaboración y el intercambio de conocimientos dentro de la comunidad.

## Estructura de Datos

### Proyectos (Project)

Los proyectos representan iniciativas que pueden requerir colaboración de miembros con habilidades específicas.

**Características principales:**
- Información básica (título, descripción, slug)
- Estado del proyecto (planificación, activo, pausado, completado, cancelado)
- Visibilidad (público, solo miembros, privado, solo por invitación)
- Fechas de inicio y fin
- Categoría y etiquetas
- Recursos multimedia (imagen principal, galería, archivos)
- Información de sitio web y repositorio
- Presupuesto y fuente de financiación
- Configuración de código abierto y licencia

**Relaciones clave:**
- Cada proyecto tiene un propietario (miembro)
- Los proyectos pueden tener múltiples miembros colaboradores
- Los proyectos pueden tener múltiples necesidades de habilidades
- Los proyectos pueden generar solicitudes de colaboración
- Los proyectos pueden tener acuerdos de colaboración formalizados

### Necesidades de Proyecto (ProjectNeed)

Representa las habilidades específicas que un proyecto necesita para avanzar.

**Características principales:**
- Información básica (título, descripción)
- Estado de la necesidad (abierta, en progreso, cubierta, cancelada)
- Prioridad (baja, media, alta, crítica)
- Horas requeridas estimadas
- Fecha límite
- Posibilidad de trabajo remoto
- Tipo de compensación ofrecida
- Nivel mínimo de experiencia requerido

**Relaciones clave:**
- Cada necesidad pertenece a un proyecto específico
- Las necesidades requieren habilidades específicas
- Las necesidades pueden recibir ofertas de colaboración
- Las necesidades pueden generar coincidencias (matches)

### Ofertas de Colaboración (CollaborationOffer)

Representa el interés de un miembro en colaborar en una necesidad específica de un proyecto.

**Características principales:**
- Mensaje de presentación y motivación
- Estado de la oferta (pendiente, aceptada, rechazada, retirada)
- Horas disponibles para dedicar
- Fechas de disponibilidad
- Expectativas de compensación
- URL de portfolio o trabajos previos
- Información adicional relevante

**Relaciones clave:**
- Cada oferta es realizada por un miembro
- Cada oferta está dirigida a una necesidad específica de proyecto
- Las ofertas incluyen habilidades relevantes del miembro
- Las ofertas pueden generar coincidencias (matches)

### Solicitudes de Colaboración (CollaborationRequest)

Representa una invitación directa a un miembro para colaborar en un proyecto.

**Características principales:**
- Mensaje de invitación y descripción
- Estado de la solicitud (pendiente, aceptada, rechazada, expirada, retirada)
- Horas semanales requeridas
- Fechas propuestas
- Tipo de compensación ofrecida
- Fecha de expiración de la solicitud

**Relaciones clave:**
- Cada solicitud está asociada a un proyecto
- Cada solicitud está dirigida a un miembro específico
- Las solicitudes especifican habilidades requeridas
- Las solicitudes son creadas por un miembro (generalmente el propietario del proyecto)

### Coincidencias de Colaboración (CollaborationMatch)

Representa una coincidencia potencial entre una necesidad de proyecto y una oferta de colaboración.

**Características principales:**
- Puntuación de compatibilidad (0-100)
- Estado de la coincidencia (propuesta, aceptada, rechazada, expirada)
- Fechas de propuesta y respuesta
- Fecha de expiración
- Notas sobre la compatibilidad
- Tipo de coincidencia (automática, manual, recomendada)

**Relaciones clave:**
- Cada coincidencia conecta una necesidad de proyecto con una oferta de colaboración
- Las coincidencias pueden convertirse en acuerdos formales
- Las coincidencias son propuestas por un miembro (o el sistema)

### Acuerdos de Colaboración (CollaborationAgreement)

Representa un acuerdo formal entre un miembro y un proyecto para colaborar.

**Características principales:**
- Información básica (título, descripción)
- Estado del acuerdo (borrador, activo, completado, terminado, cancelado)
- Fechas de inicio y fin
- Horas semanales comprometidas
- Entregables específicos
- Hitos importantes
- Tipo de compensación y detalles
- Términos y condiciones
- Acuerdos sobre propiedad intelectual
- Confidencialidad
- Cláusulas de terminación

**Relaciones clave:**
- Cada acuerdo está asociado a un proyecto
- Cada acuerdo involucra a un miembro
- Los acuerdos pueden originarse de una coincidencia
- Los acuerdos especifican las habilidades involucradas

## Funcionalidades Principales

### Sistema de Matching

El sistema de matching es una funcionalidad central que conecta automáticamente las necesidades de los proyectos con las habilidades de los miembros.

**Proceso de matching:**
1. Análisis de necesidades de proyectos activas
2. Identificación de miembros con habilidades relevantes
3. Cálculo de puntuación de compatibilidad basada en:
   - Coincidencia de habilidades
   - Nivel de experiencia
   - Disponibilidad de tiempo
   - Preferencias de compensación
   - Historial de colaboraciones previas
4. Generación de propuestas de coincidencia
5. Notificación a las partes interesadas

### Gestión de Entregables

Los acuerdos de colaboración pueden incluir entregables específicos que se deben completar.

**Características de los entregables:**
- Título y descripción
- Fecha de entrega prevista
- Estado (pendiente, en progreso, revisión, completado, retrasado)
- Criterios de aceptación
- Prioridad
- Fecha real de finalización
- Archivos adjuntos

### Seguimiento de Hitos

Los acuerdos de colaboración pueden incluir hitos importantes que marcan el progreso del proyecto.

**Características de los hitos:**
- Título y descripción
- Fecha prevista
- Estado (pendiente, en progreso, alcanzado, retrasado, cancelado)
- Fecha real de consecución
- Notas adicionales

### Gestión de Propiedad Intelectual

Los acuerdos de colaboración incluyen términos específicos sobre la propiedad intelectual.

**Aspectos cubiertos:**
- Titularidad de los derechos
- Licencias aplicables
- Uso comercial
- Atribución
- Publicación y distribución

## Integración con Otros Módulos

### Integración con Habilidades

- Las necesidades de proyectos requieren habilidades específicas
- Las ofertas de colaboración se basan en las habilidades verificadas de los miembros
- El sistema de matching utiliza el nivel de habilidad para calcular la compatibilidad

### Integración con Miembros

- Los miembros pueden ser propietarios de proyectos
- Los miembros pueden colaborar en múltiples proyectos
- Los miembros pueden hacer ofertas de colaboración
- Los miembros pueden recibir solicitudes de colaboración

### Integración con Pagos

- Los acuerdos de colaboración pueden incluir compensación económica
- Se pueden generar pagos asociados a entregables o hitos
- Se pueden aplicar descuentos o promociones a ciertos tipos de colaboración

## Flujos de Trabajo Típicos

1. **Creación y publicación de proyecto**:
   - Un miembro crea un nuevo proyecto
   - Define las necesidades de habilidades
   - Establece los términos de colaboración
   - Publica el proyecto con la visibilidad adecuada

2. **Búsqueda de colaboradores**:
   - El sistema identifica automáticamente posibles colaboradores
   - El propietario del proyecto puede enviar solicitudes directas
   - Los miembros pueden buscar proyectos y enviar ofertas de colaboración

3. **Proceso de matching**:
   - Se generan coincidencias entre necesidades y ofertas
   - Las partes reciben notificaciones
   - Ambas partes pueden aceptar o rechazar la coincidencia

4. **Formalización de acuerdo**:
   - Se crea un acuerdo de colaboración
   - Se definen entregables y hitos
   - Se establecen términos y condiciones
   - Ambas partes firman el acuerdo

5. **Ejecución y seguimiento**:
   - El colaborador trabaja en los entregables
   - Se registra el progreso de los hitos
   - Se realizan revisiones periódicas
   - Se completan los entregables

6. **Finalización de colaboración**:
   - Se verifican todos los entregables
   - Se completa el acuerdo
   - Se registra feedback mutuo
   - Se actualiza el historial de colaboraciones

## Consideraciones Técnicas

### Cálculo de Compatibilidad

El sistema utiliza un algoritmo ponderado para calcular la puntuación de compatibilidad:

- Coincidencia exacta de habilidades: 40%
- Nivel de experiencia adecuado: 25%
- Disponibilidad de tiempo compatible: 15%
- Expectativas de compensación alineadas: 10%
- Historial de colaboraciones exitosas: 10%

### Gestión de Estados

Todas las entidades principales (proyectos, necesidades, ofertas, solicitudes, coincidencias y acuerdos) implementan un sistema de seguimiento de estado que incluye:

- Estado actual
- Estado anterior
- Fecha de cambio de estado
- Historial completo de cambios de estado con fechas y razones

### Soft Delete

El sistema implementa un mecanismo de "soft delete" para proyectos y acuerdos de colaboración:

- Campo `deletedAt` que marca cuándo fue eliminado
- Filtrado automático para excluir elementos eliminados
- Métodos para restaurar elementos eliminados

### Auditoría y Seguimiento

El componente `audit.tracking` proporciona un sistema unificado de auditoría que incluye:

- Usuario que creó el registro
- Usuario que actualizó por última vez
- Registro detallado de cambios
- Última acción realizada y timestamp

## Casos de Uso Avanzados

### Colaboración Multidisciplinaria

El sistema permite la colaboración en proyectos que requieren múltiples habilidades:

- Un proyecto puede tener varias necesidades de habilidades diferentes
- Diferentes miembros pueden colaborar en distintos aspectos del proyecto
- Se pueden establecer dependencias entre entregables

### Mentorías a través de Proyectos

Los proyectos pueden servir como vehículos para mentorías:

- Miembros experimentados pueden colaborar con principiantes
- Se pueden definir objetivos de aprendizaje como parte de los entregables
- El sistema puede sugerir colaboraciones basadas en oportunidades de aprendizaje

### Proyectos Comunitarios

El sistema facilita la creación y gestión de proyectos comunitarios:

- Proyectos con múltiples colaboradores
- Diferentes niveles de participación
- Toma de decisiones distribuida
- Reconocimiento de contribuciones

### Proyectos Comerciales

El sistema también soporta proyectos con fines comerciales:

- Acuerdos de confidencialidad
- Términos específicos de propiedad intelectual
- Compensación económica
- Contratos formales
