import type { Config } from '../../index.js';
import type { Wishlist } from './wishlist.types.js';
import type { WishlistSets } from './wishlistSets.types.js';

export type GetWishlistSets = (
  id: Wishlist['id'],
  config?: Config,
) => Promise<WishlistSets>;
