import { fetchUserFactory } from './factories/index.js';
import { getUser } from '@farfetch/blackout-client';

/**
 * Fetch the user data.
 */
export default fetchUserFactory(getUser);
