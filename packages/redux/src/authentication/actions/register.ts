import { postRegister } from '@farfetch/blackout-client/authentication';
import { registerFactory } from './factories';

/**
 * Performs the register operation for a new user.
 *
 * @memberof module:authentication/actions
 *
 * @function register
 *
 * @type {RegisterThunkFactory}
 */
export default registerFactory(postRegister);
