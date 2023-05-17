import type { Config } from '../../index.js';
import type { Product } from '../../products/types/index.js';
import type { Wishlist } from './wishlist.types.js';
import type { WishlistItem } from './wishlistItem.types.js';

export type PatchWishlistItemData = {
  merchantId: number;
  productId: Product['result']['id'];
  quantity: number;
  size: number;
};

export type PatchWishlistItem = (
  id: Wishlist['id'],
  itemId: WishlistItem['id'],
  data: PatchWishlistItemData,
  config?: Config,
) => Promise<Wishlist>;
