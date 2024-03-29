import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchUserContact } from './types/index.js';

/**
 * Method responsible for updating a user contact.
 *
 * @param userId    - The user's id.
 * @param contactId - The contact id.
 * @param data      - Array of objects containing the item patch document reflecting the changes to be
 *                    made to the contact.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const patchUserContact: PatchUserContact = (userId, contactId, data, config?) =>
  client
    .patch(
      join('/account/v1/users', userId, 'contacts', contactId),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchUserContact;
