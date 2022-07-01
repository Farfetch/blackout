import { deleteUserAddress } from '@farfetch/blackout-client';
import { removeUserAddressFactory } from './factories';

/**
 * Responsible for removing the address with the specified 'addressId'.
 */
export const removeUserAddress = removeUserAddressFactory(deleteUserAddress);
