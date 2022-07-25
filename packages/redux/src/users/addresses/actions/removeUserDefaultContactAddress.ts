import { deleteUserDefaultContactAddress } from '@farfetch/blackout-client';
import { removeUserDefaultContactAddressFactory } from './factories';

/**
 * Responsible for deleting the users default contact address.
 */

export default removeUserDefaultContactAddressFactory(
  deleteUserDefaultContactAddress,
);
