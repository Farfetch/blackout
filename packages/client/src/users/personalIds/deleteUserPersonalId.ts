import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';
import type { DeleteUserPersonalId } from './types';

/**
 * Method responsible for deleting a personal id.
 *
 * @param userId     - The user's id.
 * @param personalId - The personal identifier.
 * @param config     - Custom configurations to send to the client instance (axios). X-SUMMER-RequestId
 *                     header is required.
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
export const deleteUserPersonalId: DeleteUserPersonalId = (
  userId,
  personalId,
  config,
) =>
  client
    .delete(
      join('/account/v1/users', userId, 'personalIds/', personalId),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });
