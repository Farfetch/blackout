import { deleteWishlistSet } from '@farfetch/blackout-client/wishlists';
import { removeWishlistSetFactory } from './factories';

/**
 * Remove a set from the wishlist.
 */
export default removeWishlistSetFactory(deleteWishlistSet);
