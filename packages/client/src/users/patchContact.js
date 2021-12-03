import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for updating a user contact.
 *
 * @function patchContact
 * @memberof module:users/client
 *
 * @param {object} userId - The user's id.
 * @param {object} contactId - The contact id.
 * @param {Array} data - Array of objects containing the item patch document
 *  reflecting the changes to be made to the contact.
 * @param {object} [query] - Query parameters for the update contact.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
export default (userId, contactId, data, query, config) =>
  client
    .patch(
      join('/account/v1/users', userId, 'contacts', contactId, {
        query,
      }),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
