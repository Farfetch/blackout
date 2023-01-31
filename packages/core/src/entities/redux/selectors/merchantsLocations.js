import { getEntity } from './entity';

/**
 * Returns a specific merchant location by its id.
 *
 * @function getMerchantLocation
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {string} id - Merchant Location id.
 *
 * @returns {object} - Merchant location.
 */
export const getMerchantLocation = (state, id) =>
  getEntity(state, 'merchantsLocations', id);

/**
 * Returns all merchants locations from state.
 *
 * @function getMerchantsLocations
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Object with key values pairs representing merchant
 * location id and merchant location properties.
 */
export const getMerchantsLocations = state =>
  getEntity(state, 'merchantsLocations');
