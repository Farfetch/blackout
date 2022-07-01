import type { Config } from '../..';
import type { Wishlist } from './wishlist.types';
import type { WishlistSets } from './wishlistSets.types';

export type GetWishlistSets = (
  id: Wishlist['id'],
  config?: Config,
) => Promise<WishlistSets>;
