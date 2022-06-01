import { fetchDefaultContactAddressFactory } from './factories';
import { getDefaultContactAddress } from '@farfetch/blackout-client/addresses';

/**
 * Responsible for obtaining the default contact address of the user.
 */

export default fetchDefaultContactAddressFactory(getDefaultContactAddress);
