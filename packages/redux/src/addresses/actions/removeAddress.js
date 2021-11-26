import { deleteAddress } from '@farfetch/blackout-client/addresses';
import { removeAddressFactory } from './factories';

/**
 * Responsible for removing the address with the specified 'addressId'.
 *
 * @memberof module:addresses/actions
 *
 * @name removeAddress
 *
 * @type {RemoveAddressThunkFactory}
 */

export default removeAddressFactory(deleteAddress);
