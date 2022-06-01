import { deleteDefaultContactAddress } from '@farfetch/blackout-client/addresses';
import { removeDefaultContactAddressFactory } from './factories';

/**
 * Responsible for deleting the users default contact address.
 */

export default removeDefaultContactAddressFactory(deleteDefaultContactAddress);
