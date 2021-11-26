import { fetchCountryCitiesFactory } from './factories';
import { getCountryCities } from '@farfetch/blackout-client/locale';

/**
 * @callback FetchCountryCitiesThunkFactory
 *
 * @alias FetchCitiesThunkFactory
 * @memberof module:locale/actions
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the cities related.
 * @param {number} stateId - State identifier to find the cities related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {FetchCountryCitiesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all cities from an specific country and state.
 *
 * @name fetchCountryCities
 * @memberof module:locale/actions
 *
 * @type {FetchCountryCitiesThunkFactory}
 * @param {Function} getCountryCities - Get product recommendations client.
 */

export default fetchCountryCitiesFactory(getCountryCities);
