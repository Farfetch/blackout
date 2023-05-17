import type { Config } from '../../index.js';
import type { Wishlist } from './wishlist.types.js';
import type { WishlistItem } from './wishlistItem.types.js';
import type { WishlistSet } from './wishlistSet.types.js';

export type PostWishlistSetData = {
  name: string;
  description: string;
  wishlistSetItems: Array<{
    wishlistItemId: WishlistItem['id'];
  }>;
};

export type PostWishlistSet = (
  id: Wishlist['id'],
  data: PostWishlistSetData,
  config?: Config,
) => Promise<WishlistSet>;
