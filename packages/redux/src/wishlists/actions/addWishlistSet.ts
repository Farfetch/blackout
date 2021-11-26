import { addWishlistSetFactory } from './factories';
import { postWishlistSet } from '@farfetch/blackout-client/wishlists';

/**
 * Add a new set to the wishlist.
 *
 * @memberof module:wishlists/actions
 *
 * @function addWishlistItem
 *
 * @type {AddWishlistSetThunkFactory}
 */
export default addWishlistSetFactory(postWishlistSet);
