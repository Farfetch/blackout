import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostGuestToken } from './types/index.js';

/**
 * Method responsible for managing authentications.
 *
 * @param data   - Request data.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postGuestToken: PostGuestToken = (data, config) =>
  client
    .post('/authentication/v1/guestTokens', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postGuestToken;
