import { fetchWishlistSetFactory } from './factories';
import { getWishlistSet } from '@farfetch/blackout-client/wishlists';

/**
 * Fetch wishlist with given id.
 *
 * @memberof module:wishlists/actions
 *
 * @function fetchWishlistSet
 *
 * @type {FetchWishlistSetThunkFactory}
 */
export default fetchWishlistSetFactory(getWishlistSet);
