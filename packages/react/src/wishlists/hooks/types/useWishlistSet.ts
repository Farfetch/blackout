import type { AxiosRequestConfig } from 'axios';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  PatchWishlistSetData,
  WishlistSet,
} from '@farfetch/blackout-client/wishlists/types';
import type { WishlistSetHydrated } from '@farfetch/blackout-redux/entities/types';

export type UseWishlistSet = (setId: WishlistSet['setId']) => {
  error: Error | null | undefined;
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
