import { fetchUserAddressFactory } from './factories/index.js';
import { getUserAddress } from '@farfetch/blackout-client';

/**
 * Gets the details of the address with the specified 'addressId'.
 */
export default fetchUserAddressFactory(getUserAddress);
