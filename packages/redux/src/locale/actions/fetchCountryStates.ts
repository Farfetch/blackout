import { fetchCountryStatesFactory } from './factories';
import { getCountryStates } from '@farfetch/blackout-client/locale';

/**
 * @callback FetchCountryStatesThunkFactory
 *
 * @alias FetchCountryStatesThunkFactory
 * @memberof module:locale/actions
 *
 * @param {string} countryCode - Country identifier (ISO 3166-1 alpha-2) to find the states related.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {FetchCountryStatesThunkFactory} Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all states from a specific country.
 *
 * @name fetchStates
 * @memberof module:locale/actions
 *
 * @type {FetchCountryStatesThunkFactory}
 * @param {Function} getCountryStates - Get states client.
 */

export default fetchCountryStatesFactory(getCountryStates);
