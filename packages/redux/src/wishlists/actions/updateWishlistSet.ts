import { getWishlistSet, patchWishlistSet } from '@farfetch/blackout-client';
import { updateWishlistSetFactory } from './factories/index.js';

/**
 * Update information of a set from the wishlist.
 */
export default updateWishlistSetFactory(patchWishlistSet, getWishlistSet);
