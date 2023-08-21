import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteUserClosetItem } from './types/index.js';

/**
 * Method responsible for deleting a user closet.
 *
 * @param userId - Universal identifier of the user.
 * @param closetId - Closet identifier.
 * @param itemId - Closet item identifier.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const deleteUserClosetItem: DeleteUserClosetItem = (
  userId,
  closetId,
  itemId,
  config,
) =>
  client
    .delete(
      join(
        '/account/v1/users',
        userId,
        '/closets/',
        closetId,
        '/items/',
        itemId,
      ),
      config,
    )
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteUserClosetItem;
