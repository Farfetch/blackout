import {
  getRecommendedSetWithOutOfStockError as getRecommendedSetWithOutOfStockErrorReducer,
  getRecommendedSetWithOutOfStockIsLoading,
} from '../reducer';

/**
 * Returns the recommended set with out of stock loading condition.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {boolean} If the recommended set with out of stock is loading or not.
 */
export const isRecommendedSetWithOutOfStockLoading = (state, id) =>
  getRecommendedSetWithOutOfStockIsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific recommended set with out of stock.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {boolean} If a certain recommended set with out of stock has been fetched or not.
 */
export const isRecommendedSetWithOutOfStockFetched = (state, id) =>
  getRecommendedSetWithOutOfStockIsLoading(state.details).hasOwnProperty(id) &&
  isRecommendedSetWithOutOfStockLoading(state, id) === false;

/**
 * Returns the error of a specific recommended set with out of stock.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Recommended set id.
 *
 * @returns {object} The error associated to a specific recommended set with out of stock.
 */
export const getRecommendedSetWithOutOfStockError = (state, id) =>
  getRecommendedSetWithOutOfStockErrorReducer(state.details)[id];
