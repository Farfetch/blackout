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

/**
 * Checks if product recommendations has error by strategy name.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns {(object | undefined)} Product recommendations error.
 */
export const getProductRecommendationsError = (state, strategyName) =>
  get(getRecommendationsError(state.recommendations), strategyName);

/**
 * Checks if product recommendations are loading based on a strategy name.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns {boolean} If the product recommendations are loading or not.
 */
export const isProductRecommendationLoading = (state, strategyName) =>
  get(getAreRecommendationsLoading(state.recommendations), strategyName);

/**
 * Gets all the product recommendations results.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} The result object containing the product recommendations.
 */
export const getProductRecommendations = state =>
  getRecommendations(state.recommendations);

/**
 * Gets the product recommendations for a specific strategy.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns {object} The result object containing the product recommendations.
 */
export const getProductRecommendationsByStrategyName = (state, strategyName) =>
  get(getProductRecommendations(state), strategyName);

/**
 * Gets the product recommendation id by strategy name.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} strategyName - The strategy name for the specific set of recommendations.
 *
 * @returns {object} The id of the product recommendations for a specifc strategy.
 */
export const getProductRecommendationsId = (state, strategyName) =>
  get(getProductRecommendations(state), strategyName, {}).id;
