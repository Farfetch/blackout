import { fetchWishlistFactory } from './factories/index.js';
import { getWishlist } from '@farfetch/blackout-client';

/**
 * Fetch wishlist with given id.
 */
export default fetchWishlistFactory(getWishlist);
