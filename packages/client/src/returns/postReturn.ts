import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostReturn } from './types/index.js';

/**
 * Method responsible for creating a return.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postReturn: PostReturn = (data, config) =>
  client
    .post(join('/account/v1/returns'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postReturn;
