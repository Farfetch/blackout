import { adaptError } from '../helpers/client/formatError.js';
import client from '../helpers/client/index.js';
import join from 'proper-url-join';
import type { PatchWishlistSet } from './types/index.js';

/**
 * Method responsible for updating information of a set from the wishlist. Please
 * note that this PATCH endpoint use the JsonPatch format to send data.
 *
 * @example <caption> Example `data` to edit the name of the set</caption>
 * ```
 * [
 *      {
 *          value: 'My custom set name',
 *          path: '/name',
 *          op: 'add'
 *      }
 *  ]
 * ```
 *
 * @example <caption>Example `data` to edit the name and description of the set</caption>
 * ```
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
 * ```
 *
 * @example <caption>Example `data` to add wishlist items to the set</caption>
 * ```
 * [
 *      {
 *          value: { wishlistItemId: 269002001 },
 *          path: '/wishlistSetItems/-',
 *          op: 'add'
 *      }
 *  ]
 * ```
 *
 * @example <caption>Example `data` to remove a specific wishlist items from the set</caption>
 * ```
 * [
 *      {
 *          path: '/wishlistSetItems/0',
 *          op: 'remove'
 *      }
 *  ]
 * ```
 *
 * @example <caption>Example `data` to remove all wishlist items from the set</caption>
 * ```
 * [
 *      {
 *          path: '/wishlistSetItems/',
 *          op: 'remove'
 *      }
 *  ]
 * ```
 *
 * @see {@link https://docs.microsoft.com/en-us/aspnet/core/web-api/jsonpatch}
 *
 * @param id     - Universal identifier of the wishlist.
 * @param setId  - Global identifier of the set to update.
 * @param data   - Details to update.
 * @param config - Custom configurations to send to the client instance (axios).
 *
 * @returns Promise that will be resolved when the call to the endpoint finishes.
 */
const patchWishlistSet: PatchWishlistSet = (id, setId, data, config) =>
  client
    .patch(join('/commerce/v1/wishlists', id, 'sets', setId), data, config)
    .catch(error => {
      throw adaptError(error);
    });

export default patchWishlistSet;
