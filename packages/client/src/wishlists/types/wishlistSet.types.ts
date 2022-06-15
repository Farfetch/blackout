import type { WishlistItem } from './wishlistItem.types';

export type WishlistSetItem = {
  createdByStaffMemberId?: string | null;
  dateCreated: string | null;
  wishlistItemId: WishlistItem['id'];
  quantity?: WishlistItem['quantity'];
};

export type WishlistSet = {
  createdByStaffMemberId?: string | null;
  dateCreated: string | null;
  description?: string;
  name: string;
  setId: string;
  wishlistSetItems: Array<WishlistSetItem>;
};