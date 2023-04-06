import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserReturns } from './types/index.js';

/**
 * Method responsible for getting all the user returns.
 *
 * @param userId - The user's id.
 * @param query - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */

const getUserReturnsLegacy: GetUserReturns = (userId, query, config) =>
  client
    .get(
      join('legacy/v1/users', userId, '/returns', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserReturnsLegacy;
