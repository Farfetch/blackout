import { fetchPersonalIdsFactory } from './factories';
import { getPersonalIds } from '@farfetch/blackout-client/users';

/**
 * Fetch all personal ids.
 */
export default fetchPersonalIdsFactory(getPersonalIds);
