/**
 * @module recommendations/selectors
 * @category Recommendations
 * @subcategory Selectors
 */

import {
  getAreRecommendationsLoading,
  getRecommendations,
  getRecommendationsError,
} from './reducer';
import get from 'lodash/get';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductRecommendationResult } from './types';
import type { StoreState } from '../types';

/**
 * Checks if product recommendations has error by strategy name.
 *
 * @function
 *
 * @param state - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns {(object | undefined)} Product recommendations error.
 */
export const getProductRecommendationsError = (
  state: StoreState,
  strategyName: string,
): Error | null | undefined =>
  get(getRecommendationsError(state.recommendations), strategyName);

/**
 * Checks if product recommendations are loading based on a strategy name.
 *
 * @function
 *
 * @param state - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns If the product recommendations are loading or not.
 */
export const isProductRecommendationLoading = (
  state: StoreState,
  strategyName: string,
): boolean | undefined =>
  get(getAreRecommendationsLoading(state.recommendations), strategyName);

/**
 * Gets all the product recommendations results.
 *
 * @function
 *
 * @param state - Application state.
 *
 * @returns The result object containing the product recommendations.
 */
export const getProductRecommendations = (
  state: StoreState,
): ProductRecommendationResult | undefined =>
  getRecommendations(state.recommendations);

/**
 * Gets the product recommendations for a specific strategy.
 *
 * @function
 *
 * @param  state - Application state.
 * @param  strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns The result object containing the product recommendations.
 */
export const getProductRecommendationsByStrategyName = (
  state: StoreState,
  strategyName: string,
): unknown => get(getProductRecommendations(state), strategyName);

/**
 * Gets the product recommendation id by strategy name.
 *
 * @function
 *
 * @param state - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns The id of the product recommendations for a specific strategy.
 */
export const getProductRecommendationsId = (
  state: StoreState,
  strategyName: string,
): string | undefined =>
  get(getProductRecommendations(state), strategyName, {}).id;
