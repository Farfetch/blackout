import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteUserContact } from './types/index.js';

/**
 * Method responsible for deleting a user contact.
 *
 * @param userId    - The user's id.
 * @param contactId - The contact id.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteUserContact: DeleteUserContact = (userId, contactId, config?) =>
  client
    .delete(join('/account/v1/users', userId, 'contacts', contactId), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteUserContact;
