import type { Config } from '../../index.js';
import type { SharedWishlist } from './sharedWishlist.types.js';
import type { Wishlist, WishlistSet } from '../../wishlists/types/index.js';

export type PostSharedWishlistData = {
  wishlistId: Wishlist['id'];
  wishlistSetId: WishlistSet['setId'];
};

export type PostSharedWishlist = (
  data: PostSharedWishlistData,
  config?: Config,
) => Promise<SharedWishlist>;
