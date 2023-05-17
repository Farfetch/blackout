import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import type { PostSharedWishlist } from './types/index.js';

/**
 * Method responsible for create a snapshot of a wishlist set to allow share it.
 *
 * @param id     - Universal identifier of the wishlist.
 * @param data   - Details of the information of which wishlist set is going to be shared.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const postSharedWishlist: PostSharedWishlist = (data, config) =>
  client
    .post('/commerce/v1/sharedWishlists', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default postSharedWishlist;
