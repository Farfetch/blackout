import { putUserDefaultContactAddress } from '@farfetch/blackout-client';
import { setUserDefaultContactAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default contact address.
 */

export const setUserDefaultContactAddress = setUserDefaultContactAddressFactory(
  putUserDefaultContactAddress,
);
