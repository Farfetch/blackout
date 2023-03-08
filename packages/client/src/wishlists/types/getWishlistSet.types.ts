import type { Config } from '../../index.js';
import type { Wishlist } from './wishlist.types.js';
import type { WishlistSet } from './wishlistSet.types.js';

export type GetWishlistSet = (
  id: Wishlist['id'],
  setId: WishlistSet['setId'],
  config?: Config,
) => Promise<WishlistSet>;
