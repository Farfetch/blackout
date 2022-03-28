import { fetchPersonalIdsFactory } from './factories';
import { getPersonalIds } from '@farfetch/blackout-client/users';

/**
 * Fetch all personal ids.
 *
 * @memberof module:users/actions
 *
 * @function fetchPersonalIds
 *
 * @type {FetchPersonalIdsThunkFactory}
 */
export default fetchPersonalIdsFactory(getPersonalIds);
