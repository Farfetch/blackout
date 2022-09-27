import { adaptError } from '../../helpers/client/formatError';
import client from '../../helpers/client';
import join from 'proper-url-join';
import type { GetUserAttributes } from './types';

/**
 * Method responsible for getting all the user attributes.
 *
 * @param userId - The user's id.
 * @param query  - Query object with search terms to apply.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getUserAttributes: GetUserAttributes = (userId, query, config) =>
  client
    .get(
      join('/account/v1/users', userId, '/attributes', {
        query,
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getUserAttributes;
