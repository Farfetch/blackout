import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { PostUserPersonalIdImage } from './types';

/**
 * Method responsible for creating personal id image.
 *
 * @param userId - User's id to set personal id image.
 * @param data   - Personal id image object.
 * @param config - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                 header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const postUserPersonalIdImage: PostUserPersonalIdImage = (
  userId,
  data,
  config,
) =>
  client
    .post(join('/account/v1/users', userId, 'personalIds/images'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
