import {
  getWishlistSet,
  patchWishlistSet,
} from '@farfetch/blackout-client/wishlists';
import { updateWishlistSetFactory } from './factories';

/**
 * Update information of a set from the wishlist.
 *
 * @memberof module:wishlists/actions
 *
 * @function updateWishlistSet
 *
 * @type {FetchWishlistThunkFactory}
 */
export default updateWishlistSetFactory(patchWishlistSet, getWishlistSet);
