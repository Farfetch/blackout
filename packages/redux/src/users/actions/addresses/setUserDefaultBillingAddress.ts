import { putUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { setUserDefaultBillingAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default billing address.
 */

export const setUserDefaultBillingAddress = setUserDefaultBillingAddressFactory(
  putUserDefaultBillingAddress,
);
