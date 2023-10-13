import {
  areCategoriesFetched,
  areCategoriesLoading,
  fetchCategories,
  getCategories,
  getCategoriesError,
  resetCategories,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { UseCategoriesOptions } from './types/index.js';

const useCategories = (options: UseCategoriesOptions = {}) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;
  const error = useSelector(getCategoriesError);
  const isLoading = useSelector(areCategoriesLoading);
  const isFetched = useSelector(areCategoriesFetched);
  const categories = useSelector(getCategories);
  const fetch = useAction(fetchCategories);
  const reset = useAction(resetCategories);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = areCategoriesLoading(updatedState);
    const updatedIsFetched = areCategoriesFetched(updatedState);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, store]);

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
