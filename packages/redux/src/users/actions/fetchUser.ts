import { fetchUserFactory } from './factories';
import { getUser } from '@farfetch/blackout-client/users';

/**
 * Fetch the user data.
 *
 * @memberof module:users/actions
 *
 * @function fetchUser
 *
 * @type {FetchUserThunkFactory}
 */
export default fetchUserFactory(getUser);
