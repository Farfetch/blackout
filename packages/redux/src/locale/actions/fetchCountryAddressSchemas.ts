import { fetchCountryAddressSchemasFactory } from './factories/index.js';
import { getCountryAddressSchemas } from '@farfetch/blackout-client';

/**
 * Obtains the address schema for a country specified with 'id'.
 */
export default fetchCountryAddressSchemasFactory(getCountryAddressSchemas);
