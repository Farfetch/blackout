import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostPasswordReset } from './types/index.js';

/**
 * Resets the user password with the new password.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPasswordReset: PostPasswordReset = (data, config?) =>
  client.post('/account/v1/users/passwordreset', data, config).catch(error => {
    throw adaptError(error);
  });

export default postPasswordReset;
