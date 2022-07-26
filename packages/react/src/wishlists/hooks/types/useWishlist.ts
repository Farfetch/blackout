import type { Config, Wishlist } from '@farfetch/blackout-client';
import type {
  PostWishlistItemActionData,
  WishlistItemHydrated,
  WishlistsState,
} from '@farfetch/blackout-redux';

export type UseWishlist = () => {
  error: WishlistsState['error'] | undefined;
  fetchWishlist: (
    wishlistId: Wishlist['id'],
    config?: Config,
  ) => Promise<Wishlist | undefined>;
  addWishlistItem: (
    data: PostWishlistItemActionData,
    config?: Config,
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
