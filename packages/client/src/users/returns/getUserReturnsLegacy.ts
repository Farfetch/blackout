import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserReturnsLegacy } from './types/index.js';

/**
 * Method responsible for getting all the returns of either an authenticated
 * or guest user. To get the returns for guest users, use the `query` parameter to
 * specify the guest user email and the order id.
 *
 * @param userId - The user's id.
 * @param query - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const getUserReturnsLegacy: GetUserReturnsLegacy = (
  userId,
  data,
  query,
  config,
) =>
  client
    .post(
      join('legacy/v1/users', userId, '/returns', {
        query,
      }),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserReturnsLegacy;
