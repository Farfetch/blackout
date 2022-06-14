import { fetchPersonalIdsFactory } from './factories';
import { getUserPersonalIds } from '@farfetch/blackout-client/users';

/**
 * Fetch all personal ids.
 */
export default fetchPersonalIdsFactory(getUserPersonalIds);
