import type { Config } from '../../index.js';
import type { Wishlist } from './wishlist.types.js';
import type { WishlistItem } from './wishlistItem.types.js';

export type DeleteWishlistItem = (
  id: Wishlist['id'],
  itemId: WishlistItem['id'],
  config?: Config,
) => Promise<Wishlist>;
