import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserContacts } from './types';

/**
 * Method responsible for getting all the user contacts.
 *
 * @param userId - The user's id.
 * @param query  - Query parameters for get contacts.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getUserContacts: GetUserContacts = (userId, query?, config?) =>
  client
    .get(join('/account/v1/users', userId, 'contacts', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
