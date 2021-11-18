/**
 * @module merchantsLocations/selectors
 * @category Merchants locations
 * @subcategory Selectors
 */
import { getError, getIsLoading } from './reducer';
import {
  getMerchantLocation as getMerchantLocationById,
  getMerchantsLocations as getMerchantsLocationsFromEntities,
} from '../../entities/redux/selectors';

/**
 * Returns the loading merchants locations status.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} If merchants locations are loading or not.
 */
export const areMerchantsLocationsLoading = state =>
  getIsLoading(state.merchantsLocations);

/**
 * Returns the error of the merchants locations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} The merchants locations error.
 */
export const getMerchantsLocationsError = state =>
  getError(state.merchantsLocations);

/**
 * Retrieves all fetched merchant locations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} All merchant locations fetched.
 */
export const getAllMerchantsLocations = state =>
  Object.values(getMerchantsLocationsFromEntities(state) || {});

/**
 * Retrieves a merchant location by its ids.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} id - Merchant location id.
 *
 * @returns {object} Merchant location of the provided id.
 */
export const getMerchantLocation = (state, id) =>
  getMerchantLocationById(state, id);

/**
 * Retrieves merchants locations from all the provided ids.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {Array} ids - Merchants locations ids.
 *
 * @returns {Array} Merchants locations of the provided ids.
 */
export const getMerchantsLocations = (state, ids) =>
  ids.map(id => getMerchantLocation(state, id));
