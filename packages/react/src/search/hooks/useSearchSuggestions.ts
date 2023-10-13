import {
  areSearchSuggestionsFetched,
  areSearchSuggestionsLoading,
  fetchSearchSuggestions,
  getSearchSuggestionsError,
  getSearchSuggestionsResult,
  resetSearchSuggestions,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSearchSuggestionsQuery } from '@farfetch/blackout-client';
import type { UseSearchSuggestionsOptions } from './types/index.js';

const useSearchSuggestions = (
  query: GetSearchSuggestionsQuery,
  options: UseSearchSuggestionsOptions = {},
) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;

  const error = useSelector((state: StoreState) =>
    getSearchSuggestionsError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    areSearchSuggestionsLoading(state, query),
  );
  const searchSuggestions = useSelector((state: StoreState) =>
    getSearchSuggestionsResult(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    areSearchSuggestionsFetched(state, query),
  );

  const fetch = useAction(fetchSearchSuggestions);
  const reset = useAction(resetSearchSuggestions);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areSearchSuggestionsLoading(updatedState, query);
    const updatedIsFetched = areSearchSuggestionsFetched(updatedState, query);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query, store]);

  return {
    error,
    isLoading,
    isFetched,
    data: searchSuggestions,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useSearchSuggestions;
