import { addWishlistSetFactory } from './factories';
import { postWishlistSet } from '@farfetch/blackout-client/wishlists';

/**
 * Add a new set to the wishlist.
 */
export default addWishlistSetFactory(postWishlistSet);
