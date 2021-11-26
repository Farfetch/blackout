import { deleteWishlistItem } from '@farfetch/blackout-client/wishlists';
import { removeWishlistItemFactory } from './factories';

/**
 * Remove a wishlist item with given id.
 *
 * @memberof module:wishlists/actions
 *
 * @function removeWishlistItem
 *
 * @type {RemoveWishlistItemThunkFactory}
 */
export default removeWishlistItemFactory(deleteWishlistItem);
