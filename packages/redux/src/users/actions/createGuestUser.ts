import { createGuestUserFactory } from './factories';
import { postGuestUser } from '@farfetch/blackout-client/users';

/**
 * Creates a new guest user.
 *
 * @memberof module:users/actions
 *
 * @function createGuestUser
 *
 * @type {CreateGuestUserThunkFactory}
 */
export default createGuestUserFactory(postGuestUser);
