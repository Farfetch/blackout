import { fetchCountryFactory } from './factories';
import { getCountry } from '@farfetch/blackout-client/locale';

/**
 * @callback FetchCountryThunkFactory
 *
 * @alias FetchCountryThunkFactory
 * @memberof module:locale/actions
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2).
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {FetchCountryThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a specific country, by its country code.
 *
 * @name fetchCountry
 * @memberof module:locale/actions
 *
 * @type {FetchCountryThunkFactory}
 * @param {Function} getCountry - Get country client.
 */

export default fetchCountryFactory(getCountry);
