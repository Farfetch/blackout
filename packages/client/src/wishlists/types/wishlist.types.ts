import type { User } from '../../index.js';
import type { WishlistItem } from './wishlistItem.types.js';

export type Wishlist = {
  count: number;
  id: string;
  items: WishlistItem[];
  userId: User['id'] | null;
};
