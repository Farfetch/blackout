import { deleteUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { removeUserDefaultBillingAddressFactory } from './factories/index.js';

/**
 * Responsible for deleting the users default billing address.
 */

export default removeUserDefaultBillingAddressFactory(
  deleteUserDefaultBillingAddress,
);
