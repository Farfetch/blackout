import type { AxiosRequestConfig } from 'axios';
import type {
  PostWishlistItemActionData,
  WishlistItemHydrated,
  WishlistsState,
} from '@farfetch/blackout-redux';
import type { Wishlist } from '@farfetch/blackout-client';

export type UseWishlist = () => {
  error: WishlistsState['error'] | undefined;
  fetchWishlist: (
    wishlistId: number,
    config?: AxiosRequestConfig,
  ) => Promise<Wishlist | undefined>;
  addWishlistItem: (
    data: PostWishlistItemActionData,
    config?: AxiosRequestConfig,
  ) => Promise<Wishlist | undefined>;
  id: WishlistsState['id'];
  isEmpty: boolean;
  isLoading: boolean;
  itemCount: number;
  items: WishlistItemHydrated[] | undefined;
  itemsWithSetsInfo: WishlistItemHydrated[] | undefined;
  resetWishlist: () => void;
  resetWishlistState: (fieldsToReset?: string[]) => void;
  totalQuantity: number;
  wishlist: WishlistsState['result'];
};
