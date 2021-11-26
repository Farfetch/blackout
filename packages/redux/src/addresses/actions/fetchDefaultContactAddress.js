import { fetchDefaultContactAddressFactory } from './factories';
import { getDefaultContactAddress } from '@farfetch/blackout-client/addresses';

/**
 * Responsible for obtaining the default contact address of the user.
 *
 * @memberof module:addresses/actions
 *
 * @name fetchDefaultContactAddress
 *
 * @type {FetchDefaultContactAddressThunkFactory}
 */

export default fetchDefaultContactAddressFactory(getDefaultContactAddress);
