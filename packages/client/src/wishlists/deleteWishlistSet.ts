import client, { adaptError } from '../helpers/client';
import join from 'proper-url-join';
import type { DeleteWishlistSet } from './types';

/**
 * Method responsible for deleting a set from the wishlist.
 *
 * @memberof module:wishlists
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {string} setId - Global identifier of the set to remove.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 */
const deleteWishlistSet: DeleteWishlistSet = (id, setId, config) =>
  client
    .delete(join('/commerce/v1/wishlists', id, 'sets', setId), config)
    .catch(error => {
      throw adaptError(error);
    });

export default deleteWishlistSet;
