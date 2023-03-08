import { addWishlistItemFactory } from './factories/index.js';
import { postWishlistItem } from '@farfetch/blackout-client';

/**
 * Add item with given data to the wishlist.
 */
export default addWishlistItemFactory(postWishlistItem);
