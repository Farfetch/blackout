import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteWishlistItem } from './types';

/**
 * Method responsible for deleting an item from a wishlist.
 *
 * @memberof module:wishlists
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {number} itemId - Numeric identifier of the item to delete.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const deleteWishlistItem: DeleteWishlistItem = (id, itemId, config) =>
  client
    .delete(join('/commerce/v1/wishlists', id, 'items', itemId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteWishlistItem;
