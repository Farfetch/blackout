import { fetchUserDefaultContactAddressFactory } from './factories/index.js';
import { getUserDefaultContactAddress } from '@farfetch/blackout-client';

/**
 * Responsible for obtaining the default contact address of the user.
 */
export default fetchUserDefaultContactAddressFactory(
  getUserDefaultContactAddress,
);
