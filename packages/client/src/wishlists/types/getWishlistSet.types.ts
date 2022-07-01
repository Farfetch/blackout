import type { Config } from '../..';
import type { Wishlist } from './wishlist.types';
import type { WishlistSet } from './wishlistSet.types';

export type GetWishlistSet = (
  id: Wishlist['id'],
  setId: WishlistSet['setId'],
  config?: Config,
) => Promise<WishlistSet>;
