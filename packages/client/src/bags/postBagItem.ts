import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostBagItem } from './types';

/**
 * @typedef {object} PostBagItemQuery
 *
 * @alias PostBagItemQuery
 * @memberof module:bags/client
 *
 * @property {boolean} [includeOutOfStock=false] - If the response should
 * include sold out items in the bag.
 */

/**
 * Method responsible for adding a product to the bag.
 *
 * @memberof module:bags/client
 *
 * @param {string} id - Universal identifier of the bag.
 * @param {object} data - Details of the product to add to the bag.
 * @param {number} data.productId - Product identifier.
 * @param {number} [data.productAggregatorId] - Product aggregator identifier.
 * @param {number} [data.merchantId] - Merchant identifier.
 * @param {number} [data.quantity=1] - Bag item quantity.
 * @param {number} data.size - Bag item size.
 * @param {number} data.scale - Bag item scale.
 * @param {string} [data.customAttributes] - For customizable products, string describing the
 * product customization, typically in JSON format. For example, users may be able to customize
 * the materials and colors of parts of the product.
 * @param {string} [data.authCode] - For restriction product. This value is a code, received by
 * the user, used to unlock the AddToBag operation.
 * @param {PostBagItemQuery} [query] - Query with parameters to get the bag.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const postBagItem: PostBagItem = (id, data, query, config) =>
  client
    .post(join('/commerce/v1/bags', id, 'items', { query }), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postBagItem;
