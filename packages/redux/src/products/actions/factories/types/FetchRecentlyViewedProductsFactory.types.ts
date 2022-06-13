import type { Dispatch } from 'redux';
import type { FetchRecentlyViewedProductsAction } from '../../../types';
import type { GetRecentlyViewedProducts } from '@farfetch/blackout-client';
import type { StoreState } from '../../../../types';

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
