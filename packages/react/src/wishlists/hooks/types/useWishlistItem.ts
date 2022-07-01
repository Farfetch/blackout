import type { AxiosRequestConfig } from 'axios';
import type {
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
    config?: AxiosRequestConfig,
  ) => Promise<Wishlist | undefined>;
  removeWishlistItem: (
    wishlistItemId: WishlistItem['id'],
    config?: AxiosRequestConfig,
  ) => Promise<Wishlist | undefined>;
};
