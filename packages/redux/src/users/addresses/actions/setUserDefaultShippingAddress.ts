import { putUserDefaultShippingAddress } from '@farfetch/blackout-client';
import { setUserDefaultShippingAddressFactory } from './factories/index.js';

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 */

export default setUserDefaultShippingAddressFactory(
  putUserDefaultShippingAddress,
);
