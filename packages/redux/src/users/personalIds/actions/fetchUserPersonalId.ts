import { fetchUserPersonalIdFactory } from './factories/index.js';
import { getUserPersonalId } from '@farfetch/blackout-client';

/**
 * Fetch a specific personal id.
 */
export default fetchUserPersonalIdFactory(getUserPersonalId);
