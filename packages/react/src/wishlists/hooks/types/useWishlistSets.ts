import type {
  PostWishlistSetData,
  WishlistSets,
} from '@farfetch/blackout-client/wishlists/types';
import type { SetsState } from '@farfetch/blackout-redux/wishlists/types';
import type { WishlistSetsErrors } from '@farfetch/blackout-redux/wishlists/selectors/types';
import type { WishlistSetsHydrated } from '@farfetch/blackout-redux/entities/types';

export type UseWishlistSets = () => {
  addWishlistSet: (
    data: PostWishlistSetData,
  ) => Promise<WishlistSets | undefined>;
  allWishlistSetsErrors: WishlistSetsErrors | undefined;
  areLoading: SetsState['isLoading'];
  error: SetsState['error'] | undefined;
  fetchWishlistSets: () => Promise<WishlistSets | undefined>;
  isAnyWishlistSetLoading: boolean;
  isAnyWishlistSetWithError: boolean;
  resetWishlistSets: () => void;
  resetWishlistSetsState: (fieldsToReset?: string[]) => void;
  wishlistSets: WishlistSetsHydrated;
};
