import { fetchUserPersonalIdsFactory } from './factories/index.js';
import { getUserPersonalIds } from '@farfetch/blackout-client';

/**
 * Fetch all personal ids.
 */
export default fetchUserPersonalIdsFactory(getUserPersonalIds);
