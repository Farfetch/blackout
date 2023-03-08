import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import type { PostGuestUser } from './types/index.js';

/**
 * Registers a new guest user.
 *
 * @param data   - User to be registered.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const postGuestUser: PostGuestUser = (data, config?) =>
  client
    .post('/account/v1/guestUsers', data, config)
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

export default postGuestUser;
