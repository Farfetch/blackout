import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostPasswordReset } from './types';

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
