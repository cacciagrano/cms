/**
 * area router
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreRouter("api::area.area")

/**
 * 'use strict';
 * Area router
 * @description Rutas para gestionar operaciones CRUD de area
 
const { createCoreRouter } = require('@strapi/strapi').factories;

// Crear router base
const defaultRouter = createCoreRouter('api::area.area');

// Rutas personalizadas
const customRoutes = true ? [
  {
    method: 'PUT',
    path: '/areas/:id/restore',
    handler: 'area.restore',
    config: {
      description: 'Restaurar un area eliminado con soft delete',
      policies: []
    }
  }
] : [];

// Exportar router con rutas personalizadas
module.exports = {
  routes: [
    ...defaultRouter.routes,
    ...customRoutes
  ]
};
*/
