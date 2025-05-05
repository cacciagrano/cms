## Representación en GraphQL

Las relaciones del sistema se representan en GraphQL a través de consultas anidadas. A continuación, se muestra cómo se traducen algunas de las relaciones clave a consultas GraphQL:

### Ejemplo: Miembro con Habilidades y Membresía

```plaintext
query GetMemberWithRelations($id: ID!) {
  member(id: $id) {
    data {
      id
      attributes {
        firstName
        lastName
        displayName
        # Relación Member -> MemberSkill -> Skill
        skills {
          data {
            id
            attributes {
              skill {
                data {
                  attributes {
                    name
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
            }
          }
        }
        # Relación Member -> MembershipSubscription -> Membership
        membershipSubscriptions {
          data {
            attributes {
              startDate
              endDate
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

### Ejemplo: Espacio con Áreas y Equipamiento

```plaintext
query GetSpaceWithEquipment($id: ID!) {
  space(id: $id) {
    data {
      attributes {
        name
        description
        # Relación Space -> Area
        areas {
          data {
            attributes {
              name
              # Relación Area -> Equipment
              equipment {
                data {
                  attributes {
                    name
                    status
                    # Relación Equipment -> EquipmentSkill -> Skill
                    requiredSkills {
                      data {
                        attributes {
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
          }
        }
      }
    }
  }
}
```

### Ejemplo: Proyecto con Necesidades y Ofertas


