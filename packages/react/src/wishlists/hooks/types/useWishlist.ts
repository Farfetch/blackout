import type { State } from '@farfetch/blackout-redux/wishlists/types';
import type { Wishlist } from '@farfetch/blackout-client/wishlists/types';
import type { WishlistItemHydrated } from '@farfetch/blackout-redux/entities/types';

export type UseWishlist = () => {
  error: State['error'] | undefined;
  fetchWishlist: () => Promise<Wishlist | undefined>;
  id: State['id'];
  isEmpty: boolean;
  isLoading: boolean;
  itemCount: number;
  items: WishlistItemHydrated[] | undefined;
  itemsWithSetsInfo: WishlistItemHydrated[] | undefined;
  resetWishlist: () => void;
  resetWishlistState: (fieldsToReset?: string[]) => void;
  totalQuantity: number;
  wishlist: State['result'];
};
