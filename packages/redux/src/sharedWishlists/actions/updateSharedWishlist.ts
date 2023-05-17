import { putSharedWishlist } from '@farfetch/blackout-client';
import { updateSharedWishlistFactory } from './factories/index.js';

/**
 * Update information of a set from the wishlist.
 */
export default updateSharedWishlistFactory(putSharedWishlist);
