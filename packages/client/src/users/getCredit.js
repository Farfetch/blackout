import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible to get the credit balance of the user.
 *
 * @function getCredit
 * @memberof module:users/client
 *
 * @param {string} id - User identifier.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/legacy/v1/users', id, 'credits'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
