import type { Config } from '../..';
import type { Wishlist } from './wishlist.types';

export type GetWishlist = (
  id: Wishlist['id'],
  config?: Config,
) => Promise<Wishlist>;
