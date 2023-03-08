import { adaptError } from '../../helpers/client/formatError.js';
import client from '../../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetUserCreditMovements } from './types/index.js';

/**
 * Method responsible to get the credit movements of the user.
 *
 * @param userId - User identifier.
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserCreditMovements: GetUserCreditMovements = (
  userId,
  query,
  config,
) =>
  client
    .get(
      join('/account/v1/users', userId, 'creditMovements', { query }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserCreditMovements;
