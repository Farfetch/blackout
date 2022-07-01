import { addWishlistSetFactory } from './factories';
import { postWishlistSet } from '@farfetch/blackout-client';

/**
 * Add a new set to the wishlist.
 */
export default addWishlistSetFactory(postWishlistSet);
