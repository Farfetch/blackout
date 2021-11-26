import { fetchWishlistFactory } from './factories';
import { getWishlist } from '@farfetch/blackout-client/wishlists';

/**
 * Fetch wishlist with given id.
 *
 * @memberof module:wishlists/actions
 *
 * @function fetchWishlist
 *
 * @type {FetchWishlistThunkFactory}
 */
export default fetchWishlistFactory(getWishlist);
