import type { AxiosRequestConfig } from 'axios';
import type {
  BlackoutError,
  PatchWishlistSetData,
  WishlistSet,
} from '@farfetch/blackout-client';
import type { WishlistSetHydrated } from '@farfetch/blackout-redux';

export type UseWishlistSet = (setId: WishlistSet['setId']) => {
  error: BlackoutError | null | undefined;
  isFetched: boolean | undefined;
  isLoading: boolean | undefined;
  itemsCounter: number;
  removeWishlistSet: (
    wishlistSetId: WishlistSet['setId'],
    config?: AxiosRequestConfig,
  ) => Promise<undefined>;
  totalQuantity: number;
  updateWishlistSet: (
    wishlistSetId: WishlistSet['setId'],
    data: PatchWishlistSetData,
    config?: AxiosRequestConfig,
  ) => Promise<WishlistSet | undefined>;
  wishlistSet: WishlistSetHydrated | undefined;
};
