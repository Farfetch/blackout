import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible to get the credit movements of the user.
 *
 * @param id     - User identifier.
 * @param query  - Query parameters.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will resolve when the call to the endpoint finishes.
 */
const getCreditMovements = (id, query, config) =>
  client
    .get(join('/legacy/v1/users', id, 'creditMovements', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getCreditMovements;
