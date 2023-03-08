import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetWishlist } from './types/index.js';

/**
 * Method responsible for loading the wishlist.
 *
 * @param id     - Universal identifier of the wishlist.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getWishlist: GetWishlist = (id, config) =>
  client
    .get(
      join('/commerce/v1/wishlists', id, {
        query: { hydrate: 'true' },
      }),
      config,
    )
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getWishlist;
