import { fetchGuestUserFactory } from './factories';
import { getGuestUser } from '@farfetch/blackout-client/users';

/**
 * Fetch the guest user details with the specified id.
 *
 * @memberof module:users/actions
 *
 * @function fetchGuestUser
 *
 * @type {FetchGuestUserThunkFactory}
 */
export default fetchGuestUserFactory(getGuestUser);
