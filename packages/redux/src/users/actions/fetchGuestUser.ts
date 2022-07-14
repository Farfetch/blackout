import { fetchGuestUserFactory } from './factories';
import { getGuestUser } from '@farfetch/blackout-client';

/**
 * Fetch the guest user details with the specified id.
 */
export const fetchGuestUser = fetchGuestUserFactory(getGuestUser);
