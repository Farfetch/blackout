import type {
  PatchWishlistItemData,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client';

export type WishlistItemId = WishlistItem['id'];

export type HandleUpdateWishlistItem = (
  data: PatchWishlistItemData,
) => Promise<Wishlist | undefined>;
