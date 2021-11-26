import { deleteWishlistSet } from '@farfetch/blackout-client/wishlists';
import { removeWishlistSetFactory } from './factories';

/**
 * Remove a set from the wishlist.
 *
 * @memberof module:wishlists/actions
 *
 * @function removeWishlistSet
 *
 * @type {RemoveWishlistSetThunkFactory}
 */
export default removeWishlistSetFactory(deleteWishlistSet);
