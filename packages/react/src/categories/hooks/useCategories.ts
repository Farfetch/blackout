/**
 * Hook to provide data for logic around categories and top categories.
 */
import {
  areCategoriesFetched as areCategoriesFetchedSelector,
  areCategoriesLoading as areCategoriesLoadingSelector,
  areTopCategoriesFetched as areTopCategoriesFetchedSelector,
  areTopCategoriesLoading as areTopCategoriesLoadingSelector,
  fetchCategories as fetchCategoriesAction,
  fetchTopCategories as fetchTopCategoriesAction,
  getCategories,
  getCategoriesError,
  getTopCategories,
  getTopCategoriesError,
  resetCategoriesState as resetCategoriesStateAction,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import type { Category } from '@farfetch/blackout-client';
import type { GetRootCategory, UseCategories } from './types';

/**
 * It provides actions, selectors and methods for categories data.
 *
 * @returns All the info needed to use categories.
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
   * @param id - The id of the category to get.
   *
   * @returns - The requested category.
   */
  const getCategory = useCallback(
    (id: Category['id']) => categories[id],
    [categories],
  );

  /**
   * Gets the root category of a specific category by id.
   *
   * @param id - The id of the category.
   *
   * @returns - The requested root category.
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
     */
    areCategoriesFetched,
    /**
     * Whether the categories are loading.
     */
    areCategoriesLoading,
    /**
     * Whether the top categories are already fetched.
     */
    areTopCategoriesFetched,
    /**
     * Whether the top categories are loading.
     */
    areTopCategoriesLoading,
    /**
     * Categories result.
     */
    categories: Object.values(categories),
    /**
     * Categories error.
     */
    categoriesError,
    /**
     * Fetches the categories.
     */
    fetchCategories,
    /**
     * Fetches the top categories.
     */
    fetchTopCategories,

    getCategory,

    getRootCategory,
    /**
     * Resets the categories state.
     */
    resetCategoriesState,
    /**
     * Top categories result.
     */
    topCategories,
    /**
     * Top categories error.
     */
    topCategoriesError,
  };
};

export default useCategories;
