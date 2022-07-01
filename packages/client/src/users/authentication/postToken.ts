import { adaptError } from '../../helpers/client/formatError';
import client, { configApiBlackAndWhite } from '../../helpers/client';
import type { PostToken } from './types';

/**
 * Method responsible for managing authentications.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postToken: PostToken = (data, config = configApiBlackAndWhite) =>
  client
    .post('/authentication/v1/tokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postToken;
