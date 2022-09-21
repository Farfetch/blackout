import {
  areTopCategoriesFetched,
  areTopCategoriesLoading,
  fetchTopCategories,
  getTopCategories,
  getTopCategoriesError,
  resetCategoriesState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { UseTopCategoriesOptions } from './types/useTopCategories';

const useTopCategories = (options: UseTopCategoriesOptions = {}) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  const error = useSelector(getTopCategoriesError);
  const isLoading = useSelector(areTopCategoriesLoading);
  const isFetched = useSelector(areTopCategoriesFetched);
  const topCategories = useSelector(getTopCategories);
  const fetch = useAction(fetchTopCategories);
  const reset = useAction(resetCategoriesState);

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, error, fetch, fetchConfig, isFetched, isLoading]);

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
