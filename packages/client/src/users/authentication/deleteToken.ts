import { adaptError } from '../../helpers/client/formatError';
import client, { configApiBlackAndWhite } from '../../helpers/client';
import join from 'proper-url-join';
import type { DeleteToken } from './types';

/**
 * Deletes an user token.
 *
 * @param id     - The user token id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteToken: DeleteToken = (id, config = configApiBlackAndWhite) =>
  client
    .delete(join('/authentication/v1/tokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteToken;
