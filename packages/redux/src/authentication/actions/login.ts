import { loginFactory } from './factories';
import { postLogin } from '@farfetch/blackout-client/authentication';

/**
 * Performs login operation for the user.
 *
 * @memberof module:authentication/actions
 *
 * @function login
 *
 * @type {LoginThunkFactory}
 */
export default loginFactory(postLogin);
