import { deleteUserDefaultContactAddress } from '@farfetch/blackout-client';
import { removeUserDefaultContactAddressFactory } from './factories/index.js';

/**
 * Responsible for deleting the users default contact address.
 */

export default removeUserDefaultContactAddressFactory(
  deleteUserDefaultContactAddress,
);
