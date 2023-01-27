import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { GetBagOperation } from './types/getBagOperation.types';

/**
 * Method responsible for retrieving an operation performed on the bag.
 *
 *
 * @param id - Universal identifier of the bag.
 * @param bagOperationId - Universal identifier of the bag operation.
 * @param config - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getBagOperation: GetBagOperation = (id, bagOperationId, config) =>
  client
    .get(join('/commerce/v1/bags', id, 'operations', bagOperationId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getBagOperation;
