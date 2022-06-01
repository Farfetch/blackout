import { fetchAddressSchemaFactory } from './factories';
import { getSchema } from '@farfetch/blackout-client/addresses';

/**
 * Obtains the address schema for a country specified with 'id'.
 */

export default fetchAddressSchemaFactory(getSchema);
