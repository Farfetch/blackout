import { createGuestUserFactory } from './factories';
import { postGuestUser } from '@farfetch/blackout-client';

/**
 * Creates a new guest user.
 */
export default createGuestUserFactory(postGuestUser);
