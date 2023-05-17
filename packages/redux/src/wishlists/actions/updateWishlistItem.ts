import { patchWishlistItem } from '@farfetch/blackout-client';
import { updateWishlistItemFactory } from './factories/index.js';

/**
 * Update a wishlist item with given `data`.
 */
export default updateWishlistItemFactory(patchWishlistItem);
