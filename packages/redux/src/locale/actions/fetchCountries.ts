import { fetchCountriesFactory } from './factories';
import { getCountries } from '@farfetch/blackout-client';

/**
 * @param query  - Query parameters to apply to the request.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all countries.
 *
 * @param getCountries - Get countries client.
 */

export default fetchCountriesFactory(getCountries);
