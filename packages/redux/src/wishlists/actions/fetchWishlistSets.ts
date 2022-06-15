import { fetchWishlistSetsFactory } from './factories';
import { getWishlistSets } from '@farfetch/blackout-client/wishlists';

/**
 * Load wishlist sets for a given wishlist id.
 */
export default fetchWishlistSetsFactory(getWishlistSets);