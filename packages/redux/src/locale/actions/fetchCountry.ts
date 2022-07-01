import { fetchCountryFactory } from './factories';
import { getCountry } from '@farfetch/blackout-client';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2).
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch a specific country, by its country code.
 *
 * @param getCountry - Get country client.
 */

export default fetchCountryFactory(getCountry);
