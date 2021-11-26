import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Responsible for obtaining the user's default contact address.
 *
 * @function getDefaultContactAddress
 * @memberof module:addresses/client
 *
 * @param {string} userId - Identifier of the user.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise<string|object>} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, config) =>
  client
    .get(
      join('/account/v1/users', userId, 'addresses/preferred/current'),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
