import {
  fetchSearchDidYouMean,
  getSearchDidYouMeanError,
  getSearchDidYouMeanResult,
  isSearchDidYouMeanFetched,
  isSearchDidYouMeanLoading,
  resetSearchDidYouMean,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSearchDidYouMeanQuery } from '@farfetch/blackout-client';
import type { UseSearchDidYouMeanOptions } from './types/index.js';

const useSearchDidYouMean = (
  query: GetSearchDidYouMeanQuery,
  options: UseSearchDidYouMeanOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;

  const error = useSelector((state: StoreState) =>
    getSearchDidYouMeanError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    isSearchDidYouMeanLoading(state, query),
  );
  const searchDidYouMean = useSelector((state: StoreState) =>
    getSearchDidYouMeanResult(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    isSearchDidYouMeanFetched(state, query),
  );

  const fetch = useAction(fetchSearchDidYouMean);
  const reset = useAction(resetSearchDidYouMean);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query]);

  return {
    error,
    isLoading,
    isFetched,
    data: searchDidYouMean,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useSearchDidYouMean;
