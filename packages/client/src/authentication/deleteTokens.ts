import client, { adaptError, configApiBlackAndWhite } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteTokens } from './types';

/**
 * Deletes an user token.
 *
 * @param id     - The user token id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteTokens: DeleteTokens = (id, config = configApiBlackAndWhite) =>
  client
    .delete(join('/authentication/v1/tokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteTokens;
