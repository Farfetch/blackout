import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for deleting a set from the wishlist.
 *
 * @function deleteWishlistsSet
 * @memberof module:wishlists/client
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {string} setId - Global identifier of the set to remove.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
export default (id, setId, config) =>
  client
    .delete(join('/commerce/v1/wishlists', id, 'sets', setId), config)
    .catch(error => {
      throw adaptError(error);
    });
