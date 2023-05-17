import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteUserPersonalId } from './types/index.js';

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
const deleteUserPersonalId: DeleteUserPersonalId = (
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

export default deleteUserPersonalId;
