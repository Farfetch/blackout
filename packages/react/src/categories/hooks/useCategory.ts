import {
  fetchCategory as fetchCategoryAction,
  getCategory,
  getCategoryError,
  isCategoryFetched,
  isCategoryLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Category } from '@farfetch/blackout-client';
import type { UseCategoryOptions } from './types/useCategory.js';

const useCategory = (
  categoryId: Category['id'],
  options: UseCategoryOptions = {},
) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  const error = useSelector((state: StoreState) =>
    getCategoryError(state, categoryId),
  );
  const isLoading = useSelector((state: StoreState) =>
    isCategoryLoading(state, categoryId),
  );
  const isFetched = useSelector((state: StoreState) =>
    isCategoryFetched(state, categoryId),
  );
  const category = useSelector((state: StoreState) =>
    getCategory(state, categoryId),
  );
  const fetch = useAction(fetchCategoryAction);

  const fetchCategory = useCallback(
    () => fetch(categoryId, fetchConfig),
    [fetch, fetchConfig, categoryId],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = isCategoryLoading(updatedState, categoryId);
    const updatedIsFetched = isCategoryFetched(updatedState, categoryId);

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      categoryId
    ) {
      fetchCategory();
    }
  }, [categoryId, enableAutoFetch, fetchCategory, isFetched, isLoading, store]);

  return {
    isLoading,
    error,
    isFetched,
    data: category,
    actions: {
      fetch: fetchCategory,
    },
  };
};

export default useCategory;
