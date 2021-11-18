import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading all sets from one wishlist.
 *
 * @function getWishlistsSets
 * @memberof module:wishlists/client
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, config) =>
  client
    .get(join('/commerce/v1/wishlists', id, 'sets'), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
