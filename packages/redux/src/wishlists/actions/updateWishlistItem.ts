import { patchWishlistItem } from '@farfetch/blackout-client/wishlists';
import { updateWishlistItemFactory } from './factories';

/**
 * Update a wishlist item with given `data`.
 */
export default updateWishlistItemFactory(patchWishlistItem);
