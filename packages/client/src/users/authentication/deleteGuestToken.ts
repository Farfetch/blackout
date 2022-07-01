import { adaptError } from '../../helpers/client/formatError';
import client, { configApiBlackAndWhite } from '../../helpers/client';
import join from 'proper-url-join';
import type { DeleteGuestToken } from './types';

/**
 * Deletes a guest user token.
 *
 * @param id     - The guest user token id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteGuestToken: DeleteGuestToken = (
  id: string,
  config = configApiBlackAndWhite,
) =>
  client
    .delete(join('/authentication/v1/guestTokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteGuestToken;
