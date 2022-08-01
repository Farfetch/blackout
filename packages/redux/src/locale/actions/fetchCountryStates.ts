import { fetchCountryStatesFactory } from './factories';
import { getCountryStates } from '@farfetch/blackout-client';

/**
 * Fetch all states from a specific country.
 *
 * @param getCountryStates - Get states client.
 */
export default fetchCountryStatesFactory(getCountryStates);
