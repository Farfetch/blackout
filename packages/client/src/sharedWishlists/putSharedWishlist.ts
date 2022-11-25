import { adaptError } from '../helpers/client/formatError';
import client from '../helpers/client';
import join from 'proper-url-join';
import type { PutSharedWishlist } from './types';

/**
 * Method responsible for update a shared wishlist, syncronizing the prior snapshot
 * with the current state of the related wishlist set.
 *
 * @param id     - Universal identifier of the shared wishlist.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const putSharedWishlist: PutSharedWishlist = (id, config) =>
  client
    .put(join('/commerce/v1/sharedWishlists', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default putSharedWishlist;
