import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetBagOperations } from './types/getBagOperations.types.js';

/**
 * Method responsible for retrieving operations carried out on the bag.
 *
 *
 * @param id - Universal identifier of the bag.
 * @param query - Query parameters to apply.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getBagOperations: GetBagOperations = (id, query, config) =>
  client
    .get(join('/commerce/v1/bags', id, 'operations', { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBagOperations;
