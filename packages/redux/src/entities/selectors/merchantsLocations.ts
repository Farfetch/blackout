import { createSelector } from 'reselect';
import { getEntities, getEntityById } from './entity';
import type { MerchantLocationEntity } from '../../entities/types';
import type { StoreState } from '../../types';

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
export const getMerchantLocation = (
  state: StoreState,
  id: MerchantLocationEntity['id'],
): MerchantLocationEntity | undefined =>
  getEntityById(state, 'merchantsLocations', id);

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
export const getMerchantsLocations = (
  state: StoreState,
): Record<MerchantLocationEntity['id'], MerchantLocationEntity> | undefined =>
  getEntities(state, 'merchantsLocations');

/**
 * Returns all the merchants locations corresponding to the provided ids.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {Array} ids - Merchants locations ids.
 *
 * @returns {Array} Merchants locations of the provided ids.
 */
export const getMerchantsLocationsByIds = createSelector(
  [
    state => state,
    (state: StoreState, ids: Array<MerchantLocationEntity['id']>) => ids,
  ],
  (state, ids) => ids.map(id => getMerchantLocation(state, id)),
);
