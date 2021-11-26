import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostWishlistItem } from './types';

/**
 * Method responsible for adding a product to the wishlist.
 *
 * @memberof module:wishlists
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {object} data - Details of the product to add to the wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const postWishlistItem: PostWishlistItem = (id, data, config) =>
  client
    .post(join('/commerce/v1/wishlists', id, 'items'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postWishlistItem;
