import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostPasswordRecover } from './types/index.js';

/**
 * Method responsible for sending an email for the user to reset the password.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPasswordRecover: PostPasswordRecover = (data, config?) =>
  client
    .post('/legacy/v1/account/password/retrieve', data, config)
    .catch(error => {
      throw adaptError(error);
    });

export default postPasswordRecover;
