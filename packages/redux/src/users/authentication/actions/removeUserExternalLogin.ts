import { deleteUserExternalLogin } from '@farfetch/blackout-client';
import { removeUserExternalLoginFactory } from './factories/index.js';

/**
 * Removes a user external login.
 */
export default removeUserExternalLoginFactory(deleteUserExternalLogin);
