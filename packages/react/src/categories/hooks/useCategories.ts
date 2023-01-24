import {
  areCategoriesFetched,
  areCategoriesLoading,
  fetchCategories,
  getCategories,
  getCategoriesError,
  resetCategoriesState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseCategoriesOptions } from './types/index.js';

const useCategories = (options: UseCategoriesOptions = {}) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  const error = useSelector(getCategoriesError);
  const isLoading = useSelector(areCategoriesLoading);
  const isFetched = useSelector(areCategoriesFetched);
  const categories = useSelector(getCategories);
  const fetch = useAction(fetchCategories);
  const reset = useAction(resetCategoriesState);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading]);

  const data = useMemo(
    () => categories && Object.values(categories),
    [categories],
  );

  return {
    isLoading,
    error,
    isFetched,
    data,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useCategories;
