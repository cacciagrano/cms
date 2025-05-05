/**
 * membershipsubscription service
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreService("api::membershipsubscription.membershipsubscription")

/**
 * 'use strict';
 * MembershipSubscription service
 * @description Servicios para gestionar operaciones de membershipsubscription
 */

const { createCoreService } = require("@strapi/strapi").factories

module.exports = createCoreService("api::membershipsubscription.membershipsubscription", ({ strapi }) => ({
  // Métodos personalizados para el servicio

  // Método para obtener todos los registros incluyendo los eliminados con soft delete
  async findWithDeleted(params) {
    // Omitir el filtro de deletedAt
    const { filters, ...restParams } = params
    const { deletedAt, ...restFilters } = filters || {}

    return strapi.entityService.findMany("api::membershipsubscription.membershipsubscription", {
      ...restParams,
      filters: restFilters,
    })
  },

  // Método para eliminar permanentemente (útil cuando se usa soft delete)
  async deletePermanently(id) {
    // Usar el método de eliminación de bajo nivel para saltarse el soft delete
    return strapi.db.query("api::membershipsubscription.membershipsubscription").delete({
      where: { id },
    })
  },

  // MEJORA 3: Método para rastrear cambios de estado
  async updateStatus(id, newStatus, reason = "") {
    if (true) {
      // Obtener el registro actual
      const entity = await strapi.entityService.findOne("api::membershipsubscription.membershipsubscription", id)

      if (!entity) {
        throw new Error("Registro no encontrado")
      }

      // Preparar el historial de estados
      const statusHistory = entity.statusHistory || []

      // Añadir el estado actual al historial
      if (entity.subscriptionStatus && entity.subscriptionStatus !== newStatus) {
        statusHistory.push({
          from: entity.subscriptionStatus,
          to: newStatus,
          date: new Date().toISOString(),
          reason,
        })
      }

      // Actualizar el registro
      return strapi.entityService.update("api::membershipsubscription.membershipsubscription", id, {
        data: {
          subscriptionStatus: newStatus,
          previousStatus: entity.subscriptionStatus,
          statusChangedAt: new Date().toISOString(),
          statusHistory,
        },
      })
    } else {
      // Si no está habilitado el seguimiento mejorado, solo actualizar el estado
      return strapi.entityService.update("api::membershipsubscription.membershipsubscription", id, {
        data: {
          subscriptionStatus: newStatus,
        },
      })
    }
  },
}))
