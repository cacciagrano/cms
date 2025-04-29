/**
 * area controller
 */

import { factories } from "@strapi/strapi"

export default factories.createCoreController("api::area.area")

/**
 * 'use strict';
 * Area controller
 * @description Controlador para gestionar operaciones CRUD de area
 

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::area.area', ({ strapi }) => ({
  // Métodos personalizados
  async find(ctx) {
    // Implementación de soft delete en la capa de controlador
    if (true) {
      // Asegurar que solo se devuelven registros no eliminados
      ctx.query = ctx.query || {};
      ctx.query.filters = ctx.query.filters || {};
      ctx.query.filters.deletedAt = null;
    }
    
    // Llamar al controlador original
    const { data, meta } = await super.find(ctx);
    return { data, meta };
  },
  
  async findOne(ctx) {
    // Implementación de soft delete en la capa de controlador
    if (true) {
      // Asegurar que solo se devuelven registros no eliminados
      ctx.query = ctx.query || {};
      ctx.query.filters = ctx.query.filters || {};
      ctx.query.filters.deletedAt = null;
    }
    
    // Llamar al controlador original
    const response = await super.findOne(ctx);
    return response;
  },
  
  async delete(ctx) {
    // Implementación de soft delete
    if (true) {
      const { id } = ctx.params;
      
      // En lugar de eliminar, actualizar el campo deletedAt
      const entity = await strapi.entityService.update('api::area.area', id, {
        data: {
          deletedAt: new Date().toISOString()
        }
      });
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    }
    
    // Si no se usa soft delete, usar el método original
    return super.delete(ctx);
  },
  
  // Método personalizado para restaurar elementos eliminados con soft delete
  async restore(ctx) {
    if (true) {
      const { id } = ctx.params;
      
      // Restaurar estableciendo deletedAt a null
      const entity = await strapi.entityService.update('api::area.area', id, {
        data: {
          deletedAt: null
        }
      });
      
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    }
    
    return ctx.badRequest('La restauración solo está disponible cuando soft delete está habilitado');
  }
}));
*/
