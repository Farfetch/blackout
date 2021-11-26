import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PatchBagItem } from './types';

/**
 * @typedef {object} PatchBagItemQuery
 *
 * @alias PatchBagItemQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * Method responsible for updating the quantity and the size of an item
 * in the bag.
 *
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {number} itemId - Numeric identifier of the item to patch.
 * @param {object} data - Details of the product to update a bag item.
 * @param {number} data.productId - Product identifier.
 * @param {number} data.merchantId - Merchant identifier.
 * @param {number} data.quantity - Bag item quantity.
 * @param {number} data.size - Bag item size.
 * @param {number} data.scale - Bag item scale.
 * @param {PatchBagItemQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
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
