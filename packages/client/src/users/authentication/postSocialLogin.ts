import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostSocialLogin } from './types/index.js';

/**
 * Method responsible for logging in a user with a social provider.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postSocialLogin: PostSocialLogin = (data, config?) =>
  client
    .post('/account/v1/oidc/login', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postSocialLogin;
