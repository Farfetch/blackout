import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for adding a new set in wishlist.
 *
 * @function postWishlistsSet
 * @memberof module:wishlists/client
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {object} data - Details of the set to add to the wishlist.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, data, config) =>
  client
    .post(join('/commerce/v1/wishlists', id, 'sets'), data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
