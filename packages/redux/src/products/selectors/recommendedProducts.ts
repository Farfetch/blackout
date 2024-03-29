import { get } from 'lodash-es';
import {
  getAreRecommendedProductsLoading,
  getRecommendedProductsErrors,
  getRecommendedProductsResult,
} from '../reducer/recommendedProducts.js';
import type { StoreState } from '../../types/index.js';

/**
 * Checks if product recommendations has error by strategy name.
 *
 * @param state        - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns Product recommendations error.
 */
export const getRecommendedProductsError = (
  state: StoreState,
  strategyName: string,
) =>
  get(
    getRecommendedProductsErrors(state.products?.recommendedProducts),
    strategyName,
  );

/**
 * Checks if product recommendations are loading based on a strategy name.
 *
 * @param state        - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns If the product recommendations are loading or not.
 */
export const areRecommendedProductsLoading = (
  state: StoreState,
  strategyName: string,
) =>
  get(
    getAreRecommendedProductsLoading(state.products?.recommendedProducts),
    strategyName,
  );

/**
 * Gets all the product recommendations results.
 *
 * @param state - Application state.
 *
 * @returns The result object containing the product recommendations.
 */
export const getRecommendedProducts = (state: StoreState) =>
  getRecommendedProductsResult(state.products?.recommendedProducts);

/**
 * Gets the product recommendations for a specific strategy.
 *
 * @param state        - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns The result object containing the product recommendations.
 */
export const getRecommendedProductsByStrategyName = (
  state: StoreState,
  strategyName: string,
) => get(getRecommendedProducts(state), strategyName);

/**
 * Gets the product recommendation id by strategy name.
 *
 * @param state        - Application state.
 * @param strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns The id of the product recommendations for a specific strategy.
 */
export const getRecommendedProductsId = (
  state: StoreState,
  strategyName: string,
) => get(getRecommendedProducts(state), strategyName)?.id;
