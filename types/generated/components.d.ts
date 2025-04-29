import type { Schema, Struct } from '@strapi/strapi';

export interface AssetInfo extends Struct.ComponentSchema {
  collectionName: 'components_asset_info';
  info: {
    description: 'Informaci\u00F3n unificada para activos f\u00EDsicos y digitales';
    displayName: 'Unified Asset Info';
    icon: 'cubes';
  };
  attributes: {
    attachments: Schema.Attribute.Media<undefined, true>;
    image: Schema.Attribute.Media<'images'>;
    inventoryNumber: Schema.Attribute.String;
    inventoryStatus: Schema.Attribute.Enumeration<
      ['ok', 'needs_review', 'expired', 'damaged']
    > &
      Schema.Attribute.DefaultTo<'ok'>;
    lastMaintenanceDate: Schema.Attribute.Date;
    lastRestocked: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    maintenanceHistory: Schema.Attribute.JSON;
    maintenanceInterval: Schema.Attribute.Integer;
    maintenanceNotes: Schema.Attribute.Text;
    manufacturer: Schema.Attribute.String;
    minQuantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    model: Schema.Attribute.String;
    nextMaintenanceDate: Schema.Attribute.Date;
    qrCode: Schema.Attribute.String;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    safetyInstructions: Schema.Attribute.Text;
    statusTracking: Schema.Attribute.Component<'asset.tracking', false>;
    supplier: Schema.Attribute.String;
    technicalSpecs: Schema.Attribute.JSON;
    usageInstructions: Schema.Attribute.Text;
    useCount: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
  };
}

export interface AssetTracking extends Struct.ComponentSchema {
  collectionName: 'components_asset_tracking';
  info: {
    description: 'Seguimiento de estados con historial';
    displayName: 'Status Tracking';
    icon: 'chart-line';
  };
  attributes: {
    current: Schema.Attribute.Enumeration<
      ['available', 'in_use', 'reserved', 'maintenance', 'out_of_order']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'available'>;
    history: Schema.Attribute.JSON;
    reason: Schema.Attribute.String;
  };
}

export interface AuditTracking extends Struct.ComponentSchema {
  collectionName: 'components_audit_tracking';
  info: {
    description: 'Sistema unificado de auditor\u00EDa y seguimiento de cambios';
    displayName: 'Audit Tracking';
    icon: 'user-edit';
  };
  attributes: {
    createdByUser: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    lastAction: Schema.Attribute.Enumeration<
      [
        'create',
        'update',
        'delete',
        'publish',
        'unpublish',
        'approve',
        'reject',
        'other',
      ]
    >;
    lastActionTimestamp: Schema.Attribute.DateTime;
    logs: Schema.Attribute.JSON;
    updatedByUser: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface CollaborationDeliverable extends Struct.ComponentSchema {
  collectionName: 'components_collaboration_deliverable';
  info: {
    description: 'Entregables espec\u00EDficos dentro de un acuerdo de colaboraci\u00F3n';
    displayName: 'Deliverable';
    icon: 'box';
  };
  attributes: {
    acceptanceCriteria: Schema.Attribute.Text;
    attachments: Schema.Attribute.Media<'files', true>;
    completedAt: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    dueDate: Schema.Attribute.Date;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'critical']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    status: Schema.Attribute.Enumeration<
      ['pending', 'in_progress', 'review', 'completed', 'delayed']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CollaborationGoal extends Struct.ComponentSchema {
  collectionName: 'components_collaboration_goal';
  info: {
    description: 'Objetivos espec\u00EDficos dentro de una mentor\u00EDa';
    displayName: 'Goal';
    icon: 'bullseye';
  };
  attributes: {
    achievedAt: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    measurableOutcome: Schema.Attribute.Text;
    priority: Schema.Attribute.Enumeration<['low', 'medium', 'high']> &
      Schema.Attribute.DefaultTo<'medium'>;
    status: Schema.Attribute.Enumeration<
      ['not_started', 'in_progress', 'achieved', 'revised']
    > &
      Schema.Attribute.DefaultTo<'not_started'>;
    targetDate: Schema.Attribute.Date;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CollaborationMilestone extends Struct.ComponentSchema {
  collectionName: 'components_collaboration_milestone';
  info: {
    description: 'Hitos importantes dentro de un acuerdo de colaboraci\u00F3n';
    displayName: 'Milestone';
    icon: 'flag';
  };
  attributes: {
    completedAt: Schema.Attribute.Date;
    description: Schema.Attribute.Text;
    dueDate: Schema.Attribute.Date;
    notes: Schema.Attribute.Text;
    status: Schema.Attribute.Enumeration<
      ['pending', 'in_progress', 'achieved', 'delayed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CollaborationParticipantfeedback
  extends Struct.ComponentSchema {
  collectionName: 'components_collaboration_participantfeedback';
  info: {
    description: 'Feedback de participantes en intercambios de habilidades';
    displayName: 'Participant Feedback';
    icon: 'comment';
  };
  attributes: {
    comment: Schema.Attribute.Text;
    knowledgeGained: Schema.Attribute.Enumeration<
      ['none', 'little', 'moderate', 'significant', 'extensive']
    > &
      Schema.Attribute.DefaultTo<'moderate'>;
    member: Schema.Attribute.Relation<'oneToOne', 'api::member.member'>;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    submittedAt: Schema.Attribute.DateTime;
  };
}

export interface CollaborationSessionfeedback extends Struct.ComponentSchema {
  collectionName: 'components_collaboration_sessionfeedback';
  info: {
    description: 'Feedback sobre sesiones de mentor\u00EDa';
    displayName: 'Session Feedback';
    icon: 'comment-dots';
  };
  attributes: {
    areasForImprovement: Schema.Attribute.Text;
    menteeFeedback: Schema.Attribute.Text;
    menteeRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    mentorFeedback: Schema.Attribute.Text;
    mentorRating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    progressAssessment: Schema.Attribute.Enumeration<
      [
        'no_progress',
        'slight_progress',
        'moderate_progress',
        'significant_progress',
        'goal_achieved',
      ]
    > &
      Schema.Attribute.DefaultTo<'moderate_progress'>;
    submittedAt: Schema.Attribute.DateTime;
  };
}

export interface CommonAddress extends Struct.ComponentSchema {
  collectionName: 'components_common_addresses';
  info: {
    description: 'Direcci\u00F3n completa con validaci\u00F3n mejorada';
    displayName: 'Address';
    icon: 'map-pin';
  };
  attributes: {
    addressType: Schema.Attribute.Enumeration<
      ['home', 'work', 'billing', 'shipping', 'other']
    > &
      Schema.Attribute.DefaultTo<'home'>;
    city: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    coordinates: Schema.Attribute.JSON;
    country: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
      }>;
    street: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 3;
      }>;
  };
}

export interface CommonMetadata extends Struct.ComponentSchema {
  collectionName: 'components_common_metadata';
  info: {
    description: 'Sistema unificado de metadatos';
    displayName: 'Unified Metadata';
    icon: 'info';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['system', 'analytics', 'integration', 'custom']
    > &
      Schema.Attribute.DefaultTo<'custom'>;
    dataType: Schema.Attribute.Enumeration<
      ['text', 'number', 'date', 'boolean', 'json']
    > &
      Schema.Attribute.DefaultTo<'text'>;
    description: Schema.Attribute.String;
    key: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 1;
      }>;
    source: Schema.Attribute.String;
    timestamp: Schema.Attribute.DateTime;
    value: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface LocationGeo extends Struct.ComponentSchema {
  collectionName: 'components_location_geo';
  info: {
    description: 'Informaci\u00F3n unificada de ubicaci\u00F3n';
    displayName: 'Unified Location';
    icon: 'map-marker-alt';
  };
  attributes: {
    address: Schema.Attribute.String;
    city: Schema.Attribute.String;
    container: Schema.Attribute.String;
    country: Schema.Attribute.String;
    latitude: Schema.Attribute.Decimal;
    longitude: Schema.Attribute.Decimal;
    notes: Schema.Attribute.Text;
    position: Schema.Attribute.String;
    province: Schema.Attribute.String;
    zone: Schema.Attribute.String;
  };
}

export interface MemberContactinfo extends Struct.ComponentSchema {
  collectionName: 'components_member_contact_info';
  info: {
    description: 'Informaci\u00F3n de contacto del miembro';
    displayName: 'Contact Info';
    icon: 'address-book';
  };
  attributes: {
    address: Schema.Attribute.Text;
    alternativeEmail: Schema.Attribute.Email;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    mobilePhone: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    preferredContactMethod: Schema.Attribute.Enumeration<
      ['email', 'phone', 'sms', 'whatsapp', 'telegram', 'other']
    > &
      Schema.Attribute.DefaultTo<'email'>;
    state: Schema.Attribute.String;
  };
}

export interface MemberEmergencycontact extends Struct.ComponentSchema {
  collectionName: 'components_member_emergency_contact';
  info: {
    description: 'Contacto de emergencia del miembro';
    displayName: 'Emergency Contact';
    icon: 'ambulance';
  };
  attributes: {
    address: Schema.Attribute.Text;
    alternativePhone: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    medicalInfo: Schema.Attribute.Text;
    name: Schema.Attribute.String;
    notes: Schema.Attribute.Text;
    phone: Schema.Attribute.String;
    relationship: Schema.Attribute.String;
  };
}

export interface MemberPreferences extends Struct.ComponentSchema {
  collectionName: 'components_member_preferences';
  info: {
    description: 'Preferencias del miembro';
    displayName: 'Preferences';
    icon: 'sliders-h';
  };
  attributes: {
    availabilityCalendar: Schema.Attribute.String;
    language: Schema.Attribute.Enumeration<
      ['es', 'en', 'fr', 'pt', 'de', 'other']
    > &
      Schema.Attribute.DefaultTo<'es'>;
    notifications: Schema.Attribute.JSON;
    privacy: Schema.Attribute.JSON;
    theme: Schema.Attribute.Enumeration<['light', 'dark', 'system']> &
      Schema.Attribute.DefaultTo<'system'>;
    timezone: Schema.Attribute.String;
    workingHours: Schema.Attribute.JSON;
  };
}

export interface MemberProfileinfo extends Struct.ComponentSchema {
  collectionName: 'components_member_profile_info';
  info: {
    description: 'Informaci\u00F3n de perfil del miembro';
    displayName: 'Profile Info';
    icon: 'user-circle';
  };
  attributes: {
    birthDate: Schema.Attribute.Date;
    company: Schema.Attribute.String;
    education: Schema.Attribute.String;
    gender: Schema.Attribute.Enumeration<
      ['male', 'female', 'non_binary', 'other', 'prefer_not_to_say']
    >;
    identificationNumber: Schema.Attribute.String;
    identificationType: Schema.Attribute.Enumeration<
      ['national_id', 'passport', 'drivers_license', 'other']
    >;
    languages: Schema.Attribute.JSON;
    occupation: Schema.Attribute.String;
    portfolio: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface MembershipAccessrules extends Struct.ComponentSchema {
  collectionName: 'components_membership_access_rules';
  info: {
    description: 'Reglas de acceso para una membres\u00EDa';
    displayName: 'Access Rules';
    icon: 'key';
  };
  attributes: {
    accessType: Schema.Attribute.Enumeration<
      [
        'unlimited',
        'limited_time',
        'limited_quantity',
        'scheduled',
        'supervised',
        'no_access',
      ]
    > &
      Schema.Attribute.DefaultTo<'unlimited'>;
    allowedTimeRanges: Schema.Attribute.JSON;
    conditions: Schema.Attribute.Text;
    discountPercentage: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    priority: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    quantityLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    resourceType: Schema.Attribute.Enumeration<
      [
        'space',
        'area',
        'equipment',
        'tool',
        'consumable',
        'resource',
        'event',
        'other',
      ]
    > &
      Schema.Attribute.Required;
    timeLimit: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    timeUnit: Schema.Attribute.Enumeration<
      ['hour', 'day', 'week', 'month', 'year']
    > &
      Schema.Attribute.DefaultTo<'month'>;
  };
}

export interface MembershipBenefits extends Struct.ComponentSchema {
  collectionName: 'components_membership_benefits';
  info: {
    description: 'Beneficios incluidos en una membres\u00EDa';
    displayName: 'Benefits';
    icon: 'gift';
  };
  attributes: {
    category: Schema.Attribute.Enumeration<
      ['access', 'discount', 'service', 'resource', 'event', 'other']
    > &
      Schema.Attribute.DefaultTo<'access'>;
    conditions: Schema.Attribute.Text;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    isHighlighted: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface MetadataAnalytics extends Struct.ComponentSchema {
  collectionName: 'components_metadata_analytics';
  info: {
    description: 'Metadatos para an\u00E1lisis y estad\u00EDsticas';
    displayName: 'Analytics Metadata';
    icon: 'bar-chart';
  };
  attributes: {
    dataType: Schema.Attribute.Enumeration<
      ['numeric', 'percentage', 'currency', 'date', 'text']
    > &
      Schema.Attribute.DefaultTo<'numeric'>;
    key: Schema.Attribute.String;
    period: Schema.Attribute.String;
    value: Schema.Attribute.Text;
  };
}

export interface MetadataSystem extends Struct.ComponentSchema {
  collectionName: 'components_metadata_system';
  info: {
    description: 'Metadatos del sistema, como versiones, IDs de integraci\u00F3n, etc.';
    displayName: 'System Metadata';
    icon: 'server';
  };
  attributes: {
    key: Schema.Attribute.String;
    source: Schema.Attribute.String;
    timestamp: Schema.Attribute.DateTime;
    value: Schema.Attribute.Text;
  };
}

export interface PaymentApicredentials extends Struct.ComponentSchema {
  collectionName: 'components_payment_apicredentials';
  info: {
    description: 'Credenciales de API para pasarelas de pago';
    displayName: 'API Credentials';
    icon: 'key';
  };
  attributes: {
    additionalCredentials: Schema.Attribute.JSON & Schema.Attribute.Private;
    apiKey: Schema.Attribute.String & Schema.Attribute.Private;
    apiSecret: Schema.Attribute.String & Schema.Attribute.Private;
    apiVersion: Schema.Attribute.String;
    environment: Schema.Attribute.Enumeration<['sandbox', 'production']> &
      Schema.Attribute.DefaultTo<'sandbox'>;
    isValid: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    lastVerified: Schema.Attribute.DateTime;
    merchantId: Schema.Attribute.String;
    publicKey: Schema.Attribute.String;
  };
}

export interface PaymentBilling extends Struct.ComponentSchema {
  collectionName: 'components_payment_billing';
  info: {
    description: 'Informaci\u00F3n de facturaci\u00F3n';
    displayName: 'Billing Info';
    icon: 'file-invoice';
  };
  attributes: {
    additionalInfo: Schema.Attribute.Text;
    address: Schema.Attribute.Text;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    fullName: Schema.Attribute.String;
    isCompany: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    phone: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String;
    taxId: Schema.Attribute.String;
    taxIdType: Schema.Attribute.Enumeration<['nif', 'cif', 'vat', 'other']>;
  };
}

export interface PaymentSchedule extends Struct.ComponentSchema {
  collectionName: 'components_payment_schedule';
  info: {
    description: 'Programaci\u00F3n de pagos recurrentes';
    displayName: 'Payment Schedule';
    icon: 'calendar-alt';
  };
  attributes: {
    dayOfMonth: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 31;
          min: 1;
        },
        number
      >;
    dayOfWeek: Schema.Attribute.Enumeration<
      [
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
      ]
    >;
    endDate: Schema.Attribute.Date;
    frequency: Schema.Attribute.Enumeration<
      ['weekly', 'monthly', 'quarterly', 'biannual', 'annual']
    > &
      Schema.Attribute.DefaultTo<'monthly'>;
    gracePeriodDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    nextExecutionDate: Schema.Attribute.Date;
    reminderDaysBefore: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
  };
}

export interface PaymentSeller extends Struct.ComponentSchema {
  collectionName: 'components_payment_seller';
  info: {
    description: 'Informaci\u00F3n del vendedor para facturas';
    displayName: 'Seller Info';
    icon: 'store';
  };
  attributes: {
    address: Schema.Attribute.Text;
    bankInfo: Schema.Attribute.Text;
    city: Schema.Attribute.String;
    country: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    legalInfo: Schema.Attribute.Text;
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    phone: Schema.Attribute.String;
    postalCode: Schema.Attribute.String;
    state: Schema.Attribute.String;
    taxId: Schema.Attribute.String;
    website: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

export interface SpaceFeatures extends Struct.ComponentSchema {
  collectionName: 'components_space_features';
  info: {
    description: 'Caracter\u00EDsticas disponibles en un espacio';
    displayName: 'Features';
    icon: 'list-ul';
  };
  attributes: {
    hasAC: Schema.Attribute.Boolean;
    hasProjector: Schema.Attribute.Boolean;
    hasWhiteboard: Schema.Attribute.Boolean;
    network: Schema.Attribute.Enumeration<
      ['none', 'ethernet', 'wifi', 'ethernet_wifi']
    > &
      Schema.Attribute.DefaultTo<'ethernet_wifi'>;
    powerSockets: Schema.Attribute.Enumeration<['none', 'few', 'many']> &
      Schema.Attribute.DefaultTo<'many'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'asset.info': AssetInfo;
      'asset.tracking': AssetTracking;
      'audit.tracking': AuditTracking;
      'collaboration.deliverable': CollaborationDeliverable;
      'collaboration.goal': CollaborationGoal;
      'collaboration.milestone': CollaborationMilestone;
      'collaboration.participantfeedback': CollaborationParticipantfeedback;
      'collaboration.sessionfeedback': CollaborationSessionfeedback;
      'common.address': CommonAddress;
      'common.metadata': CommonMetadata;
      'location.geo': LocationGeo;
      'member.contactinfo': MemberContactinfo;
      'member.emergencycontact': MemberEmergencycontact;
      'member.preferences': MemberPreferences;
      'member.profileinfo': MemberProfileinfo;
      'membership.accessrules': MembershipAccessrules;
      'membership.benefits': MembershipBenefits;
      'metadata.analytics': MetadataAnalytics;
      'metadata.system': MetadataSystem;
      'payment.apicredentials': PaymentApicredentials;
      'payment.billing': PaymentBilling;
      'payment.schedule': PaymentSchedule;
      'payment.seller': PaymentSeller;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
      'space.features': SpaceFeatures;
    }
  }
}
