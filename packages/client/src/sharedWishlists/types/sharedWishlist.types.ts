import type { SharedWishlistItem } from './sharedWishlistItem.types';

export type SharedWishlist = {
  id: string;
  name: string;
  description: string;
  hasMissingItems: boolean;
  dateCreated: string;
  items: SharedWishlistItem[];
};
