import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteBagItem } from './types';

/**
 * @typedef {object} DeleteBagItemQuery
 *
 * @alias DeleteBagItemQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * Method responsible for deleting an item from the bag.
 *
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {number} itemId - Numeric identifier of the item to delete.
 * @param {DeleteBagItemQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const deleteBagItem: DeleteBagItem = (id, itemId, query, config) =>
  client
    .delete(join('/commerce/v1/bags', id, 'items', itemId, { query }), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteBagItem;
