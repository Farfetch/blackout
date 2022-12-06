import { fetchSharedWishlistFactory } from './factories';
import { getSharedWishlist } from '@farfetch/blackout-client';

/**
 * Fetch wishlist with given id.
 */
export default fetchSharedWishlistFactory(getSharedWishlist);
