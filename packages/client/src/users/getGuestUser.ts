import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetGuestUser } from './types';

/**
 * Gets the guest user details with the specified id.
 *
 * @param id     - Universal identifier of the user.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const getGuestUser: GetGuestUser = (id, config) =>
  client
    .get(join('/account/v1/guestUsers', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
