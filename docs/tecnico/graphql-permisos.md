## Permisos y Control de Acceso en GraphQL

En Strapi v5.12.6, los permisos configurados en el panel de administración se aplican automáticamente a las consultas GraphQL. Esto significa que:

1. Los usuarios solo pueden acceder a los campos y relaciones para los que tienen permisos.
2. Las mutaciones están restringidas según los permisos de creación, actualización y eliminación.
3. Los filtros solo funcionan en campos para los que el usuario tiene permisos de lectura.


### Ejemplo de Consulta con Autenticación

Para consultas que requieren autenticación, se debe incluir el token JWT en el encabezado:

```plaintext
Authorization: Bearer <token_jwt>
```

### Roles y Permisos en GraphQL

El sistema implementa los siguientes roles con permisos específicos en GraphQL:

| Rol | Permisos GraphQL
|-----|-----
| Público | Consultas limitadas a información pública (espacios, eventos públicos)
| Miembro | Consultas sobre su propio perfil, habilidades, reservas y proyectos
| Administrador de Área | Consultas y mutaciones relacionadas con su área asignada
| Administrador | Acceso completo a todas las consultas y mutaciones


### Ejemplo de Consulta con Permisos Específicos

Para un usuario con rol "Miembro", la siguiente consulta solo devolverá sus propias reservas:

```plaintext
query MyReservations {
  reservations(
    filters: { member: { id: { eq: "me" } } }
  ) {
    data {
      id
      attributes {
        startDateTime
        endDateTime
        status
        equipment {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
  }
}
```

## Optimización de Rendimiento

### Consultas N+1

Para evitar el problema de consultas N+1 (múltiples consultas a la base de datos para resolver relaciones), Strapi v5.12.6 con GraphQL implementa optimizaciones automáticas. Sin embargo, es importante:

1. Limitar la profundidad de las consultas anidadas (configurado en `depthLimit`)
2. Utilizar paginación para conjuntos de datos grandes
3. Solicitar solo los campos necesarios


### Ejemplo de Consulta Optimizada

```plaintext
query OptimizedProjectQuery {
  projects(
    pagination: { page: 1, pageSize: 10 }
    filters: { status: { eq: "active" } }
  ) {
    data {
      id
      attributes {
        title
        description
        # Solo incluir las relaciones necesarias
        owner {
          data {
            attributes {
              displayName
              # No incluir campos innecesarios del propietario
            }
          }
        }
        # Usar paginación en relaciones con muchos elementos
        needs(pagination: { page: 1, pageSize: 5 }) {
          data {
            attributes {
              title
              priority
            }
          }
        }
      }
    }
  }
}
```

### Estrategias de Caché

Para mejorar el rendimiento, se recomienda implementar estrategias de caché:

1. **Caché del lado del cliente**: Utilizar Apollo Client o similar para cachear resultados
2. **Caché del lado del servidor**: Configurar Redis o similar para cachear consultas frecuentes
3. **Políticas de invalidación de caché**: Establecer TTL (Time-To-Live) apropiados según la frecuencia de actualización de los datos


## Errores Comunes y Soluciones

### Error: "Cannot query field X on type Y"

**Solución**: Verificar que el campo exista en el tipo de contenido y que el usuario tenga permisos para acceder a él.

### Error: "You are not authorized to perform this action"

**Solución**: Verificar que el usuario tenga los permisos necesarios para la operación y que el token JWT sea válido.

### Error: "Variable $X of required type Y was not provided"

**Solución**: Asegurarse de proporcionar todas las variables requeridas en la consulta.

### Error: "Field X of type Y must have a selection of subfields"

**Solución**: Para tipos complejos, se debe especificar qué campos se desean obtener.

```plaintext
# Incorrecto
query {
  members {
    data
  }
}

# Correcto
query {
  members {
    data {
      id
      attributes {
        firstName
        lastName
      }
    }
  }
}
```

