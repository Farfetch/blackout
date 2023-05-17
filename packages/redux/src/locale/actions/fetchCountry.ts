import { fetchCountryFactory } from './factories/index.js';
import { getCountry } from '@farfetch/blackout-client';

/**
 * Fetch a specific country, by its country code.
 *
 * @param getCountry - Get country client.
 */
export default fetchCountryFactory(getCountry);
