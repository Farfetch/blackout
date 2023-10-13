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
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSearchDidYouMeanQuery } from '@farfetch/blackout-client';
import type { UseSearchDidYouMeanOptions } from './types/index.js';

const useSearchDidYouMean = (
  query: GetSearchDidYouMeanQuery,
  options: UseSearchDidYouMeanOptions = {},
) => {
  const store = useStore();
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
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = isSearchDidYouMeanLoading(updatedState, query);
    const updatedIsFetched = isSearchDidYouMeanFetched(updatedState, query);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query, store]);

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
