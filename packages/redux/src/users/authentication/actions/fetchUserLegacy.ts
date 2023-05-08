import { fetchUserLegacyFactory } from './factories/index.js';
import { getUserLegacy } from '@farfetch/blackout-client';

/**
 * Legacy method to fetch user data.
 */
export default fetchUserLegacyFactory(getUserLegacy);
