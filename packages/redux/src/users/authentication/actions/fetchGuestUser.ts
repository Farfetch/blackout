import { fetchGuestUserFactory } from './factories/index.js';
import { getGuestUser } from '@farfetch/blackout-client';

/**
 * Fetch the guest user details with the specified id.
 */
export default fetchGuestUserFactory(getGuestUser);
