import { createSharedWishlistFactory } from './factories';
import { postSharedWishlist } from '@farfetch/blackout-client';

/**
 * Add a new set to the wishlist.
 */
export default createSharedWishlistFactory(postSharedWishlist);
