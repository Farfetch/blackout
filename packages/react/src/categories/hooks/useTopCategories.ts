import {
  areTopCategoriesFetched,
  areTopCategoriesLoading,
  fetchTopCategories,
  getTopCategories,
  getTopCategoriesError,
  resetCategories,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseTopCategoriesOptions } from './types/useTopCategories.js';

const useTopCategories = (options: UseTopCategoriesOptions = {}) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  const error = useSelector(getTopCategoriesError);
  const isLoading = useSelector(areTopCategoriesLoading);
  const isFetched = useSelector(areTopCategoriesFetched);
  const topCategories = useSelector(getTopCategories);
  const fetch = useAction(fetchTopCategories);
  const reset = useAction(resetCategories);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading]);

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
