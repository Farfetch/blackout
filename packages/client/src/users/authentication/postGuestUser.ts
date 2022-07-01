import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import type { PostGuestUser } from './types';

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
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postGuestUser;
