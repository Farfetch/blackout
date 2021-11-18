/**
 * @module addresses/selectors
 * @category Addresses
 * @subcategory Selectors
 */

import {
  getAddresses as addressesGetter,
  getAddress as addressGetter,
  getAddressSchema as addressSchemaGetter,
  getError as errorGetter,
  getDefaultAddressDetails,
  getIsLoading,
  getPredictionDetails as predictionsDetailsGetter,
  getPredictions as predictionsGetter,
  getResult as Result,
} from './reducer';
import { getEntity } from '../../entities/redux/selectors';

/**
 * Returns the result of the addresses area.
 *
 * @function
 *
 * @param {object} state        - Application state.
 *
 * @returns {Array} Array containing the loaded addresses id.
 */
export const getResult = state => Result(state.addresses);

/**
 * Returns the error of the addresses area.
 *
 * @function
 *
 * @param {object} state        - Application state.
 *
 * @returns {object} Address information object.
 */
export const getError = state => errorGetter(state.addresses);

/**
 * Returns the loading status of the addresses area.
 *
 * @function
 *
 * @param {object} state        - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isAddressesLoading = state => getIsLoading(state.addresses);

/**
 * Returns the addresses entity that contains all user addresses.
 *
 * @function
 *
 * @param {object} state        - Application state.
 *
 * @returns {object} Object containing all the currently loaded addresses.
 */
export const getAddresses = state => getEntity(state, 'addresses');

/**
 * Returns a specific address with the specified 'addressId'.
 *
 * @function
 *
 * @param {object} state        - Application state.
 * @param {string} addressId    - Address id.
 *
 * @returns {object} Address information object.
 */
export const getAddress = (state, addressId) =>
  getEntity(state, 'addresses', addressId);

/**
 * Returns a list with all addresses schemas in the application state.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} - Schemas with the correspondent Iso code or
 *                     CountryId (deprecated) as the key.
 *
 */
export const getSchemas = state => getEntity(state, 'addressSchema');

/**
 * Returns a specific schema with the specified 'Iso code'.
 *
 * @function
 *
 * @param {object} state     - Application state.
 * @param {string} isoCode   - Iso code or CountryId (deprecated).
 *
 * @returns {object} Schema information object.
 */
export const getSchema = (state, isoCode) =>
  getEntity(state, 'addressSchema', isoCode);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Predictions details.
 */
export const getPredictions = state =>
  predictionsGetter(state.addresses).result;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Error details.
 */
export const getPredictionsError = state =>
  predictionsGetter(state.addresses).error;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isPredictionsLoading = state =>
  predictionsGetter(state.addresses).isLoading;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Predictions details.
 */
export const getPredictionDetails = state =>
  predictionsDetailsGetter(state.addresses).result;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Error details.
 */
export const getPredictionDetailsError = state =>
  predictionsDetailsGetter(state.addresses).error;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isPredictionDetailsLoading = state =>
  predictionsDetailsGetter(state.addresses).isLoading;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isAddressesListLoading = state =>
  addressesGetter(state.addresses).isLoading;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Error details.
 */
export const getAddressesListError = state =>
  addressesGetter(state.addresses).error;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} addressId - Address identifier.
 *
 * @returns {boolean} Loader status.
 */
export const isAddressLoading = (state, addressId) =>
  addressGetter(state.addresses).isLoading[addressId];

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} addressId - Address identifier.
 *
 *
 * @returns {object} Error details.
 */
export const getAddressError = (state, addressId) =>
  addressGetter(state.addresses).error[addressId];

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isAddressSchemaLoading = state =>
  addressSchemaGetter(state.addresses).isLoading;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Error details.
 */
export const getAddressSchemaError = state =>
  addressSchemaGetter(state.addresses).error;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loader status.
 */
export const isDefaultAddressDetailsLoading = state =>
  getDefaultAddressDetails(state.addresses).isLoading;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Error details.
 */
export const getDefaultAddressDetailsError = state =>
  getDefaultAddressDetails(state.addresses).error;

/**
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Address details result.
 */
export const getDefaultAddressDetailsResult = state =>
  getDefaultAddressDetails(state.addresses).result;
