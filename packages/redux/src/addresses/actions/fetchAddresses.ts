import { fetchAddressesFactory } from './factories';
import { getAddresses } from '@farfetch/blackout-client/addresses';

/**
 * Responsible for getting all the addresses of the current user.
 */

export default fetchAddressesFactory(getAddresses);
