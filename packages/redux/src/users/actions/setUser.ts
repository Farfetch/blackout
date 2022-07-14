import { putUser } from '@farfetch/blackout-client';
import { setUserFactory } from './factories';

/**
 * Updates the user data.
 */
export const setUser = setUserFactory(putUser);
