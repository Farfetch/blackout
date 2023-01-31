/**
 * @module categories/selectors
 * @category Categories
 * @subcategory Selectors
 */

import { createSelector } from 'reselect';
import {
  getAreCategoriesFetched,
  getAreTopCategoriesFetched,
  getError,
  getIsLoading,
  getTop,
} from './reducer';
import { getCategory, getEntity } from '../../entities/redux/selectors';

/**
 * Retrieves a list of all the categories available.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - List of categories.
 *
 * @example
 * import { getCategories } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = state => ({
 *     categories: getCategories(state)
 * });
 */
export const getCategories = state =>
  Object.values(getEntity(state, 'categories') || {});

/**
 * Retrieves the category details of a given cateogry Id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} id - Category Id to retrieve.
 *
 * @returns {object} - Category details.
 *
 * @example
 * import { getCategoryById } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = (state, props) => {
 *   category: getCategoryById(state, props.categoryId)
 * };
 */
export const getCategoryById = (state, id) => getCategory(state, id);

/**
 * Retrieves the error status of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Error information (`undefined` if there are no errors).
 *
 * @example
 * import { getCategoriesError } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = state => ({
 *     error: getCategoriesError(state)
 * });
 */
export const getCategoriesError = state => getError(state.categories);

/**
 * Retrieves a list of all the top categories (without a parent category).
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} - Top categories list.
 *
 * @example
 * import { getTopCategories } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = state => ({
 *     topCategories: getTopCategories(state)
 * });
 */
export const getTopCategories = createSelector(
  [state => getTop(state.categories), state => getEntity(state, 'categories')],
  (topCategories, categories) => {
    if (!topCategories) {
      return [];
    }

    return topCategories.map(id => categories[id]);
  },
);

/**
 * Retrieves the loading state of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - Loading status of categories.
 *
 * @example
 * import { areCategoriesLoading } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = state => ({
 *     isLoading: areCategoriesLoading(state)
 * });
 */
export const areCategoriesLoading = state => getIsLoading(state.categories);

/**
 * Returns the fetched status of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - If categories are fetched or not.
 *
 * @example
 * import { areCategoriesFetched } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = state => ({
 *     areCategoriesFetched: areCategoriesFetched(state)
 * });
 */
export const areCategoriesFetched = state =>
  getAreCategoriesFetched(state.categories) && !areCategoriesLoading(state);

/**
 * Returns the fetched status of categories.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} - If categories are fetched or not.
 *
 * @example
 * import { areTopCategoriesFetched } from '@farfetch/blackout-core/categories/redux';
 *
 * const mapStateToProps = state => ({
 *     areTopCategoriesFetched: areTopCategoriesFetched(state)
 * });
 */
export const areTopCategoriesFetched = state =>
  getAreTopCategoriesFetched(state.categories) && !areCategoriesLoading(state);
