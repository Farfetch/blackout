import { createSharedWishlistFactory } from './factories/index.js';
import { postSharedWishlist } from '@farfetch/blackout-client';

/**
 * Add a new set to the wishlist.
 */
export default createSharedWishlistFactory(postSharedWishlist);
