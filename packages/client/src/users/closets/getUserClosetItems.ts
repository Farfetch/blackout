import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserClosetItems } from './types/index.js';

/**
 * Method responsible for getting the items (paginated) from a specific closet.
 *
 * @param userId - Universal identifier of the user.
 * @param closetId - Closet identifier.
 * @param query  - Query params.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserClosetItems: GetUserClosetItems = (
  userId,
  closetId,
  query,
  config,
) =>
  client
    .get(
      join('/account/v1/users/', userId, '/closets/', closetId, '/items', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserClosetItems;
