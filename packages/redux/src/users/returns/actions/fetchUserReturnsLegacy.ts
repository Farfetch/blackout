import { fetchUserReturnsLegacyFactory } from './factories/index.js';
import { getUserReturnsLegacy } from '@farfetch/blackout-client';

/**
 * Fetches all returns for a user.
 */
export default fetchUserReturnsLegacyFactory(getUserReturnsLegacy);
