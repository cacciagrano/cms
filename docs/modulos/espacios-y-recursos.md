# Gestión de Espacios y Recursos

## Descripción General

El módulo de Gestión de Espacios y Recursos es uno de los pilares fundamentales del sistema, permitiendo administrar todos los activos físicos y digitales disponibles en el espacio colaborativo. Este módulo está diseñado para facilitar la organización, reserva, mantenimiento y seguimiento de espacios físicos, equipamiento, herramientas y recursos educativos.

## Estructura de Datos

### Espacios (Space)

Los espacios representan las ubicaciones físicas principales que pueden contener múltiples áreas especializadas.

**Características principales:**
- Información básica (nombre, descripción, tipo, capacidad)
- Ubicación geográfica y detalles del edificio
- Características disponibles (aire acondicionado, proyector, etc.)
- Horarios de apertura
- Estado actual (disponible, ocupado, en mantenimiento)
- Niveles de membresía requeridos para acceso
- Historial de cambios de estado

**Relaciones clave:**
- Un espacio puede contener múltiples áreas
- Los espacios están asociados a tipos de membresía que tienen acceso
- Los espacios pueden ser etiquetados para facilitar la búsqueda

### Áreas (Area)

Las áreas son zonas especializadas dentro de un espacio, con flujos de trabajo integrados y equipamiento específico.

**Características principales:**
- Información básica (nombre, descripción, código)
- Ubicación dentro del espacio
- Horarios específicos de uso
- Supervisores responsables
- Estado actual y historial
- Nivel de habilidad requerido para acceso
- Opciones de reserva

**Relaciones clave:**
- Cada área pertenece a un espacio
- Las áreas contienen equipamiento, herramientas, consumibles y recursos
- Las áreas tienen supervisores (principal y adicionales)
- Las áreas pueden requerir habilidades específicas para su uso

### Equipamiento (Equipment)

Representa maquinaria y dispositivos de mayor complejidad disponibles en las áreas.

**Características principales:**
- Información básica (nombre, descripción, código interno)
- Tipo de ubicación (fijo, móvil, compartido)
- Información unificada del activo (imagen, instrucciones, mantenimiento)
- Usuario actual
- Habilidades requeridas para su uso

**Relaciones clave:**
- El equipamiento pertenece a un área específica
- Puede tener herramientas compatibles asociadas
- Requiere habilidades específicas para su uso
- Puede requerir capacitaciones específicas

### Herramientas (Tool)

Representa instrumentos y utensilios más pequeños y específicos.

**Características principales:**
- Información básica (nombre, descripción, código interno)
- Tipo de herramienta
- Información unificada del activo
- Ubicación específica
- Compatibilidad con equipamiento

**Relaciones clave:**
- Las herramientas pertenecen a un área
- Pueden ser compatibles con ciertos equipos
- Pueden requerir capacitaciones específicas

### Consumibles (Consumable)

Materiales e insumos que se consumen durante el uso de los espacios y equipamiento.

**Características principales:**
- Información básica (nombre, descripción, tipo)
- Unidad de medida y cantidad
- Fecha de vencimiento e instrucciones de almacenamiento
- Estado del inventario

**Relaciones clave:**
- Los consumibles están asociados a un área específica
- Se registra su consumo a través de la entidad "Consumption"

### Recursos (Resource)

Recursos educativos, técnicos o documentales disponibles para los miembros.

**Características principales:**
- Información básica (nombre, descripción, tipo)
- Formato (físico, digital o ambos)
- Información de autoría y publicación
- Tipo de licencia y nivel de acceso
- Estado actual y versión

**Relaciones clave:**
- Los recursos están asociados a un área
- Pueden estar relacionados con habilidades específicas
- Pueden tener un usuario actual asignado

## Funcionalidades Principales

### Sistema de Reservas

El sistema de reservas permite a los miembros reservar espacios, herramientas y recursos para su uso en momentos específicos.

**Entidad: Reservation**
- Registra fecha y hora de inicio y fin
- Seguimiento del estado de la reserva
- Propósito y notas
- Miembro que realiza la reserva
- Elemento reservado (espacio, herramienta o recurso)
- Historial de cambios de estado

### Registro de Accesos

El sistema registra todos los accesos a áreas y recursos para fines de seguridad y análisis.

**Entidad: AccessLog**
- Miembro que accede
- Timestamp del acceso
- Tipo de acceso (entrada a área, salida, uso de equipo, etc.)
- Elemento accedido (área, equipo, recurso)
- Estado del acceso (concedido, denegado, expirado, error)
- Método de acceso (RFID, código QR, PIN, etc.)
- Información de ubicación y dispositivo

### Gestión de Consumibles

El sistema permite registrar y seguir el consumo de materiales e insumos.

**Entidad: Consumption**
- Fecha y cantidad consumida
- Propósito y notas
- Miembro que realizó el consumo
- Consumible utilizado
- Área donde se realizó el consumo
- Evento asociado (opcional)

### Seguimiento de Estado

Todas las entidades principales (espacios, áreas, equipamiento, etc.) implementan un sistema unificado de seguimiento de estado que incluye:

- Estado actual
- Historial de cambios de estado con fechas
- Razones de los cambios
- Timestamps de los cambios

### Gestión de Inventario

El componente `assetInfo` proporciona una estructura unificada para la gestión de inventario que incluye:

- Número de inventario único
- Cantidad disponible y mínima
- Estado del inventario
- Fechas de reposición
- Proveedor
- Historial de mantenimiento
- Especificaciones técnicas

## Integración con Otros Módulos

### Integración con Membresías

- Los espacios y áreas pueden requerir niveles específicos de membresía para su acceso
- Las reglas de acceso en las membresías definen qué recursos pueden utilizar los miembros

### Integración con Habilidades

- Las áreas y equipamiento pueden requerir habilidades específicas para su uso
- Se verifica que los miembros tengan las habilidades necesarias antes de permitir el acceso

### Integración con Eventos

- Los espacios y recursos pueden ser reservados para eventos
- El consumo de materiales puede estar asociado a eventos específicos

### Integración con Pagos

- El uso de espacios y recursos puede generar cargos
- Los pagos pueden estar asociados al uso de recursos específicos

## Flujos de Trabajo Típicos

1. **Reserva de espacio o recurso**:
   - El miembro busca un espacio o recurso disponible
   - El sistema verifica que el miembro tenga la membresía y habilidades requeridas
   - Se crea una reserva con fecha y hora específicas
   - El estado del espacio o recurso se actualiza a "reservado" durante ese período

2. **Acceso a un área**:
   - El miembro se identifica (RFID, QR, etc.)
   - El sistema verifica permisos y registra el acceso
   - Se actualiza el estado del área a "ocupado"
   - Al salir, se registra la salida y se actualiza el estado

3. **Uso de consumibles**:
   - El miembro registra el consumo de materiales
   - Se actualiza el inventario
   - Si la cantidad llega al mínimo, se genera una alerta

4. **Mantenimiento de equipamiento**:
   - Se programa mantenimiento según el intervalo definido
   - Se actualiza el estado a "en mantenimiento"
   - Se registran las acciones realizadas
   - Se actualiza el historial de mantenimiento

## Consideraciones Técnicas

### Soft Delete

La mayoría de las entidades implementan un mecanismo de "soft delete" que permite recuperar elementos eliminados:

- Campo `deletedAt` que marca cuándo fue eliminado
- Filtrado automático para excluir elementos eliminados
- Métodos para restaurar elementos eliminados

### Seguimiento de Auditoría

El componente `audit.tracking` proporciona un sistema unificado de auditoría que incluye:

- Usuario que creó el registro
- Usuario que actualizó por última vez
- Registro detallado de cambios
- Última acción realizada y timestamp

### Metadatos Unificados

El componente `common.metadata` permite almacenar información adicional de forma estructurada:

- Pares clave-valor
- Categorización de metadatos
- Tipado de datos
- Fuente y timestamp
