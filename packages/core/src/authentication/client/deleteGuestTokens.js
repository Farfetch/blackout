import client, {
  adaptError,
  configApiBlackAndWhite,
} from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Deletes a guest user token.
 *
 * @function deleteGuestTokens
 * @memberof module:authentication/client
 *
 * @param {string} id - The guest user token id.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config = configApiBlackAndWhite) =>
  client
    .delete(join('/authentication/v1/guestTokens', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
