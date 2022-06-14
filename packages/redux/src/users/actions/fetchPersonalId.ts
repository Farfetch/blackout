import { fetchPersonalIdFactory } from './factories';
import { getUserPersonalId } from '@farfetch/blackout-client/users';

/**
 * Fetch a specific personal id.
 */
export default fetchPersonalIdFactory(getUserPersonalId);
