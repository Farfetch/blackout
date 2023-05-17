import { putUserDefaultContactAddress } from '@farfetch/blackout-client';
import { setUserDefaultContactAddressFactory } from './factories/index.js';

/**
 * Sets the address specified with 'addressId', as the default contact address.
 */

export default setUserDefaultContactAddressFactory(
  putUserDefaultContactAddress,
);
