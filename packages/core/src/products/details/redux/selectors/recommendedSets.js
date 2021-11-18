import { getProduct } from '../../../../entities/redux/selectors';
import {
  getRecommendedSetError as getRecommendedSetErrorReducer,
  getRecommendedSetIsLoading,
} from '../reducer';
import get from 'lodash/get';

/**
 * Returns the loading recommended set condition.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {boolean} If the recommended set are loading or not.
 */
export const isRecommendedSetLoading = (state, id) =>
  getRecommendedSetIsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific recommended set.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {boolean} If a certain recommended set has been fetched or not.
 */
export const isRecommendedSetFetched = (state, id) =>
  getRecommendedSetIsLoading(state.details).hasOwnProperty(id) &&
  isRecommendedSetLoading(state, id) === false;

/**
 * Returns the error to a specific recommended set.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {object} The error associated to a specific recommended set.
 */
export const getRecommendedSetError = (state, id) =>
  getRecommendedSetErrorReducer(state.details)[id];

/**
 * Returns the recommended set ID associated to a product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {number|undefined} Recommended set ID.
 */
export const getProductRecommendedSetId = (state, id) => {
  const product = getProduct(state, id);
  const recommendedSetId = get(product, 'recommendedSet');

  // This is temporarily necessary because a product without recommended set
  // associated has an recommendedSet: 0
  return recommendedSetId ? recommendedSetId : undefined;
};
