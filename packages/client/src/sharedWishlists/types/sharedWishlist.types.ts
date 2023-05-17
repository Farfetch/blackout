import type { SharedWishlistItem } from './sharedWishlistItem.types.js';

export type SharedWishlist = {
  id: string;
  name: string;
  description: string;
  hasMissingItems: boolean;
  dateCreated: string;
  items: SharedWishlistItem[];
};
