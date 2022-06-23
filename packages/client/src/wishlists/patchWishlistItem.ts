import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PatchWishlistItem } from './types';

/**
 * Method responsible for setting the quantity and the size of a product in a
 * wishlist.
 *
 * @param id     - Universal identifier of the wishlist.
 * @param itemId - Numeric identifier of the item to patch.
 * @param data   - Details to update, namely quantity and size.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const patchWishlistItem: PatchWishlistItem = (id, itemId, data, config) =>
  client
    .patch(join('/commerce/v1/wishlists', id, 'items', itemId), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default patchWishlistItem;
