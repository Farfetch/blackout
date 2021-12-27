import { fetchUserAttributesFactory } from './factories';
import { getUserAttributes } from '@farfetch/blackout-client/users';

/**
 * Fetch all user attributes with given id.
 *
 * @memberof module:users/actions
 *
 * @function fetchUserAttributes
 *
 * @type {FetchUserAttributesThunkFactory}
 */
export default fetchUserAttributesFactory(getUserAttributes);
