import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostPasswordChange } from './types/index.js';

/**
 * Method responsible for changing a user password.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postPasswordChange: PostPasswordChange = (data, config?) =>
  client
    .post(`/account/v1/users/${data.userId}/passwordchange`, data, config)
    .catch(error => {
      throw adaptError(error);
    });

export default postPasswordChange;
