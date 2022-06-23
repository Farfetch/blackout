import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PutUser } from './types';
/**
 * Method responsible for update user's data.
 *
 * @param id     - User identifier.
 * @param data   - User data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const putUser: PutUser = (id, data, config) =>
  client
    .put(join('/account/v1/users', id), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
