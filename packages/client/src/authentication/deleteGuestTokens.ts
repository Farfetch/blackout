import client, { adaptError, configApiBlackAndWhite } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Deletes a guest user token.
 *
 * @param id     - The guest user token id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export default (
  id: number,
  config: { [k: string]: any } = configApiBlackAndWhite,
): Promise<any> =>
  client
    .delete(join('/authentication/v1/guestTokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
