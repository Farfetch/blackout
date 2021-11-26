import { addWishlistItemFactory } from './factories';
import { postWishlistItem } from '@farfetch/blackout-client/wishlists';

/**
 * Add item with given data to the wishlist.
 *
 * @memberof module:wishlists/actions
 *
 * @function addWishlistItem
 *
 * @type {AddWishlistItemThunkFactory}
 */
export default addWishlistItemFactory(postWishlistItem);
