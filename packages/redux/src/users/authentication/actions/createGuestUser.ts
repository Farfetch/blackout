import { createGuestUserFactory } from './factories/index.js';
import { postGuestUser } from '@farfetch/blackout-client';

/**
 * Creates a new guest user.
 */
export default createGuestUserFactory(postGuestUser);
