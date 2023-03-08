import { fetchWishlistSetFactory } from './factories/index.js';
import { getWishlistSet } from '@farfetch/blackout-client';

/**
 * Fetch wishlist with given id.
 */
export default fetchWishlistSetFactory(getWishlistSet);
