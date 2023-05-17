import { deleteWishlistSet } from '@farfetch/blackout-client';
import { removeWishlistSetFactory } from './factories/index.js';

/**
 * Remove a set from the wishlist.
 */
export default removeWishlistSetFactory(deleteWishlistSet);
