import type { Config } from '../..';
import type { SharedWishlist } from './sharedWishlist.types';
import type { Wishlist, WishlistSet } from '../../wishlists/types';

export type PostSharedWishlistData = {
  wishlistId: Wishlist['id'];
  wishlistSetId: WishlistSet['setId'];
};

export type PostSharedWishlist = (
  data: PostSharedWishlistData,
  config?: Config,
) => Promise<SharedWishlist>;
