### Documentación: Sistema de Inventario y Validación de Espacios Maker

## Introducción

Este documento explica el sistema que hemos desarrollado para gestionar y validar el inventario de los espacios maker. El sistema utiliza archivos de texto en formato Markdown (`.md`) como fuente de datos, que luego se convierten automáticamente a hojas de cálculo Excel para su validación y gestión.

## ¿Por qué usar este sistema?

- **Simplicidad**: Los archivos Markdown son archivos de texto plano que pueden editarse con cualquier editor de texto.
- **Control de versiones**: Al ser archivos de texto, se pueden gestionar fácilmente con sistemas de control de versiones como Git.
- **Automatización**: La conversión de Markdown a Excel es automática, lo que reduce errores y ahorra tiempo.
- **Validación estructurada**: Los archivos Excel generados facilitan la validación del inventario por parte de los responsables.


## Estructura de los archivos Markdown

Cada espacio maker se documenta en un archivo Markdown con la siguiente estructura:

```markdown
# SPACE: [Nombre del Espacio]

**Responsable general**: [Nombre del responsable]  
**Fecha última actualización**: [Fecha]  
**ID**: [ID del espacio, ej: SPACE-001]

## AREA 1: [Nombre del Área]

**Responsable de área**: [Nombre del responsable]  
**Descripción**: [Descripción breve del área]  
**ID**: [ID del área, ej: AREA-001]

### Equipment

| ID | Nombre | Estado | Cantidad | Verificado | Observaciones |
|----|--------|--------|----------|------------|--------------|
| EQ-001-001 | [Nombre del equipo] | Activo | 1 | □ | |
| EQ-001-002 | [Nombre del equipo] | Activo | 1 | □ | |

### Tools

| ID | Nombre | Estado | Cantidad | Verificado | Observaciones |
|----|--------|--------|----------|------------|--------------|
| TL-001-001 | [Nombre de la herramienta] | Activo | 2 | □ | |
| TL-001-002 | [Nombre de la herramienta] | Activo | 2 | □ | |

### Consumables

| ID | Nombre | Estado | Cantidad | Verificado | Observaciones |
|----|--------|--------|----------|------------|--------------|
| CN-001-001 | [Nombre del consumible] | Activo | 5 kg | □ | |
| CN-001-002 | [Nombre del consumible] | Activo | 3 kg | □ | |

### Resources

| ID | Nombre | Formato | Ubicación | Verificado | Observaciones |
|----|--------|---------|-----------|------------|--------------|
| RS-001-001 | [Nombre del recurso] | Digital/Impreso | Estantería/Intranet | □ | |
| RS-001-002 | [Nombre del recurso] | Digital | Intranet | □ | |

## AREA 2: [Nombre del Área]

... (se repite la misma estructura para cada área)
```

## Convenciones de nomenclatura

- **ID de espacio**: SPACE-XXX (donde XXX es un número de 3 dígitos)
- **ID de área**: AREA-XXX (donde XXX es un número de 3 dígitos)
- **ID de equipos**: EQ-XXX-YYY (donde XXX es el número de área y YYY es un número secuencial)
- **ID de herramientas**: TL-XXX-YYY
- **ID de consumibles**: CN-XXX-YYY
- **ID de recursos**: RS-XXX-YYY


## Cómo crear un nuevo archivo de inventario

1. Crea un nuevo archivo de texto con extensión `.md` (por ejemplo, `nombre-del-espacio.md`)
2. Sigue la estructura mostrada arriba, reemplazando los valores entre corchetes con la información real
3. Guarda el archivo en la carpeta designada para los inventarios (por ejemplo, `cms/docs/estructura/`)


## Cómo convertir de Markdown a Excel

Hemos desarrollado un script que convierte automáticamente los archivos Markdown a hojas de cálculo Excel. Para utilizarlo:

1. Abre una terminal o línea de comandos
2. Navega hasta la carpeta donde se encuentra el script convertidor:

```shellscript
cd /ruta/a/convertidor-markdown-excel
```


3. Ejecuta el script pasando la ruta al archivo Markdown:

```shellscript
node convertidor-corregido.js /ruta/al/archivo.md
```


4. El script generará un archivo Excel con el nombre `Inventario_[Nombre_del_Espacio].xlsx` en la misma carpeta donde se ejecutó el script


## Estructura del archivo Excel generado

El archivo Excel generado contiene:

1. **Hoja "Resumen"**: Muestra la información general del espacio y lista todas las áreas incluidas con sus responsables.
2. **Hojas por área**: Una hoja para cada área (por ejemplo, "AREA-001 (3D Printing)") que contiene:

1. Sección de EQUIPOS
2. Sección de HERRAMIENTAS
3. Sección de CONSUMIBLES
4. Sección de RECURSOS





Cada sección incluye columnas para verificación y observaciones, que pueden ser completadas durante el proceso de validación del inventario.

## Proceso de validación del inventario

1. **Generación del Excel**: Convertir el archivo Markdown a Excel usando el script
2. **Distribución**: Compartir el archivo Excel con los responsables de cada área
3. **Verificación física**: Los responsables verifican físicamente cada ítem y marcan la columna "Verificado"
4. **Observaciones**: Añadir comentarios o notas en la columna "Observaciones" si es necesario
5. **Consolidación**: Recopilar todos los archivos Excel completados
6. **Actualización**: Si es necesario, actualizar el archivo Markdown original con las observaciones y cambios


## Ejemplos de espacios maker

Actualmente, tenemos documentados los siguientes espacios maker:

1. **Main Fabrication Lab**: Espacio principal con áreas de impresión 3D, corte láser, CNC, carpintería, metalurgia, textiles, montaje y equipamiento de seguridad.
2. **Advanced Tech Lab**: Laboratorio de tecnologías avanzadas con áreas de robótica, electrónica, realidad virtual, inteligencia artificial, IoT y biotecnología.
3. **Creative Media Studio**: Estudio de medios creativos con áreas de fotografía, video, audio, diseño gráfico, animación y postproducción.
4. **Makers' Rapid Prototyping Zone**: Zona de prototipado rápido con áreas de modelado, impresión 3D avanzada, escaneo 3D, moldeado y casting, y prototipado electrónico.
5. **Specialty Technologies Lab**: Laboratorio de tecnologías especializadas con áreas de nanotecnología, energías renovables, materiales avanzados, aeroespacial, y tecnologías médicas.


## Preguntas frecuentes

### ¿Puedo editar el archivo Markdown con cualquier editor?

Sí, puedes usar cualquier editor de texto como Notepad, Visual Studio Code, Sublime Text, etc.

### ¿Qué pasa si cometo un error en la estructura del Markdown?

El script intentará procesar el archivo lo mejor posible, pero es importante mantener la estructura correcta para asegurar una conversión adecuada.

### ¿Puedo añadir más áreas o categorías?

Sí, puedes añadir tantas áreas como necesites siguiendo la misma estructura.

### ¿Cómo actualizo un inventario existente?

Edita el archivo Markdown original, añadiendo, modificando o eliminando ítems según sea necesario, y luego vuelve a ejecutar el script de conversión.

### ¿Puedo personalizar el formato del Excel generado?

Sí, el script puede ser modificado para cambiar el formato, colores, o estructura del Excel generado.

## Soporte técnico

Si encuentras problemas o tienes preguntas sobre el sistema, contacta al equipo de soporte técnico:

- **Email**: [correo de soporte]
- **Teléfono**: [número de teléfono]
- **Ubicación**: [ubicación física del soporte]


---

Este documento fue creado para facilitar el uso del sistema de inventario y validación de espacios maker. Última actualización: 28/04/2025.