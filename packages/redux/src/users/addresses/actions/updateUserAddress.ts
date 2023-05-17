import { putUserAddress } from '@farfetch/blackout-client';
import { updateUserAddressFactory } from './factories/index.js';

/**
 * Updates the address information with the specified 'addressId'.
 */

export default updateUserAddressFactory(putUserAddress);
