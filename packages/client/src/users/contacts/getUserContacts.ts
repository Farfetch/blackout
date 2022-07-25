import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserContacts } from './types';

/**
 * Method responsible for getting all the user contacts.
 *
 * @param userId - The user's id.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserContacts: GetUserContacts = (userId, config?) =>
  client
    .get(join('/account/v1/users', userId, 'contacts'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserContacts;
