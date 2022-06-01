import { fetchWishlistFactory } from './factories';
import { getWishlist } from '@farfetch/blackout-client/wishlists';

/**
 * Fetch wishlist with given id.
 */
export default fetchWishlistFactory(getWishlist);
