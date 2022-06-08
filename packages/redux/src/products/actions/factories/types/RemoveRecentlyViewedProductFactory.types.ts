import type { DeleteRecentlyViewedProduct } from '@farfetch/blackout-client/products/types';
import type { Dispatch } from 'redux';
import type { RemoveRecentlyViewedProductAction } from '../../../types';

export type RemoveRecentlyViewedProductFactory<
  T extends DeleteRecentlyViewedProduct,
> = (
  deleteRecentlyViewedProduct: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<RemoveRecentlyViewedProductAction>) => ReturnType<T>;
