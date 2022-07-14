import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { DeleteUserContact } from './types';

/**
 * Method responsible for deleting a user contact.
 *
 * @param userId    - The user's id.
 * @param contactId - The contact id.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const deleteUserContact: DeleteUserContact = (
  userId,
  contactId,
  config?,
) =>
  client
    .delete(join('/account/v1/users', userId, 'contacts', contactId), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
