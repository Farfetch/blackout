import type { SharedWishlist } from '@farfetch/blackout-client';
import type { SharedWishlistItemEntity } from './sharedWishlistItem.types.js';

export type SharedWishlistEntity = Omit<SharedWishlist, 'items'> & {
  items: Array<SharedWishlistItemEntity['id']>;
};
