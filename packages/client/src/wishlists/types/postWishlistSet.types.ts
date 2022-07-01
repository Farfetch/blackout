import type { Config } from '../..';
import type { Wishlist } from './wishlist.types';
import type { WishlistItem } from './wishlistItem.types';
import type { WishlistSet } from './wishlistSet.types';

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
