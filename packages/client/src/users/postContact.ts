import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostContact } from './types';

/**
 * Method responsible for creating a new user contact.
 *
 * @param userId - User's id to get the contacts from.
 * @param data   - Object containing the new contact.
 * @param query  - Query parameters for creating a new user contact.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postContact: PostContact = (userId, data, query?, config?) =>
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

export default postContact;
