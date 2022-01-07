import type { DeleteRecentlyViewedProducts } from '@farfetch/blackout-client/recentlyViewed/types';
import type { Dispatch } from 'redux';
import type { RemoveRecentlyViewedProductAction } from '../../../types';

export type RemoveRecentlyViewedProductsFactory<
  T extends DeleteRecentlyViewedProducts,
> = (
  deleteRecentlyViewedProducts: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<RemoveRecentlyViewedProductAction>) => ReturnType<T>;
