import { fetchUserClosetsFactory } from './factories/index.js';
import { getUserClosets } from '@farfetch/blackout-client';

/**
 * Fetch user closets.
 */
export default fetchUserClosetsFactory(getUserClosets);
