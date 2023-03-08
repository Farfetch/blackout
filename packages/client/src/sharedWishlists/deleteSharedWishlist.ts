import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { DeleteSharedWishlist } from './types/index.js';

/**
 * Method responsible for deleting a shared wishlist.
 *
 * @param id     - Universal identifier of the shared wishlist.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const deleteSharedWishlist: DeleteSharedWishlist = (id, config) =>
  client
    .delete(join('/commerce/v1/sharedWishlists', id), config)
    .then(response => response.status)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteSharedWishlist;
