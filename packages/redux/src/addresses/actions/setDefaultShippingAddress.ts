import { putDefaultShippingAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultShippingAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default shipping address.
 */

export default setDefaultShippingAddressFactory(putDefaultShippingAddress);
