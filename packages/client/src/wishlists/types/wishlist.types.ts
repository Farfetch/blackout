import type { WishlistItem } from './wishlistItem.types';

export type Wishlist = {
  count: number;
  id: string;
  items: WishlistItem[];
  userId: number;
};
