import {
  areTopCategoriesFetched,
  areTopCategoriesLoading,
  fetchTopCategories,
  getTopCategories,
  getTopCategoriesError,
  resetCategories,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseTopCategoriesOptions } from './types/useTopCategories.js';

const useTopCategories = (options: UseTopCategoriesOptions = {}) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  const error = useSelector(getTopCategoriesError);
  const isLoading = useSelector(areTopCategoriesLoading);
  const isFetched = useSelector(areTopCategoriesFetched);
  const topCategories = useSelector(getTopCategories);
  const fetch = useAction(fetchTopCategories);
  const reset = useAction(resetCategories);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = areTopCategoriesLoading(updatedState);
    const updatedIsFetched = areTopCategoriesFetched(updatedState);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, store]);

  return {
    isLoading,
    error,
    isFetched,
    data: topCategories,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useTopCategories;
