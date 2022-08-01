import { fetchCountryCurrenciesFactory } from './factories';
import { getCountryCurrencies } from '@farfetch/blackout-client';

/**
 * Fetch all currencies from a specific country.
 *
 * @param getCountryCurrencies - Get currencies client.
 */
export default fetchCountryCurrenciesFactory(getCountryCurrencies);
