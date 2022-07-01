import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { PostUserPersonalId } from './types';

/**
 * Method responsible for creating new personal ids.
 *
 * @param userId - User's id to get the personal ids from.
 * @param data   - Object containing personal id data.
 * @param config - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                 header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const postUserPersonalId: PostUserPersonalId = (userId, data, config) =>
  client
    .post(join('/account/v1/users', userId, 'personalids'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
