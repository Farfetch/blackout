import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for updating a shared wishlist, syncronizing the prior
 * snapshot with the current state of the related wishlist set.
 *
 * @function putSharedWishlist
 * @memberof module:sharedWishlists/client
 *
 * @param {string} id - Universal identifier of the shared wishlist.
 * @param {object} [config] - Custom configurations to send to the client instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the endpoint finishes.
 */
export default (id, config) =>
  client
    .put(join('/commerce/v1/sharedWishlists', id), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
