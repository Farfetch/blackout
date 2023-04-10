import {
  getError,
  getIsLoading,
  getResult,
} from '../reducer/recommendedProductSet.js';
import type { ProductsState } from '../types/index.js';
import type { RecommendedProductSet } from '@farfetch/blackout-client';
import type { StoreState } from '../../types/index.js';

/**
 * Returns the recommended product set loading condition.
 *
 * @param state - Application state.
 * @param id    - Recommended product set id.
 *
 * @returns If the recommended product set is loading or not.
 */
export const isRecommendedProductSetLoading = (
  state: StoreState,
  id: RecommendedProductSet['id'],
) => getIsLoading((state.products as ProductsState).recommendedProductSets)[id];

/**
 * Returns the fetched status of a specific recommended product set.
 *
 * @param state - Application state.
 * @param id    - Recommended product set id.
 *
 * @returns If a certain recommended product set has been fetched or not.
 */
export const isRecommendedProductSetFetched = (
  state: StoreState,
  id: RecommendedProductSet['id'],
) =>
  (!!getRecommendedProductSet(state, id) ||
    !!getRecommendedProductSetError(state, id)) &&
  isRecommendedProductSetLoading(state, id) === false;

/**
 * Returns the error of a specific recommended product set.
 *
 * @param state - Application state.
 * @param id    - Recommended product set id.
 *
 * @returns The error associated to a specific recommended product set.
 */
export const getRecommendedProductSetError = (
  state: StoreState,
  id: RecommendedProductSet['id'],
) => getError((state.products as ProductsState).recommendedProductSets)[id];

/**
 * Returns the recommended product set for the given id.
 *
 * @param state - Application state.
 * @param id    - Recommended product set id.
 *
 * @returns The recommended product set for the given id.
 */
export const getRecommendedProductSet = (
  state: StoreState,
  id: RecommendedProductSet['id'],
) => getResult((state.products as ProductsState).recommendedProductSets)[id];
