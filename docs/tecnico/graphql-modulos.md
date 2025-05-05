## Módulo de Comunidad y Miembros

Este módulo gestiona los miembros, sus habilidades, membresías y relaciones.

```mermaid
graph TD;
    A["Member"]-->B["Payment"]
    C["PaymentMethod"]-->B
    D["PaymentGateway"]-->C
    B-->E["PaymentItem"]
    F["Invoice"]-->A
    F-->G["InvoiceItem"]
    H["Discount"]-->B
    I["PaymentPlan"]-->B
    J["Transaction"]-->B
    J-->F
```

## Módulo de Espacios y Recursos

Este módulo gestiona los espacios físicos, áreas, equipamiento y reservas.

```mermaid
graph TD;
    A["Space"]-->B["Area"]
    B-->C["Equipment"]
    D["Member"]-->E["Reservation"]
    E-->B
    E-->C
    C-->F["EquipmentSkill"]
    G["Skill"]-->F
    H["SkillLevel"]-->F
    B-->I["AreaSkill"]
    G-->I
    H-->I
    J["Tool"]-->C
    K["Consumable"]-->L["Consumption"]
    D-->L
```

## Módulo de Proyectos y Colaboración

Este módulo gestiona los proyectos, necesidades de colaboración y coincidencias entre miembros.

```mermaid
graph TD;
    A["Project"]-->B["ProjectNeed"]
    C["Member"]-->A
    D["Skill"]-->B
    E["CollaborationOffer"]-->B
    C-->E
    F["CollaborationMatch"]-->B
    F-->E
    G["CollaborationAgreement"]-->F
    H["Mentorship"]-->C
    I["MentorshipSession"]-->H
    J["SkillExchange"]-->C
    K["ExchangeSession"]-->J
```

## Módulo de Sistema Financiero

Este módulo gestiona pagos, facturas, descuentos y transacciones financieras.

```mermaid
graph TD;
    A["Member"]-->B["Payment"]
    C["PaymentMethod"]-->B
    D["PaymentGateway"]-->C
    B-->E["PaymentItem"]
    F["Invoice"]-->A
    F-->G["InvoiceItem"]
    H["Discount"]-->B
    I["PaymentPlan"]-->B
    J["Transaction"]-->B
    J-->F
```

## Módulo de Operaciones

Este módulo gestiona eventos, asistencia, registros de acceso y formación.

```mermaid
graph TD;
    A["Event"]-->B["Attendance"]
    C["Member"]-->B
    D["Space"]-->A
    E["AccessLog"]-->C
    E-->D
    E-->F["Area"]
    G["Training"]-->C
    G-->H["TrainingSkill"]
    I["Skill"]-->H
```

