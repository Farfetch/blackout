import { logoutFactory } from './factories';
import { postLogout } from '@farfetch/blackout-client/authentication';

/**
 * Performs logout operation for the user.
 *
 * @memberof module:authentication/actions
 *
 * @function logout
 *
 * @type {LogoutThunkFactory}
 */
export default logoutFactory(postLogout);
