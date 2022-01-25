import type { AxiosRequestConfig } from 'axios';
import type {
  PatchWishlistItemData,
  Wishlist,
  WishlistItem,
} from '@farfetch/blackout-client/wishlists/types';
import type { State } from '@farfetch/blackout-redux/wishlists/types';
import type { WishlistItemHydrated } from '@farfetch/blackout-redux/entities/types';

export type UseWishlistItem = (wishlistItemId: number) => {
  error: State['error'] | undefined;
  isLoading: State['isLoading'] | undefined;
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
