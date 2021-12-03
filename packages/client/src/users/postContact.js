import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for creating a new user contact.
 *
 * @function postContact
 * @memberof module:users/client
 *
 * @param {object} userId - User's id to get the contacts from.
 * @param {object} [data] - Object containing the new contact.
 * @param {object} [query] - Query parameters for creating a new user contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, data, query, config) =>
  client
    .post(
      join('/account/v1/users', userId, 'contacts', { query }),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
