import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostUserLegacy } from './types/index.js';

/**
 * Legacy method responsible for registering a user.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postUser: PostUserLegacy = (data, config?) =>
  client
    .post('/legacy/v1/account/register', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postUser;
