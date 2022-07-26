import type {
  Config,
  PatchWishlistItemData,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client';
import type {
  WishlistItemHydrated,
  WishlistsState,
} from '@farfetch/blackout-redux';

export type UseWishlistItem = (wishlistItemId: number) => {
  error: WishlistsState['error'] | undefined;
  isLoading: WishlistsState['isLoading'] | undefined;
  item: WishlistItemHydrated | undefined;
  updateWishlistItem: (
    wishlistItemId: WishlistItem['id'],
    data: PatchWishlistItemData,
    config?: Config,
  ) => Promise<Wishlist | undefined>;
  removeWishlistItem: (
    wishlistItemId: WishlistItem['id'],
    config?: Config,
  ) => Promise<Wishlist | undefined>;
};
