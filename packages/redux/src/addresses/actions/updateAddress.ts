import { putAddress } from '@farfetch/blackout-client/addresses';
import { updateAddressFactory } from './factories';

/**
 * Updates the address information with the specified 'addressId'.
 *
 * @memberof module:addresses/actions
 *
 * @name updateAddress
 *
 * @type {UpdateAddressThunkFactory}
 */

export default updateAddressFactory(putAddress);
