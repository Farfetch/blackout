import { getError, getIsLoading, getResult } from '../reducer/recommendedSet';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { RecommendedSet } from '@farfetch/blackout-client/products/types';
import type { StoreState } from '../../types';

/**
 * Returns the recommended set with out of stock loading condition.
 *
 * @param state - Application state.
 * @param id    - Recommended set id.
 *
 * @returns If the recommended set with out of stock is loading or not.
 */
export const isRecommendedSetLoading = (
  state: StoreState,
  id: RecommendedSet['id'],
): boolean | undefined => getIsLoading(state.products.recommendedSets)[id];

/**
 * Returns the fetched status of a specific recommended set with out of stock.
 *
 * @param state - Application state.
 * @param id    - Recommended set id.
 *
 * @returns If a certain recommended set with out of stock has been fetched or not.
 */
export const isRecommendedSetFetched = (
  state: StoreState,
  id: RecommendedSet['id'],
): boolean =>
  !!getRecommendedSet(state, id) &&
  isRecommendedSetLoading(state, id) === false;

/**
 * Returns the error of a specific recommended set with out of stock.
 *
 * @param state - Application state.
 * @param id    - Recommended set id.
 *
 * @returns The error associated to a specific recommended set with out of stock.
 */
export const getRecommendedSetError = (
  state: StoreState,
  id: RecommendedSet['id'],
): BlackoutError | null | undefined =>
  getError(state.products.recommendedSets)[id];

/**
 * Returns the recommended set for the given id.
 *
 * @param state - Application state.
 * @param id    - Recommended set id.
 *
 * @returns The recommended set for the given id.
 */
export const getRecommendedSet = (
  state: StoreState,
  id: RecommendedSet['id'],
): RecommendedSet | null | undefined =>
  getResult(state.products.recommendedSets)[id];
