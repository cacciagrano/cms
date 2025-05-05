# Consultas GraphQL

Este documento describe cómo realizar consultas GraphQL en el sistema de gestión para espacios colaborativos basado en Strapi v5.12.6.

## Índice

1. [Sintaxis básica](#sintaxis-básica)
2. [Consultas simples](#consultas-simples)
3. [Consultas con filtros](#consultas-con-filtros)
4. [Consultas con paginación](#consultas-con-paginación)
5. [Consultas con ordenamiento](#consultas-con-ordenamiento)
6. [Consultas con relaciones](#consultas-con-relaciones)
7. [Mutaciones](#mutaciones)
8. [Fragmentos](#fragmentos)
9. [Variables](#variables)
10. [Directivas](#directivas)

## Sintaxis básica

Una consulta GraphQL tiene la siguiente estructura básica:

```graphql
query {
  collectionType {
    data {
      id
      attributes {
        field1
        field2
        relation {
          data {
            id
            attributes {
              field1
              field2
            }
          }
        }
      }
    }
  }
}