import { fetchUserAddressesFactory } from './factories';
import { getUserAddresses } from '@farfetch/blackout-client';

/**
 * Responsible for getting all the addresses of the current user.
 */
export const fetchUserAddresses = fetchUserAddressesFactory(getUserAddresses);
