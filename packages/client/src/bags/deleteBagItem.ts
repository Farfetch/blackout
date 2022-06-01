import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteBagItem } from './types';

/**
 * Method responsible for deleting an item from the bag.
 *
 * @param id     - Universal identifier of the bag.
 * @param itemId - Numeric identifier of the item to delete.
 * @param query  - Query with parameters to get the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const deleteBagItem: DeleteBagItem = (id, itemId, query, config) =>
  client
    .delete(join('/commerce/v1/bags', id, 'items', itemId, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteBagItem;
