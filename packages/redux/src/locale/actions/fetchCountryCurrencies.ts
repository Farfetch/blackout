import { fetchCountryCurrenciesFactory } from './factories/index.js';
import { getCountryCurrencies } from '@farfetch/blackout-client';

/**
 * Fetch all currencies from a specific country.
 *
 * @param getCountryCurrencies - Get currencies client.
 */
export default fetchCountryCurrenciesFactory(getCountryCurrencies);
