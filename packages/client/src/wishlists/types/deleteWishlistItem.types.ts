import type { Wishlist } from './wishlist.types';
import type { WishlistItem } from './wishlistItem.types';

export type DeleteWishlistItem = (
  id: Wishlist['id'],
  itemId: WishlistItem['id'],
  config?: Record<string, unknown>,
) => Promise<Wishlist>;
