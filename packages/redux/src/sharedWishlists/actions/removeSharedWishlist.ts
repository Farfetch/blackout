import { deleteSharedWishlist } from '@farfetch/blackout-client';
import { removeSharedWishlistFactory } from './factories/index.js';

/**
 * Remove a set from the wishlist.
 */
export default removeSharedWishlistFactory(deleteSharedWishlist);
