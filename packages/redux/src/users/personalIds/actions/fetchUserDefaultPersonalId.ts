import { fetchUserDefaultPersonalIdFactory } from './factories/index.js';
import { getUserDefaultPersonalId } from '@farfetch/blackout-client';

/**
 * Fetch default personal id.
 */
export default fetchUserDefaultPersonalIdFactory(getUserDefaultPersonalId);
