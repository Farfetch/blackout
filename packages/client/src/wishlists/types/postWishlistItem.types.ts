import type { Config } from '../..';
import type { Product } from '../../products/types';
import type { Wishlist } from './wishlist.types';

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
