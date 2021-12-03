import { deleteDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { removeDefaultContactAddressFactory } from './factories';

/**
 * Responsible for deleting the users default contact address.
 *
 * @memberof module:addresses/actions
 *
 * @name removeDefaultContactAddress
 *
 * @type {RemoveDefaultContactAddressThunkFactory}
 */

export default removeDefaultContactAddressFactory(deleteDefaultContactAddress);
