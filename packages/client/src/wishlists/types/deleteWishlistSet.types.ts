import type { Wishlist } from './wishlist.types';
import type { WishlistSet } from './wishlistSet.types';

export type DeleteWishlistSet = (
  id: Wishlist['id'],
  setId: WishlistSet['setId'],
  config?: Record<string, unknown>,
) => void;
