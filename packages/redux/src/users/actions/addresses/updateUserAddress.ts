import { putUserAddress } from '@farfetch/blackout-client';
import { updateUserAddressFactory } from './factories';

/**
 * Updates the address information with the specified 'addressId'.
 */

export const updateUserAddress = updateUserAddressFactory(putUserAddress);
