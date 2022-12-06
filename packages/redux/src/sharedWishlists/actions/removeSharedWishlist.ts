import { deleteSharedWishlist } from '@farfetch/blackout-client';
import { removeSharedWishlistFactory } from './factories';

/**
 * Remove a set from the wishlist.
 */
export default removeSharedWishlistFactory(deleteSharedWishlist);
