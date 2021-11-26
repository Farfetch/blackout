import type { Wishlist } from './wishlist.types';

export type GetWishlist = (
  id: Wishlist['id'],
  config?: Record<string, unknown>,
) => Promise<Wishlist>;
