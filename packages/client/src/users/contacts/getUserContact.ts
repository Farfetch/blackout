import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserContact } from './types/index.js';

/**
 * Method responsible for fetching a user contact.
 *
 * @param userId    - The user's id.
 * @param contactId - The contact id.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserContact: GetUserContact = (userId, contactId, config?) =>
  client
    .get(join('/account/v1/users', userId, 'contacts', contactId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserContact;
