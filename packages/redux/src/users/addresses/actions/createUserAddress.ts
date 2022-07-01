import { createUserAddressFactory } from './factories';
import { postUserAddress } from '@farfetch/blackout-client';

/**
 * Responsible for creating an address for the current user.
 */
export const createUserAddress = createUserAddressFactory(postUserAddress);
