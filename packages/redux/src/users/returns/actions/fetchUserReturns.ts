import { fetchUserReturnsFactory } from './factories/index.js';
import { getUserReturns } from '@farfetch/blackout-client';

/**
 * Fetches all returns for a user.
 */
export default fetchUserReturnsFactory(getUserReturns);
