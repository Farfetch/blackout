import { deleteUserAddress } from '@farfetch/blackout-client';
import { removeUserAddressFactory } from './factories/index.js';

/**
 * Responsible for removing the address with the specified 'addressId'.
 */
export default removeUserAddressFactory(deleteUserAddress);
