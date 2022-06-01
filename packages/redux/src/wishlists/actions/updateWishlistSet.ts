import {
  getWishlistSet,
  patchWishlistSet,
} from '@farfetch/blackout-client/wishlists';
import { updateWishlistSetFactory } from './factories';

/**
 * Update information of a set from the wishlist.
 */
export default updateWishlistSetFactory(patchWishlistSet, getWishlistSet);
