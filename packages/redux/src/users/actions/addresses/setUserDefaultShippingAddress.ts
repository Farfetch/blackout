import { putUserDefaultShippingAddress } from '@farfetch/blackout-client';
import { setUserDefaultShippingAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 */

export const setUserDefaultShippingAddress =
  setUserDefaultShippingAddressFactory(putUserDefaultShippingAddress);
