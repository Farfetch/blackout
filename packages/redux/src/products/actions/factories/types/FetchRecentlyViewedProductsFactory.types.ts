import type { Dispatch } from 'redux';
import type { FetchRecentlyViewedProductsAction } from '../../../types/index.js';
import type { GetRecentlyViewedProducts } from '@farfetch/blackout-client';
import type { StoreState } from '../../../../types/index.js';

export type FetchRecentlyViewedProductsFactory<
  T extends GetRecentlyViewedProducts,
> = (
  getRecentlyViewedProducts: T,
) => (
  ...args: Parameters<T>
) => (
  dispatch: Dispatch<FetchRecentlyViewedProductsAction>,
  getState: () => StoreState,
) => ReturnType<T>;
