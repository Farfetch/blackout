import { getEntity } from './entity';

/**
 * Returns a specific merchant by its id.
 *
 * @function getMerchant
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} merchantId - Merchant id.
 *
 * @returns {object} Merchant normalized.
 */
export const getMerchant = (state, merchantId) =>
  getEntity(state, 'merchants', merchantId);
