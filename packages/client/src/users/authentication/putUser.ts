import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { PutUser } from './types';
/**
 * Method responsible for update user's data.
 *
 * @param userId     - User identifier.
 * @param data   - User data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const putUser: PutUser = (userId, data, config) =>
  client
    .put(join('/account/v1/users', userId), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putUser;
