import { fetchWishlistFactory } from './factories';
import { getWishlist } from '@farfetch/blackout-client';

/**
 * Fetch wishlist with given id.
 */
export default fetchWishlistFactory(getWishlist);
