import {
  fetchSearchDidYouMean,
  generateSearchDidYouMeanHash,
  getSearchDidYouMeanError,
  getSearchDidYouMeanQuery,
  getSearchDidYouMeanResult,
  isSearchDidYouMeanFetched,
  isSearchDidYouMeanLoading,
  resetSearchDidYouMean,
  StoreState,
} from '@farfetch/blackout-redux';
import { useAction } from '../../helpers';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { SearchDidYouMeanQuery } from '@farfetch/blackout-client';
import type { UseSearchDidYouMeanOptions } from './types';

const useSearchDidYouMean = (
  query: SearchDidYouMeanQuery,
  options: UseSearchDidYouMeanOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  const hash = generateSearchDidYouMeanHash(query);

  const error = useSelector((state: StoreState) =>
    getSearchDidYouMeanError(state, hash),
  );
  const isLoading = useSelector((state: StoreState) =>
    isSearchDidYouMeanLoading(state, hash),
  );
  const searchDidYouMean = useSelector((state: StoreState) =>
    getSearchDidYouMeanResult(state, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    isSearchDidYouMeanFetched(state, hash),
  );
  const didYouMeanQuery = useSelector((state: StoreState) =>
    getSearchDidYouMeanQuery(state, hash),
  );

  const fetch = useAction(fetchSearchDidYouMean);
  const reset = useAction(resetSearchDidYouMean);

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, error, fetch, fetchConfig, isFetched, isLoading, query]);

  return {
    error,
    isLoading,
    isFetched,
    data: { searchDidYouMean, query: didYouMeanQuery },
    actions: {
      fetch,
      reset,
    },
  };
};

export default useSearchDidYouMean;
