import { fetchWishlistSetsFactory } from './factories';
import { getWishlistSets } from '@farfetch/blackout-client/wishlists';

/**
 * Load wishlist sets for a given wishlist id.
 *
 * @memberof module:wishlists/actions
 *
 * @function fetchWishlistSets
 *
 * @type {FetchWishlistSetsThunkFactory}
 */
export default fetchWishlistSetsFactory(getWishlistSets);
