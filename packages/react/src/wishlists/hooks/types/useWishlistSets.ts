import type {
  PostWishlistSetData,
  WishlistSets,
} from '@farfetch/blackout-client';
import type {
  WishlistSetsErrors,
  WishlistSetsHydrated,
  WishlistSetsState,
} from '@farfetch/blackout-redux';

export type UseWishlistSets = () => {
  addWishlistSet: (
    data: PostWishlistSetData,
  ) => Promise<WishlistSets | undefined>;
  allWishlistSetsErrors: WishlistSetsErrors | undefined;
  areLoading: WishlistSetsState['isLoading'];
  error: WishlistSetsState['error'] | undefined;
  fetchWishlistSets: () => Promise<WishlistSets | undefined>;
  isAnyWishlistSetLoading: boolean;
  isAnyWishlistSetWithError: boolean;
  resetWishlistSets: () => void;
  resetWishlistSetsState: (fieldsToReset?: string[]) => void;
  wishlistSets: WishlistSetsHydrated;
};
