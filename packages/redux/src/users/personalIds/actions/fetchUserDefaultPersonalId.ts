import { fetchUserDefaultPersonalIdFactory } from './factories';
import { getUserDefaultPersonalId } from '@farfetch/blackout-client';

/**
 * Fetch default personal id.
 */
export default fetchUserDefaultPersonalIdFactory(getUserDefaultPersonalId);
