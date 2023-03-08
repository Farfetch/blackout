import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteGuestToken } from './types/index.js';

/**
 * Deletes a guest user token.
 *
 * @param id     - The guest user token id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteGuestToken: DeleteGuestToken = (id: string, config) =>
  client
    .delete(join('/authentication/v1/guestTokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteGuestToken;
