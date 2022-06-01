import { putDefaultBillingAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultBillingAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default billing address.
 */

export default setDefaultBillingAddressFactory(putDefaultBillingAddress);
