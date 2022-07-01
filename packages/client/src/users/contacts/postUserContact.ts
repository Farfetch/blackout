import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';
import type { PostUserContact } from './types';

/**
 * Method responsible for creating a new user contact.
 *
 * @param userId - User's id to get the contacts from.
 * @param data   - Object containing the new contact.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const postUserContact: PostUserContact = (userId, data, config?) =>
  client
    .post(join('/account/v1/users', userId, 'contacts'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
