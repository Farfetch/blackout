import { fetchUserAttributeFactory } from './factories';
import { getUserAttribute } from '@farfetch/blackout-client/users';

/**
 * Fetch all user attribute with given id.
 *
 * @memberof module:users/actions
 *
 * @function fetchUserAttribute
 *
 * @type {FetchUserAttributeThunkFactory}
 */
export default fetchUserAttributeFactory(getUserAttribute);
