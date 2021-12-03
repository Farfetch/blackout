import { fetchAddressesFactory } from './factories';
import { getAddresses } from '@farfetch/blackout-client/addresses';

/**
 * Responsible for getting all the addresses of the current user.
 *
 * @memberof module:addresses/actions
 *
 * @name fetchAddresses
 *
 * @type {FetchAddressesThunkFactory}
 */

export default fetchAddressesFactory(getAddresses);
