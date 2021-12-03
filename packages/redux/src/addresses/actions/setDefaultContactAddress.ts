import { putDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { setDefaultContactAddressFactory } from './factories';

/**
 * Sets the address specified with 'addressId', as the default contact address.
 *
 * @memberof module:addresses/actions
 *
 * @name setDefaultContactAddress
 *
 * @type {SetDefaultContactAddressThunkFactory}
 */

export default setDefaultContactAddressFactory(putDefaultContactAddress);
