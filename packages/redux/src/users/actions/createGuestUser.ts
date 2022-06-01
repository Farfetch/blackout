import { createGuestUserFactory } from './factories';
import { postGuestUser } from '@farfetch/blackout-client/users';

/**
 * Creates a new guest user.
 */
export default createGuestUserFactory(postGuestUser);
