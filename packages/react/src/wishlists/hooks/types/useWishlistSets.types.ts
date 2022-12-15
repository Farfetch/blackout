import type {
  PostWishlistSetData,
  WishlistSet,
  WishlistSets,
} from '@farfetch/blackout-client';
import type {
  WishlistSetsDenormalized,
  WishlistSetsErrors,
  WishlistSetsState,
} from '@farfetch/blackout-redux';

export type UseWishlistSets = () => {
  addWishlistSet: (
    data: PostWishlistSetData,
  ) => Promise<WishlistSet | undefined>;
  allWishlistSetsErrors: WishlistSetsErrors | undefined;
  areLoading: WishlistSetsState['isLoading'];
  error: WishlistSetsState['error'] | undefined;
  fetchWishlistSets: () => Promise<WishlistSets | undefined>;
  isAnyWishlistSetLoading: boolean;
  isAnyWishlistSetWithError: boolean;
  resetWishlistSets: () => void;
  resetWishlistSetsState: (fieldsToReset?: string[]) => void;
  wishlistSets: WishlistSetsDenormalized | undefined;
};
