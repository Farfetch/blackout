import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PutItemTags } from './types';

/**
 * Method responsible for updating the checkout item tags.
 *
 * @function putItemTags
 * @memberof module:checkout/client
 *
 * @param {number} id - Universal identifier of the Checkout.
 * @param {number} itemId - Universal identifier of the Item.
 * @param {Array} data - Array of strings representing the tags that
 * you want to persist and/or add.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will resolve when the call to
 * the endpoint finishes.
 */
const putItemTags: PutItemTags = (id, itemId, data, config) => {
  return client
    .put(
      join('/checkout/v1/orders/', id, 'items', itemId, 'tags'),
      data,
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
};

export default putItemTags;
