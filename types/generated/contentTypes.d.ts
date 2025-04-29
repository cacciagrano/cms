import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutAbout extends Struct.SingleTypeSchema {
  collectionName: 'abouts';
  info: {
    collectionName: 'abouts';
    description: 'Write about yourself and the content you create';
    displayName: 'About';
    pluralName: 'abouts';
    singularName: 'about';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    blocks: Schema.Attribute.DynamicZone<
      ['shared.media', 'shared.quote', 'shared.rich-text', 'shared.slider']
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::about.about'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAccesslogAccesslog extends Struct.CollectionTypeSchema {
  collectionName: 'accesslog';
  info: {
    collectionName: 'accesslogs';
    description: 'Registro de accesos a \u00E1reas y recursos';
    displayName: 'Access Log';
    pluralName: 'accesslogs';
    singularName: 'accesslog';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    accessMethod: Schema.Attribute.Enumeration<
      ['rfid', 'qr_code', 'pin', 'manual', 'app', 'other']
    >;
    accessStatus: Schema.Attribute.Enumeration<
      ['granted', 'denied', 'expired', 'error']
    > &
      Schema.Attribute.DefaultTo<'granted'>;
    accessType: Schema.Attribute.Enumeration<
      ['area entry', 'area exit', 'equipment use', 'resource access', 'other']
    > &
      Schema.Attribute.Required;
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deniedReason: Schema.Attribute.String;
    deviceInfo: Schema.Attribute.JSON;
    equipment: Schema.Attribute.Relation<
      'manyToOne',
      'api::equipment.equipment'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::accesslog.accesslog'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.JSON;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    resource: Schema.Attribute.String;
    timestamp: Schema.Attribute.DateTime & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAreaArea extends Struct.CollectionTypeSchema {
  collectionName: 'area';
  info: {
    collectionName: 'areas';
    description: 'Zona especializada del laboratorio con flujo de trabajo integrado';
    displayName: 'Area';
    pluralName: 'areas';
    singularName: 'area';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    additionalSupervisors: Schema.Attribute.Relation<
      'manyToMany',
      'api::member.member'
    >;
    areaStatus: Schema.Attribute.Enumeration<
      ['available', 'occupied', 'maintenance', 'reserved', 'closed']
    > &
      Schema.Attribute.DefaultTo<'available'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    code: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 20;
      }>;
    color: Schema.Attribute.Enumeration<
      [
        'rojo',
        'blanco',
        'verde',
        'azul',
        'amarillo',
        'morado',
        'naranja',
        'gris',
        'negro',
        'celeste',
      ]
    >;
    consumables: Schema.Attribute.Relation<
      'oneToMany',
      'api::consumable.consumable'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    equipment: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    >;
    geoLocation: Schema.Attribute.Component<'location.geo', false>;
    image: Schema.Attribute.Media<'images'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isReservable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::area.area'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    openingHours: Schema.Attribute.JSON;
    previousStatus: Schema.Attribute.String;
    primarySupervisor: Schema.Attribute.Relation<
      'manyToOne',
      'api::member.member'
    >;
    publishedAt: Schema.Attribute.DateTime;
    requiredSkillLevel: Schema.Attribute.Enumeration<
      ['none', 'beginner', 'intermediate', 'advanced', 'expert']
    > &
      Schema.Attribute.DefaultTo<'none'>;
    resources: Schema.Attribute.Relation<'oneToMany', 'api::resource.resource'>;
    slug: Schema.Attribute.UID<'name'>;
    space: Schema.Attribute.Relation<'manyToOne', 'api::space.space'>;
    statusChangedAt: Schema.Attribute.DateTime;
    statusHistory: Schema.Attribute.JSON;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    tools: Schema.Attribute.Relation<'oneToMany', 'api::tool.tool'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAreaskillAreaskill extends Struct.CollectionTypeSchema {
  collectionName: 'areaskill';
  info: {
    collectionName: 'areaskills';
    description: 'Habilidades requeridas para acceder a \u00E1reas';
    displayName: 'Area Required Skill';
    pluralName: 'areaskills';
    singularName: 'areaskill';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    alternativeRequirements: Schema.Attribute.Text;
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    isStrict: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::areaskill.areaskill'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    requiredLevel: Schema.Attribute.Relation<
      'manyToOne',
      'api::skilllevel.skilllevel'
    >;
    skill: Schema.Attribute.Relation<'manyToOne', 'api::skill.skill'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAttendanceAttendance extends Struct.CollectionTypeSchema {
  collectionName: 'attendance';
  info: {
    collectionName: 'attendances';
    description: 'Registro de asistencia de miembros';
    displayName: 'Attendance';
    pluralName: 'attendances';
    singularName: 'attendance';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    checkInLocation: Schema.Attribute.JSON;
    checkInMethod: Schema.Attribute.Enumeration<
      ['qr_code', 'rfid', 'manual', 'app', 'other']
    >;
    checkInTime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    checkOutLocation: Schema.Attribute.JSON;
    checkOutMethod: Schema.Attribute.Enumeration<
      ['qr_code', 'rfid', 'manual', 'app', 'automatic', 'other']
    >;
    checkOutTime: Schema.Attribute.DateTime;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    duration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    event: Schema.Attribute.Relation<'manyToOne', 'api::event.event'>;
    isComplete: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::attendance.attendance'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    purpose: Schema.Attribute.String;
    space: Schema.Attribute.Relation<'manyToOne', 'api::space.space'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCollaborationagreementCollaborationagreement
  extends Struct.CollectionTypeSchema {
  collectionName: 'collaborationagreement';
  info: {
    collectionName: 'collaborationagreements';
    description: 'Acuerdos formales de colaboraci\u00F3n entre miembros y proyectos';
    displayName: 'Collaboration Agreement';
    pluralName: 'collaborationagreements';
    singularName: 'collaborationagreement';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    agreementStatus: Schema.Attribute.Enumeration<
      ['draft', 'active', 'completed', 'terminated', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    commitmentHours: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    compensation: Schema.Attribute.Enumeration<
      ['unpaid', 'paid', 'exchange', 'credit', 'other']
    > &
      Schema.Attribute.DefaultTo<'unpaid'>;
    compensationDetails: Schema.Attribute.Text;
    confidentiality: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    deliverable: Schema.Attribute.Component<'collaboration.deliverable', true>;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    intellectualProperty: Schema.Attribute.RichText;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationagreement.collaborationagreement'
    > &
      Schema.Attribute.Private;
    match: Schema.Attribute.Relation<
      'oneToOne',
      'api::collaborationmatch.collaborationmatch'
    >;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    milestone: Schema.Attribute.Component<'collaboration.milestone', true>;
    project: Schema.Attribute.Relation<'manyToOne', 'api::project.project'>;
    publishedAt: Schema.Attribute.DateTime;
    skill: Schema.Attribute.Relation<'manyToMany', 'api::skill.skill'>;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
    terminationClauses: Schema.Attribute.Text;
    termsAndConditions: Schema.Attribute.RichText;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCollaborationmatchCollaborationmatch
  extends Struct.CollectionTypeSchema {
  collectionName: 'collaborationmatch';
  info: {
    collectionName: 'collaborationmatches';
    description: 'Coincidencias entre ofertas y necesidades de proyectos';
    displayName: 'Collaboration Match';
    pluralName: 'collaborationmatches';
    singularName: 'collaborationmatch';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    agreement: Schema.Attribute.Relation<
      'oneToOne',
      'api::collaborationagreement.collaborationagreement'
    >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    collaborationoffer: Schema.Attribute.Relation<
      'manyToOne',
      'api::collaborationoffer.collaborationoffer'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationmatch.collaborationmatch'
    > &
      Schema.Attribute.Private;
    matchScore: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 100;
          min: 0;
        },
        number
      >;
    matchStatus: Schema.Attribute.Enumeration<
      ['proposed', 'accepted', 'rejected', 'expired']
    > &
      Schema.Attribute.DefaultTo<'proposed'>;
    matchType: Schema.Attribute.Enumeration<
      ['automatic', 'manual', 'recommended']
    > &
      Schema.Attribute.DefaultTo<'automatic'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    projectneed: Schema.Attribute.Relation<
      'manyToOne',
      'api::projectneed.projectneed'
    >;
    proposedAt: Schema.Attribute.DateTime & Schema.Attribute.Required;
    proposedBy: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    publishedAt: Schema.Attribute.DateTime;
    respondedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCollaborationofferCollaborationoffer
  extends Struct.CollectionTypeSchema {
  collectionName: 'collaborationoffer';
  info: {
    collectionName: 'collaborationoffers';
    description: 'Ofertas de colaboraci\u00F3n de miembros para proyectos';
    displayName: 'Collaboration Offer';
    pluralName: 'collaborationoffers';
    singularName: 'collaborationoffer';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    additionalInfo: Schema.Attribute.Text;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    availableHours: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    collaborationMatches: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationmatch.collaborationmatch'
    >;
    compensationDetails: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    endDate: Schema.Attribute.Date;
    expectedCompensation: Schema.Attribute.Enumeration<
      ['unpaid', 'paid', 'exchange', 'credit', 'other']
    > &
      Schema.Attribute.DefaultTo<'unpaid'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationoffer.collaborationoffer'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    offerStatus: Schema.Attribute.Enumeration<
      ['pending', 'accepted', 'rejected', 'withdrawn']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    portfolioUrl: Schema.Attribute.String;
    projectneed: Schema.Attribute.Relation<
      'manyToOne',
      'api::projectneed.projectneed'
    >;
    publishedAt: Schema.Attribute.DateTime;
    relevantskill: Schema.Attribute.Relation<
      'manyToMany',
      'api::memberskill.memberskill'
    >;
    startDate: Schema.Attribute.Date;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiCollaborationrequestCollaborationrequest
  extends Struct.CollectionTypeSchema {
  collectionName: 'collaborationrequest';
  info: {
    collectionName: 'collaborationrequests';
    description: 'Solicitudes directas a miembros para colaborar en proyectos';
    displayName: 'Collaboration Request';
    pluralName: 'collaborationrequests';
    singularName: 'collaborationrequest';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    compensation: Schema.Attribute.Enumeration<
      ['unpaid', 'paid', 'exchange', 'credit', 'other']
    > &
      Schema.Attribute.DefaultTo<'unpaid'>;
    compensationDetails: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    endDate: Schema.Attribute.Date;
    expirationDate: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationrequest.collaborationrequest'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    message: Schema.Attribute.Text & Schema.Attribute.Required;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    project: Schema.Attribute.Relation<'manyToOne', 'api::project.project'>;
    publishedAt: Schema.Attribute.DateTime;
    requestedBy: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    requestedskill: Schema.Attribute.Relation<'manyToMany', 'api::skill.skill'>;
    requestStatus: Schema.Attribute.Enumeration<
      ['pending', 'accepted', 'rejected', 'expired', 'withdrawn']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    requiredHours: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    startDate: Schema.Attribute.Date;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiConsumableConsumable extends Struct.CollectionTypeSchema {
  collectionName: 'consumable';
  info: {
    collectionName: 'consumables';
    description: 'Insumos y materiales que se consumen';
    displayName: 'Consumable';
    pluralName: 'consumables';
    singularName: 'consumable';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    assetInfo: Schema.Attribute.Component<'asset.info', false>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    consumableStatus: Schema.Attribute.Enumeration<
      ['available', 'low_stock', 'out_of_stock', 'expired', 'discontinued']
    > &
      Schema.Attribute.DefaultTo<'available'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    expirationDate: Schema.Attribute.Date;
    isReusable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::consumable.consumable'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    storageInstructions: Schema.Attribute.Text;
    supplierCode: Schema.Attribute.String;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    type: Schema.Attribute.Enumeration<
      [
        'office_supply',
        'material',
        'food',
        'beverage',
        'cleaning',
        'chemical',
        'other',
      ]
    >;
    unit: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiConsumptionConsumption extends Struct.CollectionTypeSchema {
  collectionName: 'consumption';
  info: {
    collectionName: 'consumptions';
    description: 'Registro de consumo de consumibles';
    displayName: 'Consumption';
    pluralName: 'consumptions';
    singularName: 'consumption';
  };
  options: {
    comment: 'Tabla que almacena informaci\u00F3n de consumption';
    draftAndPublish: true;
  };
  attributes: {
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    consumable: Schema.Attribute.Relation<
      'manyToOne',
      'api::consumable.consumable'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    deletedAt: Schema.Attribute.DateTime;
    event: Schema.Attribute.Relation<'manyToOne', 'api::event.event'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::consumption.consumption'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    purpose: Schema.Attribute.Text;
    quantity: Schema.Attribute.Decimal & Schema.Attribute.Required;
    systemMetadata: Schema.Attribute.Component<'metadata.system', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiDiscountDiscount extends Struct.CollectionTypeSchema {
  collectionName: 'discount';
  info: {
    collectionName: 'discounts';
    description: 'Descuentos y promociones aplicables';
    displayName: 'Discount';
    pluralName: 'discounts';
    singularName: 'discount';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    applicableFor: Schema.Attribute.Enumeration<
      ['all', 'membership', 'resource_usage', 'reservation', 'event', 'service']
    > &
      Schema.Attribute.DefaultTo<'all'>;
    applicableMemberships: Schema.Attribute.Relation<
      'manyToMany',
      'api::membership.membership'
    >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    discountType: Schema.Attribute.Enumeration<
      ['percentage', 'fixed_amount', 'free_months']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'percentage'>;
    endDate: Schema.Attribute.Date;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isFirstTimeOnly: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isReferralDiscount: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::discount.discount'
    > &
      Schema.Attribute.Private;
    maxUses: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    minPurchaseAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    payment: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    publishedAt: Schema.Attribute.DateTime;
    startDate: Schema.Attribute.Date;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    usedCount: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    value: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface ApiEquipmentEquipment extends Struct.CollectionTypeSchema {
  collectionName: 'equipment';
  info: {
    collectionName: 'equipment';
    description: 'Equipos disponibles';
    displayName: 'Equipment';
    pluralName: 'equipments';
    singularName: 'equipment';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    assetInfo: Schema.Attribute.Component<'asset.info', false>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currentUser: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    internalCode: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 2;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipment.equipment'
    > &
      Schema.Attribute.Private;
    locationType: Schema.Attribute.Enumeration<['fixed', 'mobile', 'shared']> &
      Schema.Attribute.DefaultTo<'fixed'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    requiredSkills: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipmentskill.equipmentskill'
    >;
    requiredTraining: Schema.Attribute.Relation<
      'manyToMany',
      'api::training.training'
    >;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    tools: Schema.Attribute.Relation<'manyToMany', 'api::tool.tool'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEquipmentskillEquipmentskill
  extends Struct.CollectionTypeSchema {
  collectionName: 'equipmentskill';
  info: {
    collectionName: 'equipmentskills';
    description: 'Habilidades requeridas para utilizar equipamiento';
    displayName: 'Equipment Required Skill';
    pluralName: 'equipmentskills';
    singularName: 'equipmentskill';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    alternativeRequirements: Schema.Attribute.Text;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    equipment: Schema.Attribute.Relation<
      'manyToOne',
      'api::equipment.equipment'
    >;
    isStrict: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipmentskill.equipmentskill'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    requiredLevel: Schema.Attribute.Relation<
      'manyToOne',
      'api::skilllevel.skilllevel'
    >;
    skill: Schema.Attribute.Relation<'manyToOne', 'api::skill.skill'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiEventEvent extends Struct.CollectionTypeSchema {
  collectionName: 'event';
  info: {
    collectionName: 'events';
    description: 'Eventos organizados';
    displayName: 'Event';
    pluralName: 'events';
    singularName: 'event';
  };
  options: {
    comment: 'Tabla que almacena informaci\u00F3n de event';
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.Component<'common.address', false>;
    analyticsMetadata: Schema.Attribute.Component<'metadata.analytics', true>;
    attachments: Schema.Attribute.Media<undefined, true>;
    attendances: Schema.Attribute.Relation<
      'oneToMany',
      'api::attendance.attendance'
    >;
    capacity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    cost: Schema.Attribute.Decimal & Schema.Attribute.DefaultTo<0>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    endDate: Schema.Attribute.DateTime & Schema.Attribute.Required;
    eventStatus: Schema.Attribute.Enumeration<
      ['scheduled', 'cancelled', 'postponed', 'completed']
    > &
      Schema.Attribute.DefaultTo<'scheduled'>;
    eventType: Schema.Attribute.Enumeration<
      ['workshop', 'conference', 'meeting', 'social', 'other']
    >;
    image: Schema.Attribute.Media<'images'>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::event.event'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    organizer: Schema.Attribute.String;
    previousStatus: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationDeadline: Schema.Attribute.DateTime;
    relatedAreas: Schema.Attribute.Relation<'manyToMany', 'api::area.area'>;
    requiredMemberships: Schema.Attribute.Relation<
      'manyToMany',
      'api::membership.membership'
    >;
    startDate: Schema.Attribute.DateTime & Schema.Attribute.Required;
    statusChangedAt: Schema.Attribute.DateTime;
    statusHistory: Schema.Attribute.JSON;
    systemMetadata: Schema.Attribute.Component<'metadata.system', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 3;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiExchangesessionExchangesession
  extends Struct.CollectionTypeSchema {
  collectionName: 'exchangesessions';
  info: {
    collectionName: 'exchangesessions';
    description: 'Sesiones individuales de intercambio de habilidades';
    displayName: 'Exchange Session';
    pluralName: 'exchangesessions';
    singularName: 'exchangesession';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    agenda: Schema.Attribute.Text;
    attendees: Schema.Attribute.Relation<'manyToMany', 'api::member.member'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    duration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    feedback: Schema.Attribute.Component<
      'collaboration.participantfeedback',
      true
    >;
    format: Schema.Attribute.Enumeration<['in_person', 'online', 'hybrid']> &
      Schema.Attribute.DefaultTo<'online'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::exchangesession.exchangesession'
    > &
      Schema.Attribute.Private;
    locationString: Schema.Attribute.String;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    resources: Schema.Attribute.Media<'files', true>;
    sessionStatus: Schema.Attribute.Enumeration<
      ['scheduled', 'completed', 'cancelled', 'rescheduled']
    > &
      Schema.Attribute.DefaultTo<'scheduled'>;
    skillExchange: Schema.Attribute.Relation<
      'manyToOne',
      'api::skillexchange.skillexchange'
    >;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalGlobal extends Struct.SingleTypeSchema {
  collectionName: 'globals';
  info: {
    collectionName: 'globals';
    description: 'Define global settings';
    displayName: 'Global';
    pluralName: 'globals';
    singularName: 'global';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    defaultSeo: Schema.Attribute.Component<'shared.seo', false>;
    favicon: Schema.Attribute.Media<'images' | 'files' | 'videos'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global.global'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    siteDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    siteName: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInvoiceInvoice extends Struct.CollectionTypeSchema {
  collectionName: 'invoice';
  info: {
    collectionName: 'invoices';
    description: 'Facturas generadas en el sistema';
    displayName: 'Invoice';
    pluralName: 'invoices';
    singularName: 'invoice';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    billingInfo: Schema.Attribute.Component<'payment.billing', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    dueDate: Schema.Attribute.Date;
    invoiceNumber: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    invoiceStatus: Schema.Attribute.Enumeration<
      [
        'draft',
        'issued',
        'paid',
        'partially_paid',
        'overdue',
        'cancelled',
        'refunded',
      ]
    > &
      Schema.Attribute.DefaultTo<'draft'>;
    issueDate: Schema.Attribute.Date & Schema.Attribute.Required;
    items: Schema.Attribute.Relation<
      'oneToMany',
      'api::invoiceitem.invoiceitem'
    >;
    lastReminderSent: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invoice.invoice'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    paidAt: Schema.Attribute.DateTime;
    payment: Schema.Attribute.Relation<'manyToOne', 'api::payment.payment'>;
    paymentTerms: Schema.Attribute.Text;
    pdfDocument: Schema.Attribute.Media<'files'>;
    publishedAt: Schema.Attribute.DateTime;
    remindersSent: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    sellerInfo: Schema.Attribute.Component<'payment.seller', false>;
    sentAt: Schema.Attribute.DateTime;
    taxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalAmount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiInvoiceitemInvoiceitem extends Struct.CollectionTypeSchema {
  collectionName: 'invoiceitem';
  info: {
    collectionName: 'invoiceitems';
    description: '\u00CDtems individuales dentro de una factura';
    displayName: 'Invoice Item';
    pluralName: 'invoiceitems';
    singularName: 'invoiceitem';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    description: Schema.Attribute.Text;
    discountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    invoice: Schema.Attribute.Relation<'manyToOne', 'api::invoice.invoice'>;
    itemType: Schema.Attribute.Enumeration<
      [
        'membership',
        'resource_usage',
        'reservation',
        'event',
        'consumable',
        'service',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'membership'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::invoiceitem.invoiceitem'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    paymentItem: Schema.Attribute.Relation<
      'manyToOne',
      'api::paymentitem.paymentitem'
    >;
    periodEnd: Schema.Attribute.Date;
    periodStart: Schema.Attribute.Date;
    publishedAt: Schema.Attribute.DateTime;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    taxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    taxRate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalPrice: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    unitPrice: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMemberMember extends Struct.CollectionTypeSchema {
  collectionName: 'member';
  info: {
    collectionName: 'members';
    description: 'Miembros registrados en el sistema';
    displayName: 'Member';
    pluralName: 'members';
    singularName: 'member';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accessLogs: Schema.Attribute.Relation<
      'oneToMany',
      'api::accesslog.accesslog'
    >;
    additionalSupervisorOf: Schema.Attribute.Relation<
      'manyToMany',
      'api::area.area'
    >;
    attendances: Schema.Attribute.Relation<
      'oneToMany',
      'api::attendance.attendance'
    >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    avatar: Schema.Attribute.Media<'images'>;
    bio: Schema.Attribute.Text;
    collaborationagreement: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationagreement.collaborationagreement'
    >;
    collaborationoffer: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationoffer.collaborationoffer'
    >;
    collaborationrequest: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationrequest.collaborationrequest'
    >;
    contactInfo: Schema.Attribute.Component<'member.contactinfo', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currentSubscription: Schema.Attribute.Relation<
      'oneToOne',
      'api::membershipsubscription.membershipsubscription'
    >;
    deletedAt: Schema.Attribute.DateTime;
    displayName: Schema.Attribute.String;
    emergencyContact: Schema.Attribute.Component<
      'member.emergencycontact',
      false
    >;
    firstName: Schema.Attribute.String & Schema.Attribute.Required;
    interests: Schema.Attribute.JSON;
    isPublicProfile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    joinDate: Schema.Attribute.Date;
    lastName: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::member.member'
    > &
      Schema.Attribute.Private;
    memberCode: Schema.Attribute.String & Schema.Attribute.Unique;
    memberStatus: Schema.Attribute.Enumeration<
      ['active', 'inactive', 'suspended', 'pending', 'alumni']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    menteeship: Schema.Attribute.Relation<
      'oneToMany',
      'api::mentorship.mentorship'
    >;
    mentorship: Schema.Attribute.Relation<
      'oneToMany',
      'api::mentorship.mentorship'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    ownedproject: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    >;
    payment: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    preferences: Schema.Attribute.Component<'member.preferences', false>;
    primarySupervisorOf: Schema.Attribute.Relation<
      'oneToMany',
      'api::area.area'
    >;
    profileInfo: Schema.Attribute.Component<'member.profileinfo', false>;
    projects: Schema.Attribute.Relation<'manyToMany', 'api::project.project'>;
    publishedAt: Schema.Attribute.DateTime;
    skillExchanges: Schema.Attribute.Relation<
      'manyToMany',
      'api::skillexchange.skillexchange'
    >;
    skills: Schema.Attribute.Relation<
      'oneToMany',
      'api::memberskill.memberskill'
    >;
    subscriptions: Schema.Attribute.Relation<
      'oneToMany',
      'api::membershipsubscription.membershipsubscription'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMembershipMembership extends Struct.CollectionTypeSchema {
  collectionName: 'membership';
  info: {
    collectionName: 'memberships';
    description: 'Tipos de membres\u00EDa disponibles';
    displayName: 'Membership';
    pluralName: 'memberships';
    singularName: 'membership';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accessRules: Schema.Attribute.Component<'membership.accessrules', true>;
    allowedSpaces: Schema.Attribute.Relation<'manyToMany', 'api::space.space'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    benefits: Schema.Attribute.Component<'membership.benefits', true>;
    billingCycle: Schema.Attribute.Enumeration<
      ['monthly', 'quarterly', 'biannual', 'annual', 'one_time']
    > &
      Schema.Attribute.DefaultTo<'monthly'>;
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    durationDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::membership.membership'
    > &
      Schema.Attribute.Private;
    maxMembers: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    subscribers: Schema.Attribute.Relation<
      'oneToMany',
      'api::membershipsubscription.membershipsubscription'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMembershipperiodMembershipperiod
  extends Struct.CollectionTypeSchema {
  collectionName: 'membershipperiods';
  info: {
    collectionName: 'membershipperiods';
    description: 'Per\u00EDodos de membres\u00EDa para miembros';
    displayName: 'MembershipPeriod';
    pluralName: 'membershipperiods';
    singularName: 'membershipperiod';
  };
  options: {
    comment: 'Tabla que almacena informaci\u00F3n de membershipperiod';
    draftAndPublish: true;
  };
  attributes: {
    actualPrice: Schema.Attribute.Decimal;
    analyticsMetadata: Schema.Attribute.Component<'metadata.analytics', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    discountApplied: Schema.Attribute.Decimal;
    discountReason: Schema.Attribute.String;
    endDate: Schema.Attribute.Date & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isRenewal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::membershipperiod.membershipperiod'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    membership: Schema.Attribute.Relation<
      'manyToOne',
      'api::membership.membership'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    payments: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    periodStatus: Schema.Attribute.Enumeration<
      ['active', 'expired', 'cancelled', 'suspended', 'pending_payment']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'pending_payment'>;
    previousPeriodId: Schema.Attribute.Integer;
    previousStatus: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    renewalReminders: Schema.Attribute.JSON;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
    statusChangedAt: Schema.Attribute.DateTime;
    statusHistory: Schema.Attribute.JSON;
    systemMetadata: Schema.Attribute.Component<'metadata.system', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMembershipsubscriptionMembershipsubscription
  extends Struct.CollectionTypeSchema {
  collectionName: 'membershipsubscriptions';
  info: {
    collectionName: 'membershipsubscriptions';
    description: 'Suscripciones de membres\u00EDa de los miembros';
    displayName: 'Membership Subscription';
    pluralName: 'membershipsubscriptions';
    singularName: 'membershipsubscription';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    autoRenew: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    cancellationDate: Schema.Attribute.DateTime;
    cancellationReason: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    deletedAt: Schema.Attribute.DateTime;
    endDate: Schema.Attribute.Date;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::membershipsubscription.membershipsubscription'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    membership: Schema.Attribute.Relation<
      'manyToOne',
      'api::membership.membership'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    nextRenewalDate: Schema.Attribute.Date;
    payment: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    paymentMethod: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
    publishedAt: Schema.Attribute.DateTime;
    startDate: Schema.Attribute.Date & Schema.Attribute.Required;
    subscriptionStatus: Schema.Attribute.Enumeration<
      ['active', 'expired', 'pending_payment', 'cancelled', 'trial']
    > &
      Schema.Attribute.DefaultTo<'active'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMemberskillMemberskill extends Struct.CollectionTypeSchema {
  collectionName: 'memberskill';
  info: {
    collectionName: 'memberskills';
    description: 'Habilidades asociadas a miembros';
    displayName: 'Member Skill';
    pluralName: 'memberskills';
    singularName: 'memberskill';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    endorsements: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillendorsement.skillendorsement'
    >;
    isAvailableForProjects: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isVerified: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    level: Schema.Attribute.Relation<'manyToOne', 'api::skilllevel.skilllevel'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::memberskill.memberskill'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    skill: Schema.Attribute.Relation<'manyToOne', 'api::skill.skill'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    verifications: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillverification.skillverification'
    >;
    verifiedAt: Schema.Attribute.DateTime;
    verifiedBy: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    yearsExperience: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface ApiMentorshipMentorship extends Struct.CollectionTypeSchema {
  collectionName: 'mentorship';
  info: {
    collectionName: 'mentorships';
    description: 'Relaciones de mentor\u00EDa entre miembros';
    displayName: 'Mentorship';
    pluralName: 'mentorships';
    singularName: 'mentorship';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    focusSkill: Schema.Attribute.Relation<'manyToMany', 'api::skill.skill'>;
    format: Schema.Attribute.Enumeration<['in_person', 'online', 'hybrid']> &
      Schema.Attribute.DefaultTo<'hybrid'>;
    frequency: Schema.Attribute.Enumeration<
      ['weekly', 'biweekly', 'monthly', 'ad_hoc']
    > &
      Schema.Attribute.DefaultTo<'biweekly'>;
    goal: Schema.Attribute.Component<'collaboration.goal', true>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::mentorship.mentorship'
    > &
      Schema.Attribute.Private;
    mentee: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    mentor: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    mentorshipStatus: Schema.Attribute.Enumeration<
      ['proposed', 'active', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'proposed'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    session: Schema.Attribute.Relation<
      'oneToMany',
      'api::mentorshipsession.mentorshipsession'
    >;
    sessionDuration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 15;
        },
        number
      > &
      Schema.Attribute.DefaultTo<60>;
    startDate: Schema.Attribute.Date;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMentorshipsessionMentorshipsession
  extends Struct.CollectionTypeSchema {
  collectionName: 'mentorshipsession';
  info: {
    collectionName: 'mentorshipsessions';
    description: 'Sesiones individuales de mentor\u00EDa';
    displayName: 'Mentorship Session';
    pluralName: 'mentorshipsessions';
    singularName: 'mentorshipsession';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    agenda: Schema.Attribute.Text;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    duration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    feedback: Schema.Attribute.Component<
      'collaboration.sessionfeedback',
      false
    >;
    format: Schema.Attribute.Enumeration<['in_person', 'online', 'hybrid']> &
      Schema.Attribute.DefaultTo<'online'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::mentorshipsession.mentorshipsession'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String;
    mentorship: Schema.Attribute.Relation<
      'manyToOne',
      'api::mentorship.mentorship'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    nextSteps: Schema.Attribute.Text;
    notes: Schema.Attribute.RichText;
    publishedAt: Schema.Attribute.DateTime;
    resources: Schema.Attribute.Media<'files', true>;
    sessionStatus: Schema.Attribute.Enumeration<
      ['scheduled', 'completed', 'cancelled', 'rescheduled']
    > &
      Schema.Attribute.DefaultTo<'scheduled'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPaymentPayment extends Struct.CollectionTypeSchema {
  collectionName: 'payment';
  info: {
    collectionName: 'payments';
    description: 'Pagos realizados en el sistema';
    displayName: 'Payment';
    pluralName: 'payments';
    singularName: 'payment';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    discount: Schema.Attribute.Relation<'manyToOne', 'api::discount.discount'>;
    dueDate: Schema.Attribute.Date;
    invoice: Schema.Attribute.Relation<'oneToMany', 'api::invoice.invoice'>;
    isRecurring: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    item: Schema.Attribute.Relation<
      'oneToMany',
      'api::paymentitem.paymentitem'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::payment.payment'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    membershipSubscription: Schema.Attribute.Relation<
      'manyToOne',
      'api::membershipsubscription.membershipsubscription'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    nextPaymentDate: Schema.Attribute.Date;
    notes: Schema.Attribute.Text;
    paymentCode: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    paymentDate: Schema.Attribute.DateTime;
    paymentmethod: Schema.Attribute.Relation<
      'manyToOne',
      'api::paymentmethod.paymentmethod'
    >;
    paymentMethod: Schema.Attribute.Relation<
      'manyToOne',
      'api::paymentmethod.paymentmethod'
    >;
    paymentPlan: Schema.Attribute.Relation<
      'manyToOne',
      'api::paymentplan.paymentplan'
    >;
    paymentStatus: Schema.Attribute.Enumeration<
      ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    paymentType: Schema.Attribute.Enumeration<
      [
        'membership',
        'resource_usage',
        'reservation',
        'event',
        'consumable',
        'service',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'membership'>;
    publishedAt: Schema.Attribute.DateTime;
    recurringCycle: Schema.Attribute.Enumeration<
      ['weekly', 'monthly', 'quarterly', 'biannual', 'annual']
    >;
    transaction: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction.transaction'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPaymentgatewayPaymentgateway
  extends Struct.CollectionTypeSchema {
  collectionName: 'paymentgateway';
  info: {
    collectionName: 'paymentgateways';
    description: 'Pasarelas de pago integradas';
    displayName: 'Payment Gateway';
    pluralName: 'paymentgateways';
    singularName: 'paymentgateway';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    apiCredentials: Schema.Attribute.Component<
      'payment.apicredentials',
      false
    > &
      Schema.Attribute.Private;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::paymentgateway.paymentgateway'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    paymentmethod: Schema.Attribute.Relation<
      'oneToMany',
      'api::paymentmethod.paymentmethod'
    >;
    processingFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    processingFeeType: Schema.Attribute.Enumeration<['fixed', 'percentage']> &
      Schema.Attribute.DefaultTo<'percentage'>;
    publishedAt: Schema.Attribute.DateTime;
    supportedCurrencies: Schema.Attribute.JSON;
    testMode: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    transaction: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction.transaction'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    webhookSecret: Schema.Attribute.String & Schema.Attribute.Private;
    webhookUrl: Schema.Attribute.String;
  };
}

export interface ApiPaymentitemPaymentitem extends Struct.CollectionTypeSchema {
  collectionName: 'paymentitem';
  info: {
    collectionName: 'paymentitems';
    description: '\u00CDtems individuales dentro de un pago';
    displayName: 'Payment Item';
    pluralName: 'paymentitems';
    singularName: 'paymentitem';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    description: Schema.Attribute.Text;
    discountAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    equipment: Schema.Attribute.Relation<
      'manyToOne',
      'api::equipment.equipment'
    >;
    itemType: Schema.Attribute.Enumeration<
      [
        'membership',
        'resource_usage',
        'reservation',
        'event',
        'consumable',
        'service',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'membership'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::paymentitem.paymentitem'
    > &
      Schema.Attribute.Private;
    membership: Schema.Attribute.Relation<
      'manyToOne',
      'api::membership.membership'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    payment: Schema.Attribute.Relation<'manyToOne', 'api::payment.payment'>;
    periodEnd: Schema.Attribute.Date;
    periodStart: Schema.Attribute.Date;
    publishedAt: Schema.Attribute.DateTime;
    quantity: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<1>;
    space: Schema.Attribute.Relation<'manyToOne', 'api::space.space'>;
    taxAmount: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    taxRate: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    totalPrice: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    unitPrice: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPaymentmethodPaymentmethod
  extends Struct.CollectionTypeSchema {
  collectionName: 'paymentmethods';
  info: {
    collectionName: 'paymentmethods';
    description: 'M\u00E9todos de pago disponibles';
    displayName: 'Payment Method';
    pluralName: 'paymentmethods';
    singularName: 'paymentmethod';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    instructions: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::paymentmethod.paymentmethod'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    methodType: Schema.Attribute.Enumeration<
      [
        'credit_card',
        'debit_card',
        'bank_transfer',
        'paypal',
        'cash',
        'mobile_payment',
        'other',
      ]
    > &
      Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    payment: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    paymentgateway: Schema.Attribute.Relation<
      'manyToOne',
      'api::paymentgateway.paymentgateway'
    >;
    processingFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    processingFeeType: Schema.Attribute.Enumeration<['fixed', 'percentage']> &
      Schema.Attribute.DefaultTo<'percentage'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiPaymentplanPaymentplan extends Struct.CollectionTypeSchema {
  collectionName: 'paymentplan';
  info: {
    collectionName: 'paymentplans';
    description: 'Planes de pago disponibles';
    displayName: 'Payment Plan';
    pluralName: 'paymentplans';
    singularName: 'paymentplan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    applicableFor: Schema.Attribute.Enumeration<
      [
        'membership',
        'resource_usage',
        'reservation',
        'event',
        'service',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'membership'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    autoRenew: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    availablePaymentMethods: Schema.Attribute.Relation<
      'manyToMany',
      'api::paymentmethod.paymentmethod'
    >;
    billingCycle: Schema.Attribute.Enumeration<
      ['one_time', 'weekly', 'monthly', 'quarterly', 'biannual', 'annual']
    > &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'monthly'>;
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    durationMonths: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    earlyTerminationFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    gracePeriodDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::paymentplan.paymentplan'
    > &
      Schema.Attribute.Private;
    membershipType: Schema.Attribute.Relation<
      'manyToOne',
      'api::membership.membership'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    payment: Schema.Attribute.Relation<'oneToMany', 'api::payment.payment'>;
    publishedAt: Schema.Attribute.DateTime;
    setupFee: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    trialDays: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiProjectProject extends Struct.CollectionTypeSchema {
  collectionName: 'project';
  info: {
    collectionName: 'projects';
    description: 'Proyectos que pueden requerir colaboraciones';
    displayName: 'Project';
    pluralName: 'projects';
    singularName: 'project';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    budget: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    category: Schema.Attribute.Enumeration<
      [
        'technology',
        'art',
        'education',
        'social',
        'environmental',
        'business',
        'research',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'technology'>;
    collaborationagreement: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationagreement.collaborationagreement'
    >;
    collaborationrequest: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationrequest.collaborationrequest'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.RichText & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    estimatedDuration: Schema.Attribute.String;
    files: Schema.Attribute.Media<'files', true>;
    fundingSource: Schema.Attribute.String;
    gallery: Schema.Attribute.Media<'images' | 'videos', true>;
    image: Schema.Attribute.Media<'images'>;
    isFunded: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    isOpenSource: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    license: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::project.project'
    > &
      Schema.Attribute.Private;
    members: Schema.Attribute.Relation<'manyToMany', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    owner: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    projectneed: Schema.Attribute.Relation<
      'oneToMany',
      'api::projectneed.projectneed'
    >;
    projectStatus: Schema.Attribute.Enumeration<
      ['planning', 'active', 'paused', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'planning'>;
    publishedAt: Schema.Attribute.DateTime;
    repositoryUrl: Schema.Attribute.String;
    shortDescription: Schema.Attribute.Text;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    startDate: Schema.Attribute.Date;
    tags: Schema.Attribute.JSON;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    visibility: Schema.Attribute.Enumeration<
      ['public', 'members_only', 'private', 'invitation_only']
    > &
      Schema.Attribute.DefaultTo<'public'>;
    website: Schema.Attribute.String;
  };
}

export interface ApiProjectneedProjectneed extends Struct.CollectionTypeSchema {
  collectionName: 'projectneed';
  info: {
    collectionName: 'projectneeds';
    description: 'Necesidades espec\u00EDficas de habilidades para proyectos';
    displayName: 'Project Need';
    pluralName: 'projectneeds';
    singularName: 'projectneed';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    collaborationoffer: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationoffer.collaborationoffer'
    >;
    compensation: Schema.Attribute.Enumeration<
      ['unpaid', 'paid', 'exchange', 'credit', 'other']
    > &
      Schema.Attribute.DefaultTo<'unpaid'>;
    compensationDetails: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deadline: Schema.Attribute.Date;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    isRemote: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::projectneed.projectneed'
    > &
      Schema.Attribute.Private;
    match: Schema.Attribute.Relation<
      'oneToMany',
      'api::collaborationmatch.collaborationmatch'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    minExperienceLevel: Schema.Attribute.Enumeration<
      ['beginner', 'intermediate', 'advanced', 'expert']
    > &
      Schema.Attribute.DefaultTo<'intermediate'>;
    needStatus: Schema.Attribute.Enumeration<
      ['open', 'in_progress', 'fulfilled', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'open'>;
    priority: Schema.Attribute.Enumeration<
      ['low', 'medium', 'high', 'critical']
    > &
      Schema.Attribute.DefaultTo<'medium'>;
    project: Schema.Attribute.Relation<'manyToOne', 'api::project.project'>;
    publishedAt: Schema.Attribute.DateTime;
    requiredHours: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    requiredSkill: Schema.Attribute.Relation<'manyToMany', 'api::skill.skill'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReservationReservation extends Struct.CollectionTypeSchema {
  collectionName: 'reservation';
  info: {
    collectionName: 'reservations';
    description: 'Reservas de espacios, herramientas y recursos';
    displayName: 'Reservation';
    pluralName: 'reservations';
    singularName: 'reservation';
  };
  options: {
    comment: 'Tabla que almacena informaci\u00F3n de reservation';
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    endTime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    event: Schema.Attribute.Relation<'manyToOne', 'api::event.event'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::reservation.reservation'
    > &
      Schema.Attribute.Private;
    member: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    previousStatus: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    purpose: Schema.Attribute.Text;
    reservationStatus: Schema.Attribute.Enumeration<
      ['pending', 'confirmed', 'cancelled', 'completed']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    resource: Schema.Attribute.Relation<'manyToOne', 'api::resource.resource'>;
    space: Schema.Attribute.Relation<'manyToOne', 'api::space.space'>;
    startTime: Schema.Attribute.DateTime & Schema.Attribute.Required;
    statusChangedAt: Schema.Attribute.DateTime;
    statusHistory: Schema.Attribute.JSON;
    systemMetadata: Schema.Attribute.Component<'metadata.system', true>;
    tool: Schema.Attribute.Relation<'manyToOne', 'api::tool.tool'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiResourceResource extends Struct.CollectionTypeSchema {
  collectionName: 'resource';
  info: {
    collectionName: 'resources';
    description: 'Recursos educativos, t\u00E9cnicos o documentales';
    displayName: 'Resource';
    pluralName: 'resources';
    singularName: 'resource';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    accessLevel: Schema.Attribute.Enumeration<
      ['public', 'internal', 'restricted']
    > &
      Schema.Attribute.DefaultTo<'public'>;
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    assetInfo: Schema.Attribute.Component<'asset.info', false>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    author: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currentUser: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    file: Schema.Attribute.Media;
    format: Schema.Attribute.Enumeration<['physical', 'digital', 'both']> &
      Schema.Attribute.DefaultTo<'digital'>;
    isAvailable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    language: Schema.Attribute.String;
    licenseType: Schema.Attribute.Enumeration<
      ['CC-BY', 'CC-BY-SA', 'CC0', 'open-source', 'proprietary', 'unknown']
    > &
      Schema.Attribute.DefaultTo<'unknown'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::resource.resource'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 2;
      }>;
    publicationDate: Schema.Attribute.Date;
    publishedAt: Schema.Attribute.DateTime;
    publisher: Schema.Attribute.String;
    relatedSkills: Schema.Attribute.Relation<'manyToMany', 'api::skill.skill'>;
    resourceStatus: Schema.Attribute.Enumeration<
      ['available', 'in_use', 'unavailable', 'archived']
    > &
      Schema.Attribute.DefaultTo<'available'>;
    resourceTopic: Schema.Attribute.Relation<'manyToOne', 'api::topic.topic'>;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    type: Schema.Attribute.Enumeration<
      ['document', 'book', 'video', 'audio', 'course', 'template', 'other']
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String;
    version: Schema.Attribute.String;
  };
}

export interface ApiSkillSkill extends Struct.CollectionTypeSchema {
  collectionName: 'skill';
  info: {
    collectionName: 'skills';
    description: 'Habilidades y competencias';
    displayName: 'Skill';
    pluralName: 'skills';
    singularName: 'skill';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    areaRequirements: Schema.Attribute.Relation<
      'oneToMany',
      'api::areaskill.areaskill'
    >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    category: Schema.Attribute.Relation<
      'manyToOne',
      'api::skillcategory.skillcategory'
    >;
    childSkills: Schema.Attribute.Relation<'oneToMany', 'api::skill.skill'>;
    color: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    equipmentRequirements: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipmentskill.equipmentskill'
    >;
    icon: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    isVerifiable: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    levels: Schema.Attribute.Relation<
      'oneToMany',
      'api::skilllevel.skilllevel'
    >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::skill.skill'> &
      Schema.Attribute.Private;
    memberSkills: Schema.Attribute.Relation<
      'oneToMany',
      'api::memberskill.memberskill'
    >;
    mentorship: Schema.Attribute.Relation<
      'manyToMany',
      'api::mentorship.mentorship'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    parentSkill: Schema.Attribute.Relation<'manyToOne', 'api::skill.skill'>;
    projectneed: Schema.Attribute.Relation<
      'manyToMany',
      'api::projectneed.projectneed'
    >;
    publishedAt: Schema.Attribute.DateTime;
    skillExchanges: Schema.Attribute.Relation<
      'manyToMany',
      'api::skillexchange.skillexchange'
    >;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    trainingSkills: Schema.Attribute.Relation<
      'oneToMany',
      'api::trainingskill.trainingskill'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    verificationCriteria: Schema.Attribute.Text;
  };
}

export interface ApiSkillcategorySkillcategory
  extends Struct.CollectionTypeSchema {
  collectionName: 'skillcategory';
  info: {
    collectionName: 'skillcategories';
    description: 'Categor\u00EDas para agrupar habilidades';
    displayName: 'Skill Category';
    pluralName: 'skillcategories';
    singularName: 'skillcategory';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    childCategories: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillcategory.skillcategory'
    >;
    color: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillcategory.skillcategory'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    parentCategory: Schema.Attribute.Relation<
      'manyToOne',
      'api::skillcategory.skillcategory'
    >;
    publishedAt: Schema.Attribute.DateTime;
    skills: Schema.Attribute.Relation<'oneToMany', 'api::skill.skill'>;
    slug: Schema.Attribute.UID<'name'> & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSkillendorsementSkillendorsement
  extends Struct.CollectionTypeSchema {
  collectionName: 'skillendorsement';
  info: {
    collectionName: 'skillendorsements';
    description: 'Respaldos de habilidades entre miembros';
    displayName: 'Skill Endorsement';
    pluralName: 'skillendorsements';
    singularName: 'skillendorsement';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    comment: Schema.Attribute.Text;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    endorsedAt: Schema.Attribute.DateTime & Schema.Attribute.Required;
    endorsedBy: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillendorsement.skillendorsement'
    > &
      Schema.Attribute.Private;
    memberSkill: Schema.Attribute.Relation<
      'manyToOne',
      'api::memberskill.memberskill'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSkillexchangeSkillexchange
  extends Struct.CollectionTypeSchema {
  collectionName: 'skillexchanges';
  info: {
    collectionName: 'skillexchanges';
    description: 'Intercambios de conocimientos entre miembros';
    displayName: 'Skill Exchange';
    pluralName: 'skillexchanges';
    singularName: 'skillexchange';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    endDate: Schema.Attribute.Date;
    exchangeSessions: Schema.Attribute.Relation<
      'oneToMany',
      'api::exchangesession.exchangesession'
    >;
    exchangeStatus: Schema.Attribute.Enumeration<
      ['proposed', 'active', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'proposed'>;
    exchangeType: Schema.Attribute.Enumeration<
      ['one_to_one', 'group', 'workshop']
    > &
      Schema.Attribute.DefaultTo<'one_to_one'>;
    format: Schema.Attribute.Enumeration<['in_person', 'online', 'hybrid']> &
      Schema.Attribute.DefaultTo<'hybrid'>;
    isPublic: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillexchange.skillexchange'
    > &
      Schema.Attribute.Private;
    locationDetails: Schema.Attribute.Component<'location.geo', false>;
    meetingLocation: Schema.Attribute.String;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    participants: Schema.Attribute.Relation<'manyToMany', 'api::member.member'>;
    publishedAt: Schema.Attribute.DateTime;
    skills: Schema.Attribute.Relation<'manyToMany', 'api::skill.skill'>;
    startDate: Schema.Attribute.Date;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSkilllevelSkilllevel extends Struct.CollectionTypeSchema {
  collectionName: 'skilllevel';
  info: {
    collectionName: 'skilllevels';
    description: 'Niveles de competencia para habilidades';
    displayName: 'Skill Level';
    pluralName: 'skilllevels';
    singularName: 'skilllevel';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    areaRequirements: Schema.Attribute.Relation<
      'oneToMany',
      'api::areaskill.areaskill'
    >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    color: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    criteria: Schema.Attribute.Text;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    equipmentRequirements: Schema.Attribute.Relation<
      'oneToMany',
      'api::equipmentskill.equipmentskill'
    >;
    icon: Schema.Attribute.String;
    isDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::skilllevel.skilllevel'
    > &
      Schema.Attribute.Private;
    memberSkills: Schema.Attribute.Relation<
      'oneToMany',
      'api::memberskill.memberskill'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    skill: Schema.Attribute.Relation<'manyToOne', 'api::skill.skill'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    value: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
  };
}

export interface ApiSkillverificationSkillverification
  extends Struct.CollectionTypeSchema {
  collectionName: 'skillverification';
  info: {
    collectionName: 'skillverifications';
    description: 'Verificaciones formales de habilidades';
    displayName: 'Skill Verification';
    pluralName: 'skillverifications';
    singularName: 'skillverification';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    attachments: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::skillverification.skillverification'
    > &
      Schema.Attribute.Private;
    memberSkill: Schema.Attribute.Relation<
      'manyToOne',
      'api::memberskill.memberskill'
    >;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    notes: Schema.Attribute.Text;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    verificationMethod: Schema.Attribute.Enumeration<
      [
        'demonstration',
        'interview',
        'certificate',
        'project_review',
        'test',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'demonstration'>;
    verifiedAt: Schema.Attribute.DateTime & Schema.Attribute.Required;
    verifiedBy: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
  };
}

export interface ApiSpaceSpace extends Struct.CollectionTypeSchema {
  collectionName: 'space';
  info: {
    collectionName: 'spaces';
    description: 'Espacios f\u00EDsicos disponibles';
    displayName: 'Space';
    pluralName: 'spaces';
    singularName: 'space';
  };
  options: {
    comment: 'Tabla que almacena informaci\u00F3n de space';
    draftAndPublish: true;
  };
  attributes: {
    accessRestrictions: Schema.Attribute.JSON;
    allowedMemberships: Schema.Attribute.Relation<
      'manyToMany',
      'api::membership.membership'
    >;
    areas: Schema.Attribute.Relation<'oneToMany', 'api::area.area'>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    building: Schema.Attribute.String;
    capacity: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'space.features', false>;
    floor: Schema.Attribute.String;
    gallery: Schema.Attribute.Media<'images', true>;
    geoLocation: Schema.Attribute.Component<'location.geo', false>;
    image: Schema.Attribute.Media<'images'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::space.space'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    openingHours: Schema.Attribute.JSON;
    previousStatus: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    requiredMembershipLevel: Schema.Attribute.Enumeration<
      ['basic', 'standard', 'premium', 'all']
    > &
      Schema.Attribute.DefaultTo<'all'>;
    size: Schema.Attribute.Decimal;
    spaceStatus: Schema.Attribute.Enumeration<
      ['available', 'occupied', 'maintenance', 'reserved', 'closed']
    > &
      Schema.Attribute.DefaultTo<'available'>;
    statusChangedAt: Schema.Attribute.DateTime;
    statusHistory: Schema.Attribute.JSON;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    type: Schema.Attribute.Enumeration<
      [
        'meeting_room',
        'classroom',
        'coworking',
        'office',
        'lab',
        'workshop',
        'other',
      ]
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTagTag extends Struct.CollectionTypeSchema {
  collectionName: 'tag';
  info: {
    collectionName: 'tags';
    description: 'Tags for classification and search';
    displayName: 'Tag';
    pluralName: 'tags';
    singularName: 'tag';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    category: Schema.Attribute.Enumeration<
      ['general', 'technical', 'administrative', 'educational', 'other']
    > &
      Schema.Attribute.DefaultTo<'general'>;
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#cccccc'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::tag.tag'> &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiToolTool extends Struct.CollectionTypeSchema {
  collectionName: 'tool';
  info: {
    collectionName: 'tools';
    description: 'Herramientas disponibles';
    displayName: 'Tool';
    pluralName: 'tools';
    singularName: 'tool';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    area: Schema.Attribute.Relation<'manyToOne', 'api::area.area'>;
    assetInfo: Schema.Attribute.Component<'asset.info', false>;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    compatibleEquipment: Schema.Attribute.Relation<
      'manyToMany',
      'api::equipment.equipment'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    internalCode: Schema.Attribute.String &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 100;
        minLength: 2;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::tool.tool'> &
      Schema.Attribute.Private;
    location: Schema.Attribute.Component<'location.geo', false>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 50;
        minLength: 2;
      }>;
    publishedAt: Schema.Attribute.DateTime;
    requiredTraining: Schema.Attribute.Relation<
      'manyToMany',
      'api::training.training'
    >;
    tags: Schema.Attribute.Relation<'manyToMany', 'api::tag.tag'>;
    toolType: Schema.Attribute.Enumeration<
      [
        'hand_tool',
        'measuring',
        'cutting',
        'fastening',
        'safety',
        'electrical',
        'pneumatic',
        'other',
      ]
    > &
      Schema.Attribute.DefaultTo<'hand_tool'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTopicTopic extends Struct.CollectionTypeSchema {
  collectionName: 'topic';
  info: {
    collectionName: 'topics';
    description: 'Temas generales para categorizar recursos';
    displayName: 'Topic';
    pluralName: 'topics';
    singularName: 'topic';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#3366cc'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::topic.topic'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    resources: Schema.Attribute.Relation<'oneToMany', 'api::resource.resource'>;
    slug: Schema.Attribute.UID<'name'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTrainingTraining extends Struct.CollectionTypeSchema {
  collectionName: 'training';
  info: {
    collectionName: 'trainings';
    description: 'Formaciones y cursos para desarrollar habilidades';
    displayName: 'Training';
    pluralName: 'trainings';
    singularName: 'training';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deletedAt: Schema.Attribute.DateTime;
    description: Schema.Attribute.Text;
    difficulty: Schema.Attribute.Enumeration<
      ['beginner', 'intermediate', 'advanced', 'expert']
    > &
      Schema.Attribute.DefaultTo<'beginner'>;
    duration: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    instructor: Schema.Attribute.Relation<'manyToOne', 'api::member.member'>;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::training.training'
    > &
      Schema.Attribute.Private;
    materials: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    slug: Schema.Attribute.UID<'title'> & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    trainingSkills: Schema.Attribute.Relation<
      'oneToMany',
      'api::trainingskill.trainingskill'
    >;
    trainingType: Schema.Attribute.Enumeration<
      ['workshop', 'course', 'seminar', 'certification', 'tutorial', 'other']
    > &
      Schema.Attribute.DefaultTo<'workshop'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTrainingskillTrainingskill
  extends Struct.CollectionTypeSchema {
  collectionName: 'trainingskill';
  info: {
    collectionName: 'trainingskills';
    description: 'Habilidades desarrolladas en formaciones';
    displayName: 'Training Skill';
    pluralName: 'trainingskills';
    singularName: 'trainingskill';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    isPrimary: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::trainingskill.trainingskill'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    publishedAt: Schema.Attribute.DateTime;
    skill: Schema.Attribute.Relation<'manyToOne', 'api::skill.skill'>;
    targetLevel: Schema.Attribute.Relation<
      'manyToOne',
      'api::skilllevel.skilllevel'
    >;
    training: Schema.Attribute.Relation<'manyToOne', 'api::training.training'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTransactionTransaction extends Struct.CollectionTypeSchema {
  collectionName: 'transaction';
  info: {
    collectionName: 'transactions';
    description: 'Transacciones procesadas por pasarelas de pago';
    displayName: 'Transaction';
    pluralName: 'transactions';
    singularName: 'transaction';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    amount: Schema.Attribute.Decimal &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    audit: Schema.Attribute.Component<'audit.tracking', false>;
    authorizationCode: Schema.Attribute.String;
    cardLast4: Schema.Attribute.String;
    cardType: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    currency: Schema.Attribute.String & Schema.Attribute.DefaultTo<'EUR'>;
    errorMessage: Schema.Attribute.Text;
    gatewayResponse: Schema.Attribute.JSON;
    gatewayTransactionId: Schema.Attribute.String;
    ipAddress: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::transaction.transaction'
    > &
      Schema.Attribute.Private;
    metadata: Schema.Attribute.Component<'common.metadata', true>;
    payment: Schema.Attribute.Relation<'manyToOne', 'api::payment.payment'>;
    paymentgateway: Schema.Attribute.Relation<
      'manyToOne',
      'api::paymentgateway.paymentgateway'
    >;
    paymentMethod: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    refundedAt: Schema.Attribute.DateTime;
    refundReason: Schema.Attribute.Text;
    timestamp: Schema.Attribute.DateTime & Schema.Attribute.Required;
    transactionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    transactionStatus: Schema.Attribute.Enumeration<
      ['pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userAgent: Schema.Attribute.String;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about.about': ApiAboutAbout;
      'api::accesslog.accesslog': ApiAccesslogAccesslog;
      'api::area.area': ApiAreaArea;
      'api::areaskill.areaskill': ApiAreaskillAreaskill;
      'api::attendance.attendance': ApiAttendanceAttendance;
      'api::collaborationagreement.collaborationagreement': ApiCollaborationagreementCollaborationagreement;
      'api::collaborationmatch.collaborationmatch': ApiCollaborationmatchCollaborationmatch;
      'api::collaborationoffer.collaborationoffer': ApiCollaborationofferCollaborationoffer;
      'api::collaborationrequest.collaborationrequest': ApiCollaborationrequestCollaborationrequest;
      'api::consumable.consumable': ApiConsumableConsumable;
      'api::consumption.consumption': ApiConsumptionConsumption;
      'api::discount.discount': ApiDiscountDiscount;
      'api::equipment.equipment': ApiEquipmentEquipment;
      'api::equipmentskill.equipmentskill': ApiEquipmentskillEquipmentskill;
      'api::event.event': ApiEventEvent;
      'api::exchangesession.exchangesession': ApiExchangesessionExchangesession;
      'api::global.global': ApiGlobalGlobal;
      'api::invoice.invoice': ApiInvoiceInvoice;
      'api::invoiceitem.invoiceitem': ApiInvoiceitemInvoiceitem;
      'api::member.member': ApiMemberMember;
      'api::membership.membership': ApiMembershipMembership;
      'api::membershipperiod.membershipperiod': ApiMembershipperiodMembershipperiod;
      'api::membershipsubscription.membershipsubscription': ApiMembershipsubscriptionMembershipsubscription;
      'api::memberskill.memberskill': ApiMemberskillMemberskill;
      'api::mentorship.mentorship': ApiMentorshipMentorship;
      'api::mentorshipsession.mentorshipsession': ApiMentorshipsessionMentorshipsession;
      'api::payment.payment': ApiPaymentPayment;
      'api::paymentgateway.paymentgateway': ApiPaymentgatewayPaymentgateway;
      'api::paymentitem.paymentitem': ApiPaymentitemPaymentitem;
      'api::paymentmethod.paymentmethod': ApiPaymentmethodPaymentmethod;
      'api::paymentplan.paymentplan': ApiPaymentplanPaymentplan;
      'api::project.project': ApiProjectProject;
      'api::projectneed.projectneed': ApiProjectneedProjectneed;
      'api::reservation.reservation': ApiReservationReservation;
      'api::resource.resource': ApiResourceResource;
      'api::skill.skill': ApiSkillSkill;
      'api::skillcategory.skillcategory': ApiSkillcategorySkillcategory;
      'api::skillendorsement.skillendorsement': ApiSkillendorsementSkillendorsement;
      'api::skillexchange.skillexchange': ApiSkillexchangeSkillexchange;
      'api::skilllevel.skilllevel': ApiSkilllevelSkilllevel;
      'api::skillverification.skillverification': ApiSkillverificationSkillverification;
      'api::space.space': ApiSpaceSpace;
      'api::tag.tag': ApiTagTag;
      'api::tool.tool': ApiToolTool;
      'api::topic.topic': ApiTopicTopic;
      'api::training.training': ApiTrainingTraining;
      'api::trainingskill.trainingskill': ApiTrainingskillTrainingskill;
      'api::transaction.transaction': ApiTransactionTransaction;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
