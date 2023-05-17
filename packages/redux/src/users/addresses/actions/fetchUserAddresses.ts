import { fetchUserAddressesFactory } from './factories/index.js';
import { getUserAddresses } from '@farfetch/blackout-client';

/**
 * Responsible for getting all the addresses of the current user.
 */
export default fetchUserAddressesFactory(getUserAddresses);
