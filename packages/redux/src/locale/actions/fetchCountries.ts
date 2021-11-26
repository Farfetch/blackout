import { fetchCountriesFactory } from './factories';
import { getCountries } from '@farfetch/blackout-client/locale';

/**
 * @typedef {object} FetchCountriesQuery
 * @property {number} [pageIndex=1] - The current page.
 * @property {number} [pageSize=15] - Size of each page, as a number.
 */

/**
 * @callback FetchCountriesThunkFactory
 *
 * @alias FetchCountriesThunkFactory
 * @memberof module:locale/actions
 *
 * @param {FetchCountriesQuery} [query] - Query parameters to apply to the request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {FetchCountriesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all countries.
 *
 * @name fetchCountries
 * @memberof module:locale/actions
 *
 * @type {FetchCountriesThunkFactory}
 * @param {Function} getCountries - Get countries client.
 */

export default fetchCountriesFactory(getCountries);
