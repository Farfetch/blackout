import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetWishlistSet } from './types';

/**
 * Method responsible for loading the information of a set from the wishlist.
 *
 * @memberof module:wishlists
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {string} setId - Global identifier of the set to retrieve information
 * from.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getWishlistSet: GetWishlistSet = (id, setId, config) =>
  client
    .get(join('/commerce/v1/wishlists', id, 'sets', setId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getWishlistSet;
