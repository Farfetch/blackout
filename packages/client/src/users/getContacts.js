import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for getting all the user contacts.
 *
 * @function getContacts
 * @memberof module:users/client
 *
 * @param {object} userId - The user's id.
 * @param {object} [query] - Query parameters for get contacts.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, query, config) =>
  client
    .get(join('/account/v1/users', userId, 'contacts', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
