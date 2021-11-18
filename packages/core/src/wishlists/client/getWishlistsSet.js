import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for loading the information of a set from the wishlist.
 *
 * @function getWishlistsSet
 * @memberof module:wishlists/client
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
export default (id, setId, config) =>
  client
    .get(join('/commerce/v1/wishlists', id, 'sets', setId), config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
