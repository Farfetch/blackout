import { createAddressFactory } from './factories';
import { postAddress } from '@farfetch/blackout-client/addresses';

/**
 * Responsible for creating an address for the current user.
 */

export default createAddressFactory(postAddress);
