import { fetchCountryCurrenciesFactory } from './factories';
import { getCountryCurrencies } from '@farfetch/blackout-client';

/**
 * @param countryCode - Country identifier (ISO 3166-1 alpha-2) to find the currencies related.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Fetch all currencies from a specific country.
 *
 * @param getCountryCurrencies - Get currencies client.
 */

export default fetchCountryCurrenciesFactory(getCountryCurrencies);
