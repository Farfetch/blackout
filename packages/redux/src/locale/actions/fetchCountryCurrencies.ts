import { fetchCountryCurrenciesFactory } from './factories';
import { getCountryCurrencies } from '@farfetch/blackout-client/locale';

/**
 * @callback FetchCurrenciesThunkFactory
 *
 * @alias FetchCurrenciesThunkFactory
 * @memberof module:locale/actions
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the currencies related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {FetchCurrenciesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all currencies from a specific country.
 *
 * @name fetchCurrencies
 * @memberof module:locale/actions
 *
 * @type {FetchCurrenciesThunkFactory}
 * @param {Function} getCountryCurrencies - Get currencies client.
 */

export default fetchCountryCurrenciesFactory(getCountryCurrencies);
