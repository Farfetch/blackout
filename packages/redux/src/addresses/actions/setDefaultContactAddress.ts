import { putDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultContactAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default contact address.
 */

export default setDefaultContactAddressFactory(putDefaultContactAddress);
