import client, { adaptError } from '../../helpers/client';

/**
 * @typedef {object} PostSharedWishlistData
 *
 * @alias PostSharedWishlistData
 * @memberof module:sharedWishlists/client
 *
 * @property {string} id - Universal identifier of the shared wishlist.
 * @property {string} setId - Global identifier of the set to retrieve information
 * from.
 */

/**
 * Method responsible for creating a snapshot of the wishlist set to allow share it.
 *
 * @function postSharedWishlist
 * @memberof module:sharedWishlists/client
 *
 * @param {PostSharedWishlistData} data - Details of the information of which wishlist
 * set is going to be shared.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to
 * the endpoint finishes.
 */
export default (data, config) =>
  client
    .post('/commerce/v1/sharedWishlists', data, config)
    .then(response => response.data)
    .catch(error => {
      throw adaptError(error);
    });
