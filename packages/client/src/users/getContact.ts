import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetContact } from './types';

/**
 * Method responsible for fetching a user contact.
 *
 * @param userId    - The user's id.
 * @param contactId - The contact id.
 * @param query     - Query parameters for get contacts.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getContact: GetContact = (userId, contactId, query?, config?) =>
  client
    .get(
      join('/account/v1/users', userId, 'contacts', contactId, {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getContact;
