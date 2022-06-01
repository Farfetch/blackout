import { deleteWishlistItem } from '@farfetch/blackout-client/wishlists';
import { removeWishlistItemFactory } from './factories';

/**
 * Remove a wishlist item with given id.
 */
export default removeWishlistItemFactory(deleteWishlistItem);
