import { fetchSharedWishlistFactory } from './factories/index.js';
import { getSharedWishlist } from '@farfetch/blackout-client';

/**
 * Fetch wishlist with given id.
 */
export default fetchSharedWishlistFactory(getSharedWishlist);
