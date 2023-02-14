import { fetchUserReturnsFactory } from './factories';
import { getUserReturns } from '@farfetch/blackout-client';

/**
 * Fetches all returns for a user.
 */
export default fetchUserReturnsFactory(getUserReturns);
