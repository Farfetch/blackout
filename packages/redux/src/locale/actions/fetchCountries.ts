import { fetchCountriesFactory } from './factories';
import { getCountries } from '@farfetch/blackout-client';

/**
 * Fetch all countries.
 *
 * @param getCountries - Get countries client.
 */
export default fetchCountriesFactory(getCountries);
