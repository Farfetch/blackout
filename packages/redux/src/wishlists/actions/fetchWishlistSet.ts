import { fetchWishlistSetFactory } from './factories';
import { getWishlistSet } from '@farfetch/blackout-client/wishlists';

/**
 * Fetch wishlist with given id.
 */
export default fetchWishlistSetFactory(getWishlistSet);
