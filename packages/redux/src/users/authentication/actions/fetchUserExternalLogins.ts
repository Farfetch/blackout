import { fetchUserExternalLoginsFactory } from './factories/index.js';
import { getUserExternalLogins } from '@farfetch/blackout-client';

/**
 * Fetches the user external logins.
 */
export default fetchUserExternalLoginsFactory(getUserExternalLogins);
