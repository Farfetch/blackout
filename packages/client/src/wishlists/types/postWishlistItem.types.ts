import type { Config } from '../../index.js';
import type { Product } from '../../products/types/index.js';
import type { Wishlist } from './wishlist.types.js';

export type PostWishlistItemData = {
  merchantId?: number;
  productId: Product['result']['id'];
  quantity: number;
  size?: number;
};

export type PostWishlistItem = (
  id: Wishlist['id'],
  data: PostWishlistItemData,
  config?: Config,
) => Promise<Wishlist>;
