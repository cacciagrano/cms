## Consultas por Módulo

### Módulo de Comunidad y Miembros

#### Consultar Miembro con Habilidades

```plaintext
query GetMemberWithSkills($id: ID!) {
  member(id: $id) {
    data {
      id
      attributes {
        firstName
        lastName
        displayName
        email
        membershipNumber
        status
        skills {
          data {
            id
            attributes {
              skill {
                data {
                  attributes {
                    name
                    description
                    category {
                      data {
                        attributes {
                          name
                        }
                      }
                    }
                  }
                }
              }
              level {
                data {
                  attributes {
                    name
                    value
                  }
                }
              }
              isVerified
              yearsOfExperience
            }
          }
        }
        membershipSubscriptions {
          data {
            id
            attributes {
              startDate
              endDate
              status
              membership {
                data {
                  attributes {
                    name
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Consultar Habilidades por Categoría

```plaintext
query GetSkillsByCategory($categoryId: ID!) {
  skillCategory(id: $categoryId) {
    data {
      attributes {
        name
        description
        skills {
          data {
            id
            attributes {
              name
              description
              isActive
              levels {
                data {
                  id
                  attributes {
                    name
                    value
                    description
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Módulo de Espacios y Recursos

#### Consultar Espacios con Áreas

```plaintext
query GetSpacesWithAreas {
  spaces {
    data {
      id
      attributes {
        name
        description
        status
        areas {
          data {
            id
            attributes {
              name
              description
              status
              supervisors {
                data {
                  id
                  attributes {
                    firstName
                    lastName
                    displayName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Consultar Equipamiento con Habilidades Requeridas

```plaintext
query GetEquipmentWithRequiredSkills {
  equipment(
    filters: { isActive: { eq: true } }
    sort: "name:asc"
  ) {
    data {
      id
      attributes {
        name
        description
        status
        area {
          data {
            attributes {
              name
            }
          }
        }
        requiredSkills {
          data {
            id
            attributes {
              skill {
                data {
                  attributes {
                    name
                  }
                }
              }
              requiredLevel {
                data {
                  attributes {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

#### Consultar Reservas Activas

```plaintext
query GetActiveReservations {
  reservations(
    filters: { 
      status: { in: ["pending", "confirmed"] },
      startDateTime: { gt: $currentDate }
    }
    sort: "startDateTime:asc"
  ) {
    data {
      id
      attributes {
        startDateTime
        endDateTime
        status
        purpose
        member {
          data {
            attributes {
              displayName
              email
            }
          }
        }
        space {
          data {
            attributes {
              name
            }
          }
        }
        area {
          data {
            attributes {
              name
            }
          }
        }
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

### Módulo de Proyectos y Colaboración

#### Consultar Proyectos Activos

```plaintext
query GetActiveProjects {
  projects(
    filters: { status: { eq: "active" } }
    sort: "updatedAt:desc"
  ) {
    data {
      id
      attributes {
        title
        description
        status
        startDate
        endDate
        visibility
        owner {
          data {
            attributes {
              displayName
            }
          }
        }
        needs {
          data {
            id
            attributes {
              title
              status
              priority
              skill {
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
    }
  }
}
```

#### Consultar Coincidencias de Colaboración

```plaintext
query GetCollaborationMatches {
  collaborationMatches(
    filters: { status: { eq: "proposed" } }
    sort: "compatibilityScore:desc"
  ) {
    data {
      id
      attributes {
        compatibilityScore
        status
        projectNeed {
          data {
            attributes {
              title
              project {
                data {
                  attributes {
                    title
                  }
                }
              }
            }
          }
        }
        collaborationOffer {
          data {
            attributes {
              member {
                data {
                  attributes {
                    displayName
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

### Módulo de Operaciones

#### Consultar Eventos Próximos

```plaintext
query GetUpcomingEvents {
  events(
    filters: { 
      startDateTime: { gt: $currentDate },
      status: { eq: "scheduled" }
    }
    sort: "startDateTime:asc"
  ) {
    data {
      id
      attributes {
        title
        description
        startDateTime
        endDateTime
        maxAttendees
        currentAttendees
        location
        organizer {
          data {
            attributes {
              displayName
            }
          }
        }
        space {
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

#### Consultar Registros de Acceso

```plaintext
query GetAccessLogs {
  accessLogs(
    filters: { timestamp: { gt: $startDate, lt: $endDate } }
    sort: "timestamp:desc"
    pagination: { page: 1, pageSize: 50 }
  ) {
    data {
      id
      attributes {
        timestamp
        accessType
        status
        member {
          data {
            attributes {
              displayName
              membershipNumber
            }
          }
        }
        space {
          data {
            attributes {
              name
            }
          }
        }
        area {
          data {
            attributes {
              name
            }
          }
        }
      }
    }
    meta {
      pagination {
        total
        page
        pageSize
      }
    }
  }
}
```

### Módulo de Sistema Financiero

#### Consultar Pagos Recientes

```plaintext
query GetRecentPayments {
  payments(
    filters: { status: { in: ["completed", "processing"] } }
    sort: "createdAt:desc"
    pagination: { page: 1, pageSize: 20 }
  ) {
    data {
      id
      attributes {
        paymentCode
        amount
        currency
        status
        paymentDate
        paymentType
        member {
          data {
            attributes {
              displayName
              email
            }
          }
        }
        paymentMethod {
          data {
            attributes {
              name
            }
          }
        }
        items {
          data {
            attributes {
              name
              quantity
              unitPrice
              totalPrice
              itemType
            }
          }
        }
      }
    }
  }
}
```

#### Consultar Facturas por Miembro

```plaintext
query GetMemberInvoices($memberId: ID!) {
  invoices(
    filters: { member: { id: { eq: $memberId } } }
    sort: "issueDate:desc"
  ) {
    data {
      id
      attributes {
        invoiceNumber
        issueDate
        dueDate
        status
        totalAmount
        taxAmount
        currency
        items {
          data {
            attributes {
              name
              description
              quantity
              unitPrice
              totalPrice
              taxRate
              taxAmount
            }
          }
        }
      }
    }
  }
}
```

## Mutaciones Comunes

### Módulo de Comunidad y Miembros

#### Crear un Nuevo Miembro

```plaintext
mutation CreateMember($data: MemberInput!) {
  createMember(data: $data) {
    data {
      id
      attributes {
        firstName
        lastName
        displayName
        email
        membershipNumber
        status
      }
    }
  }
}

# Variables:
{
  "data": {
    "firstName": "Juan",
    "lastName": "Pérez",
    "displayName": "Juan P.",
    "email": "juan.perez@ejemplo.com",
    "status": "active",
    "joinDate": "2023-05-15"
  }
}
```

#### Actualizar Habilidad de Miembro

```plaintext
mutation UpdateMemberSkill($id: ID!, $data: MemberSkillInput!) {
  updateMemberSkill(id: $id, data: $data) {
    data {
      id
      attributes {
        isVerified
        yearsOfExperience
        level {
          data {
            attributes {
              name
              value
            }
          }
        }
      }
    }
  }
}

# Variables:
{
  "id": "1",
  "data": {
    "isVerified": true,
    "yearsOfExperience": 3,
    "level": "2"
  }
}
```

### Módulo de Espacios y Recursos

#### Crear una Reserva

```plaintext
mutation CreateReservation($data: ReservationInput!) {
  createReservation(data: $data) {
    data {
      id
      attributes {
        startDateTime
        endDateTime
        status
        purpose
      }
    }
  }
}

# Variables:
{
  "data": {
    "startDateTime": "2023-06-15T14:00:00Z",
    "endDateTime": "2023-06-15T16:00:00Z",
    "status": "pending",
    "purpose": "Proyecto de impresión 3D",
    "member": "5",
    "area": "3",
    "equipment": "12"
  }
}
```

#### Actualizar Estado de Equipamiento

```plaintext
mutation UpdateEquipmentStatus($id: ID!, $data: EquipmentInput!) {
  updateEquipment(id: $id, data: $data) {
    data {
      id
      attributes {
        status
        lastMaintenanceDate
      }
    }
  }
}

# Variables:
{
  "id": "8",
  "data": {
    "status": "maintenance",
    "lastMaintenanceDate": "2023-06-10T09:00:00Z"
  }
}
```

### Módulo de Proyectos y Colaboración

#### Crear un Nuevo Proyecto

```plaintext
mutation CreateProject($data: ProjectInput!) {
  createProject(data: $data) {
    data {
      id
      attributes {
        title
        description
        status
        startDate
      }
    }
  }
}

# Variables:
{
  "data": {
    "title": "Sistema de Monitoreo Ambiental",
    "description": "Desarrollo de un sistema IoT para monitoreo de variables ambientales",
    "status": "planning",
    "startDate": "2023-07-01",
    "visibility": "public",
    "owner": "3"
  }
}
```

#### Crear una Oferta de Colaboración

```plaintext
mutation CreateCollaborationOffer($data: CollaborationOfferInput!) {
  createCollaborationOffer(data: $data) {
    data {
      id
      attributes {
        message
        status
        availableHours
      }
    }
  }
}

# Variables:
{
  "data": {
    "message": "Me interesa colaborar en este proyecto por mi experiencia en IoT",
    "status": "pending",
    "availableHours": 10,
    "member": "7",
    "projectNeed": "4"
  }
}
```

### Módulo de Sistema Financiero

#### Crear un Nuevo Pago

```plaintext
mutation CreatePayment($data: PaymentInput!) {
  createPayment(data: $data) {
    data {
      id
      attributes {
        paymentCode
        amount
        currency
        status
      }
    }
  }
}

# Variables:
{
  "data": {
    "amount": 150.00,
    "currency": "USD",
    "status": "pending",
    "paymentType": "membership",
    "member": "9",
    "paymentMethod": "2",
    "items": [
      {
        "name": "Membresía Premium - Mensual",
        "quantity": 1,
        "unitPrice": 150.00,
        "totalPrice": 150.00,
        "itemType": "membership"
      }
    ]
  }
}
```

## Fragmentos Reutilizables

Los fragmentos permiten reutilizar selecciones de campos en múltiples consultas:

```plaintext
fragment MemberBasicInfo on Member {
  firstName
  lastName
  displayName
  email
  membershipNumber
  status
  joinDate
}

fragment SkillInfo on Skill {
  name
  description
  isActive
  category {
    data {
      attributes {
        name
      }
    }
  }
}

query GetMembersWithFragment {
  members {
    data {
      id
      attributes {
        ...MemberBasicInfo
        skills {
          data {
            attributes {
              skill {
                data {
                  attributes {
                    ...SkillInfo
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

## Consultas con Variables Dinámicas

Las variables permiten hacer consultas dinámicas:

```plaintext
query FilterMembersBySkill($skillId: ID!, $skillLevel: Int!) {
  members(
    filters: {
      skills: {
        skill: { id: { eq: $skillId } },
        level: { value: { gte: $skillLevel } }
      }
    }
  ) {
    data {
      id
      attributes {
        firstName
        lastName
        displayName
        skills {
          data {
            attributes {
              skill {
                data {
                  attributes {
                    name
                  }
                }
              }
              level {
                data {
                  attributes {
                    name
                    value
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

# Variables:
{
  "skillId": "12",
  "skillLevel": 3
}
```