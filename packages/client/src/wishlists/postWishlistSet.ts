import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { PostWishlistSet } from './types';

/**
 * Method responsible for adding a new set in wishlist.
 *
 * @param id     - Universal identifier of the wishlist.
 * @param data   - Details of the set to add to the wishlist.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const postWishlistSet: PostWishlistSet = (id, data, config) =>
  client
    .post(join('/commerce/v1/wishlists', id, 'sets'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postWishlistSet;
