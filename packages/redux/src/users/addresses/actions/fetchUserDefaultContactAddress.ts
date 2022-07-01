import { fetchUserDefaultContactAddressFactory } from './factories';
import { getUserDefaultContactAddress } from '@farfetch/blackout-client';

/**
 * Responsible for obtaining the default contact address of the user.
 */
export const fetchUserDefaultContactAddress =
  fetchUserDefaultContactAddressFactory(getUserDefaultContactAddress);
