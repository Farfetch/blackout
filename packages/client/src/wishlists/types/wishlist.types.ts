import type { WishlistItem } from './wishlistItem.types.js';

export type Wishlist = {
  count: number;
  id: string;
  items: WishlistItem[];
  userId: number | null;
};
