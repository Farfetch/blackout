import client, { adaptError } from '../../helpers/client';
import join from 'proper-url-join';

/**
 * Method responsible for udpdating information of a set from the wishlist.
 * Please note that this PATCH endpoint use the JsonPatch format to send data.
 *
 * @see https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch
 *
 * @function patchWishlistsSet
 * @memberof module:wishlists/client
 *
 * @param {string} id - Universal identifier of the wishlist.
 * @param {string} setId - Global identifier of the set to update.
 * @param {object} data - Details to update.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Promise} Promise that will be resolved when the call to the
 * endpoint finishes.
 *
 * @example
 * <caption>
 *  Example `data` to edit the name of the set
 * </caption>
 * [
 *      {
 *          value: 'My custom set name',
 *          path: '/name',
 *          op: 'add'
 *      }
 *  ]
 *
 * <caption>
 *  Example `data` to edit the name and description of the set
 * </caption>
 * [
 *      {
 *          value: 'My custom set name',
 *          path: '/name',
 *          op: 'add'
 *      },
 *      {
 *          value: 'My custom set description',
 *          path: '/description',
 *          op: 'add'
 *      }
 *  ]
 *
 * <caption>
 *  Example `data` to add wishlist items to the set
 * </caption>
 * [
 *      {
 *          value: { wishlistItemId: 269002001 },
 *          path: '/wishlistSetItems/-',
 *          op: 'add'
 *      }
 *  ]
 *
 * <caption>
 *  Example `data` to remove a specific wishlist items from the set
 * </caption>
 * [
 *      {
 *          path: '/wishlistSetItems/0',
 *          op: 'remove'
 *      }
 *  ]
 *
 * <caption>
 *  Example `data` to remove all wishlist items from the set
 * </caption>
 * [
 *      {
 *          path: '/wishlistSetItems/',
 *          op: 'remove'
 *      }
 *  ]
 */
export default (id, setId, data, config) =>
  client
    .patch(join('/commerce/v1/wishlists', id, 'sets', setId), data, config)
    .catch(error => {
      throw adaptError(error);
    });
