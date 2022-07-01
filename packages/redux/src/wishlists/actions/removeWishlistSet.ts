import { deleteWishlistSet } from '@farfetch/blackout-client';
import { removeWishlistSetFactory } from './factories';

/**
 * Remove a set from the wishlist.
 */
export default removeWishlistSetFactory(deleteWishlistSet);
