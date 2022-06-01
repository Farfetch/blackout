import client, { adaptError } from '../helpers/client';
import type { PostPasswordRecover } from './types';

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
    .post('/account/v1/users/passwordrecover', data, config)
    .catch(error => {
      throw adaptError(error);
    });

export default postPasswordRecover;
