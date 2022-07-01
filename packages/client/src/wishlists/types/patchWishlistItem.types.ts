import type { Config } from '../..';
import type { Product } from '../../products/types';
import type { Wishlist } from './wishlist.types';
import type { WishlistItem } from './wishlistItem.types';

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
