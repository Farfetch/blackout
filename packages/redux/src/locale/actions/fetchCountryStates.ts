import { fetchCountryStatesFactory } from './factories';
import { getCountryStates } from '@farfetch/blackout-client';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the states related.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all states from a specific country.
 *
 * @param getCountryStates - Get states client.
 */

export default fetchCountryStatesFactory(getCountryStates);
