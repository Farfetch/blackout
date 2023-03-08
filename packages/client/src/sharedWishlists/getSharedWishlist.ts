import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetSharedWishlist } from '../sharedWishlists/types/index.js';

/**
 * Method responsible for loading the shared wishlist.
 *
 * @param id     - Universal identifier of the shared wishlist.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getSharedWishlist: GetSharedWishlist = (id, config) =>
  client
    .get(join('/commerce/v1/sharedWishlists', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getSharedWishlist;
