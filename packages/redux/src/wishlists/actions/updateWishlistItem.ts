import { patchWishlistItem } from '@farfetch/blackout-client/wishlists';
import { updateWishlistItemFactory } from './factories';

/**
 * Update a wishlist item with given `data`.
 *
 * @memberof module:wishlists/actions
 *
 * @function updateWishlistItem
 *
 * @type {UpdateWishlistItemThunkFactory}
 */
export default updateWishlistItemFactory(patchWishlistItem);
