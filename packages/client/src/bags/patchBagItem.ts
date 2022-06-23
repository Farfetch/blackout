import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PatchBagItem } from './types';

/**
 * Method responsible for updating the quantity and the size of an item in the bag.
 *
 * @param id     - Universal identifier of the bag.
 * @param itemId - Numeric identifier of the item to patch.
 * @param data   - Details of the product to update a bag item.
 * @param query  - Query with parameters to get the bag.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const patchBagItem: PatchBagItem = (id, itemId, data, query, config) =>
  client
    .patch(
      join('/commerce/v1/bags', id, 'items', itemId, { query }),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchBagItem;
