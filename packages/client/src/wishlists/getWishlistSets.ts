import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { GetWishlistSets } from './types';

/**
 * Method responsible for loading all sets from one wishlist.
 *
 * @memberof module:wishlists
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const getWishlistSets: GetWishlistSets = (id, config) =>
  client
    .get(join('/commerce/v1/wishlists', id, 'sets'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });

export default getWishlistSets;
