import type { DeleteRecentlyViewedProduct } from '@farfetch/blackout-client';
import type { Dispatch } from 'redux';
import type { RemoveRecentlyViewedProductAction } from '../../../types/index.js';

export type RemoveRecentlyViewedProductFactory<
  T extends DeleteRecentlyViewedProduct,
> = (
  deleteRecentlyViewedProduct: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<RemoveRecentlyViewedProductAction>) => ReturnType<T>;
