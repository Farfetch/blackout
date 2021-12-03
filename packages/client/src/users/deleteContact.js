import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for deleting a user contact.
 *
 * @function deleteContact
 * @memberof module:users/client
 *
 * @param {string} userId - The user's id.
 * @param {string} contactId - The contact id.
 * @param {object} [query] - Query parameters for the delete contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, contactId, query, config) =>
  client
    .delete(
      join('/account/v1/users', userId, 'contacts', contactId, {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
