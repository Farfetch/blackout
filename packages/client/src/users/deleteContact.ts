import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteContact } from './types';

/**
 * Method responsible for deleting a user contact.
 *
 * @param userId    - The user's id.
 * @param contactId - The contact id.
 * @param query     - Query parameters for the delete contact.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteContact: DeleteContact = (userId, contactId, query?, config?) =>
  client
    .delete(
      join('/account/v1/users', userId, 'contacts', contactId, {
        query,
      }),
      config,
    )
    .catch(error => {
      throw adaptError(error);
    });

export default deleteContact;
