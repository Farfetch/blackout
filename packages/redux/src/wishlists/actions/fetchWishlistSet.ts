import { fetchWishlistSetFactory } from './factories';
import { getWishlistSet } from '@farfetch/blackout-client';

/**
 * Fetch wishlist with given id.
 */
export default fetchWishlistSetFactory(getWishlistSet);
