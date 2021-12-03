import { createAddressFactory } from './factories';
import { postAddress } from '@farfetch/blackout-client/addresses';

/**
 * Responsible for creating an address for the current user.
 *
 * @memberof module:addresses/actions
 *
 * @name createAddress
 *
 * @type {CreateAddressThunkFactory}
 */

export default createAddressFactory(postAddress);
