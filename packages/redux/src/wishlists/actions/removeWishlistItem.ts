import { deleteWishlistItem } from '@farfetch/blackout-client';
import { removeWishlistItemFactory } from './factories';

/**
 * Remove a wishlist item with given id.
 */
export default removeWishlistItemFactory(deleteWishlistItem);
