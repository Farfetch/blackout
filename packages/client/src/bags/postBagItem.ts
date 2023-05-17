import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PostBagItem } from './types/index.js';

/**
 * Method responsible for adding a product to the bag.
 *
 * @param id     - Universal identifier of the bag.
 * @param data   - Details of the product to add to the bag.
 * @param query  - Query with parameters to get the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const postBagItem: PostBagItem = (id, data, query, config) =>
  client
    .post(join('/commerce/v1/bags', id, 'items', { query }), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postBagItem;
