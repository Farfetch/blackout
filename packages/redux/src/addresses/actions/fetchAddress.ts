import { fetchAddressFactory } from './factories';
import { getAddress } from '@farfetch/blackout-client/addresses';

/**
 * Gets the details of the address with the specified 'addressId'.
 */

export default fetchAddressFactory(getAddress);
