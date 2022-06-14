import { fetchDefaultPersonalIdFactory } from './factories';
import { getUserDefaultPersonalId } from '@farfetch/blackout-client/users';

/**
 * Fetch default personal id.
 */
export default fetchDefaultPersonalIdFactory(getUserDefaultPersonalId);
