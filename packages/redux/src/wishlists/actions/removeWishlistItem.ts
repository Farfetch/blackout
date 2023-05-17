import { deleteWishlistItem } from '@farfetch/blackout-client';
import { removeWishlistItemFactory } from './factories/index.js';

/**
 * Remove a wishlist item with given id.
 */
export default removeWishlistItemFactory(deleteWishlistItem);
