import { putUser } from '@farfetch/blackout-client/users';
import { setUserFactory } from './factories';

/**
 * Updates the user data.
 *
 * @memberof module:users/actions
 *
 * @function setUser
 *
 * @type {SetUserThunkFactory}
 */
export default setUserFactory(putUser);
