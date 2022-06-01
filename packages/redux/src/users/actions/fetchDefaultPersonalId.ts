import { fetchDefaultPersonalIdFactory } from './factories';
import { getDefaultPersonalId } from '@farfetch/blackout-client/users';

/**
 * Fetch default personal id.
 */
export default fetchDefaultPersonalIdFactory(getDefaultPersonalId);
