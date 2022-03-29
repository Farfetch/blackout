import { fetchPersonalIdFactory } from './factories';
import { getPersonalId } from '@farfetch/blackout-client/users';

/**
 * Fetch a specific personal id.
 */
export default fetchPersonalIdFactory(getPersonalId);
