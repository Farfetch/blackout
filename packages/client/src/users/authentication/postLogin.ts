import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostLogin } from './types';

/**
 * Method responsible for logging in a user.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postLogin: PostLogin = (data, config?) =>
  client
    .post('/legacy/v1/account/login', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postLogin;
