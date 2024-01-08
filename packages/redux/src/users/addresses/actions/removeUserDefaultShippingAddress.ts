import { deleteUserDefaultShippingAddress } from '@farfetch/blackout-client';
import { removeUserDefaultShippingAddressFactory } from './factories/index.js';

/**
 * Responsible for deleting the users default shipping address.
 */

export default removeUserDefaultShippingAddressFactory(
  deleteUserDefaultShippingAddress,
);
