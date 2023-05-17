import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetGuestUser } from './types/index.js';

/**
 * Gets the guest user details with the specified id.
 *
 * @param guestUserId - Universal identifier of the user.
 * @param config      - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getGuestUser: GetGuestUser = (guestUserId, config) =>
  client
    .get(join('/account/v1/guestUsers', guestUserId), config)
    .then(response => {
      if (!response.data) {
        return response;
      }

      // Add isGuest true to normalize with the GuestUser type
      return { ...response.data, isGuest: true };
    })
    .catch(error => {
      throw adaptError(error);
    });

export default getGuestUser;
