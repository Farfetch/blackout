/**
 * Hook to provide data for logic around categories and top categories.
 *
 * @module useCategories
 * @category Categories
 * @subcategory Hooks
 */
import {
  areCategoriesFetched as areCategoriesFetchedSelector,
  areCategoriesLoading as areCategoriesLoadingSelector,
  areTopCategoriesFetched as areTopCategoriesFetchedSelector,
  areTopCategoriesLoading as areTopCategoriesLoadingSelector,
  fetchCategories as fetchCategoriesAction,
  fetchTopCategories as fetchTopCategoriesAction,
  getCategoriesError,
  getTopCategories,
  getTopCategoriesError,
  resetCategoriesState as resetCategoriesStateAction,
} from '@farfetch/blackout-redux/categories';
import { getCategories } from '@farfetch/blackout-redux/entities';
import { useAction } from '../../helpers';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { GetRootCategory, UseCategories } from './types';

/**
 * It provides actions, selectors and methods for categories data.
 *
 * @memberof module:categories/hooks
 *
 * @returns {object} All the info needed to use categories.
 */
const useCategories: UseCategories = () => {
  // Selectors
  const categoriesError = useSelector(getCategoriesError);
  const topCategoriesError = useSelector(getTopCategoriesError);
  const areCategoriesLoading = useSelector(areCategoriesLoadingSelector);
  const areTopCategoriesLoading = useSelector(areTopCategoriesLoadingSelector);
  const areCategoriesFetched = useSelector(areCategoriesFetchedSelector);
  const areTopCategoriesFetched = useSelector(areTopCategoriesFetchedSelector);
  const categories = useSelector(getCategories) || {};
  const topCategories = useSelector(getTopCategories);
  /**
   * Gets a specific category by id.
   *
   * @function getCategory
   * @param {string} [id] - The id of the category to get.
   * @returns {object} - The requested category.
   */
  const getCategory = useCallback(id => categories[id], [categories]);

  /**
   * Gets the root category of a specific category by id.
   *
   * @function getRootCategory
   * @param {string} [id] - The id of the category.
   * @returns {object} - The requested root category.
   */
  // Since this is a recursive function, the use of a hook here, like the preferable
  // `useSelector`, is not recommended because it will break the rules of hooks.
  const getRootCategory: GetRootCategory = useCallback(
    id => {
      const category = categories[id];

      return category?.parentId ? getRootCategory(category.parentId) : category;
    },
    [categories],
  );

  // Actions
  const fetchCategories = useAction(fetchCategoriesAction);
  const fetchTopCategories = useAction(fetchTopCategoriesAction);
  const resetCategoriesState = useAction(resetCategoriesStateAction);

  return {
    /**
     * Whether the categories are already fetched.
     *
     * @type {boolean}
     */
    areCategoriesFetched,
    /**
     * Whether the categories are loading.
     *
     * @type {boolean}
     */
    areCategoriesLoading,
    /**
     * Whether the top categories are already fetched.
     *
     * @type {boolean}
     */
    areTopCategoriesFetched,
    /**
     * Whether the top categories are loading.
     *
     * @type {boolean}
     */
    areTopCategoriesLoading,
    /**
     * Categories result.
     *
     * @type {Array}
     */
    categories: Object.values(categories),
    /**
     * Categories error.
     *
     * @type {object|undefined}
     */
    categoriesError,
    /**
     * Fetches the categories.
     *
     * @type {Function}
     */
    fetchCategories,
    /**
     * Fetches the top categories.
     *
     * @type {Function}
     */
    fetchTopCategories,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useCategories~getCategory|getCategory} method
     */
    getCategory,
    /**
     * @type {Function}
     * @variation Member
     *
     * @see {@link module:useCategories~getRootCategory|getRootCategory} method
     */
    getRootCategory,
    /**
     * Resets the categories state.
     *
     * @type {Function}
     */
    resetCategoriesState,
    /**
     * Top categories result.
     *
     * @type {Array}
     */
    topCategories,
    /**
     * Top categories error.
     *
     * @type {object|undefined}
     */
    topCategoriesError,
  };
};

export default useCategories;
