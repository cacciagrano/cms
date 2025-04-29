/**
 * attendance router
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreRouter("api::attendance.attendance")

/**
 * 'use strict';
 * Attendance router
 * @description Rutas para gestionar operaciones CRUD de attendance

const { createCoreRouter } = require('@strapi/strapi').factories;

// Crear router base
const defaultRouter = createCoreRouter('api::attendance.attendance');

// Rutas personalizadas
const customRoutes = true ? [
  {
    method: 'PUT',
    path: '/attendances/:id/restore',
    handler: 'attendance.restore',
    config: {
      description: 'Restaurar un attendance eliminado con soft delete',
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
