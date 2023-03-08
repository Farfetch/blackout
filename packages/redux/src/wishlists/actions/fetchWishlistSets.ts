import { fetchWishlistSetsFactory } from './factories/index.js';
import { getWishlistSets } from '@farfetch/blackout-client';

/**
 * Load wishlist sets for a given wishlist id.
 */
export default fetchWishlistSetsFactory(getWishlistSets);
