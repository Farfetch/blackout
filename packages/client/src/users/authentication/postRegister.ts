import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostRegister } from './types';

/**
 * Method responsible for registering a user.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postRegister: PostRegister = (data, config?) =>
  client
    .post('/account/v1/users', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postRegister;
