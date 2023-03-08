import type { Config } from '../../index.js';
import type { Wishlist } from './wishlist.types.js';

export type GetWishlist = (
  id: Wishlist['id'],
  config?: Config,
) => Promise<Wishlist>;
