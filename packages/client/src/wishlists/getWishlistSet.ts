import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { GetWishlistSet } from './types/index.js';

/**
 * Method responsible for loading the information of a set from the wishlist.
 *
 * @param id     - Universal identifier of the wishlist.
 * @param setId  - Global identifier of the set to retrieve information from.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const getWishlistSet: GetWishlistSet = (id, setId, config) =>
  client
    .get(join('/commerce/v1/wishlists', id, 'sets', setId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getWishlistSet;
