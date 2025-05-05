# Guía de Estilo para Documentación

Esta guía establece los estándares para mantener una documentación consistente y de alta calidad en el proyecto Maker Space.

## Estructura de Archivos

### Nombres de Archivos
- Usar kebab-case para nombres de archivos: `nombre-del-archivo.md`
- Excepciones: IDs específicos pueden usar mayúsculas (ej: `MEMBERSHIP-001.md`)
- Usar extensión `.md` para todos los archivos de documentación

### Organización de Carpetas
- Agrupar documentos relacionados en carpetas temáticas
- Incluir un archivo `README.md` en cada carpeta
- Limitar la profundidad de anidamiento a máximo 3 niveles

## Formato Markdown

### Encabezados
- Usar un solo `#` para el título principal del documento
- No repetir el título en el contenido
- Seguir una jerarquía lógica: `#`, `##`, `###`, etc.
- No saltar niveles (ej: de `##` a `####`)

### Listas
- Usar `-` para listas no ordenadas
- Usar `1.` para listas ordenadas
- Mantener consistencia en la indentación para sublistas (2 espacios)

### Código
- Usar bloques de código con triple backtick y especificar el lenguaje
- Para código en línea, usar backtick simple

\`\`\`javascript
// Ejemplo de bloque de código
function ejemplo() {
  return "Hola mundo";
}
\`\`\`

### Tablas
- Usar tablas para presentar datos estructurados
- Incluir siempre una fila de encabezado
- Alinear el contenido para mejor legibilidad

| Columna 1 | Columna 2 | Columna 3 |
|-----------|-----------|-----------|
| Dato 1    | Dato 2    | Dato 3    |

### Enlaces
- Usar enlaces relativos para documentos internos
- Usar enlaces absolutos para recursos externos
- Incluir texto descriptivo en los enlaces, no solo URLs

## Contenido

### Tono y Estilo
- Usar tono profesional pero accesible
- Evitar jerga innecesaria
- Explicar acrónimos y términos técnicos en su primera aparición
- Usar voz activa en lugar de pasiva

### Imágenes y Diagramas
- Incluir texto alternativo para todas las imágenes
- Usar diagramas para explicar conceptos complejos
- Mantener imágenes en una carpeta `assets` dentro de cada sección

### Ejemplos
- Incluir ejemplos prácticos cuando sea posible
- Asegurar que los ejemplos sean funcionales y actualizados
- Proporcionar contexto suficiente para entender los ejemplos

## Plantillas

Usar las plantillas estandarizadas para tipos comunes de documentación:
- [Plantilla para Content Types](./plantillas/content-type.md)
- [Plantilla para Procesos](./plantillas/proceso.md)

## Mantenimiento

### Versionado
- Indicar la fecha de última actualización al final de cada documento
- Mantener un registro de cambios significativos

### Revisión
- Revisar la documentación al menos trimestralmente
- Actualizar ejemplos y capturas de pantalla cuando cambie la interfaz
- Verificar que los enlaces internos y externos sigan funcionando

---

*Última actualización: [Fecha]*
