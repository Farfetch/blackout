import type { Dispatch } from 'redux';
import type { FetchRecommendedProductsAction } from '../../../types/index.js';
import type { GetRecommendedProducts } from '@farfetch/blackout-client';

export type FetchRecommendedProductsFactory<T extends GetRecommendedProducts> =
  (
    getRecommendedProducts: T,
  ) => (
    ...args: Parameters<T>
  ) => (dispatch: Dispatch<FetchRecommendedProductsAction>) => ReturnType<T>;
