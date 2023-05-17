import { putUserDefaultBillingAddress } from '@farfetch/blackout-client';
import { setUserDefaultBillingAddressFactory } from './factories/index.js';

/**
 * Sets the address specified with 'addressId', as the default billing address.
 */

export default setUserDefaultBillingAddressFactory(
  putUserDefaultBillingAddress,
);
