import { addWishlistItemFactory } from './factories';
import { postWishlistItem } from '@farfetch/blackout-client/wishlists';

/**
 * Add item with given data to the wishlist.
 */
export default addWishlistItemFactory(postWishlistItem);
