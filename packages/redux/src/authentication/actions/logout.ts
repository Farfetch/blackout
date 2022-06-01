import { logoutFactory } from './factories';
import { postLogout } from '@farfetch/blackout-client/authentication';

/**
 * Performs logout operation for the user.
 */
export default logoutFactory(postLogout);
