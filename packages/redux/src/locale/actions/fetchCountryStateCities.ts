import { fetchCountryStateCitiesFactory } from './factories/index.js';
import { getCountryStateCities } from '@farfetch/blackout-client';

/**
 * Fetch all cities from an specific country and state.
 *
 * @param getCountryStateCities - Get cities client.
 */
export default fetchCountryStateCitiesFactory(getCountryStateCities);
