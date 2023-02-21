import {
  areSearchSuggestionsFetched,
  areSearchSuggestionsLoading,
  fetchSearchSuggestions,
  generateSearchSuggestionsHash,
  getSearchSuggestionsError,
  getSearchSuggestionsQuery,
  getSearchSuggestionsResult,
  resetSearchSuggestions,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { SearchSuggestionsQuery } from '@farfetch/blackout-client';
import type { UseSearchSuggestionsOptions } from './types';

const useSearchSuggestions = (
  query: SearchSuggestionsQuery,
  options: UseSearchSuggestionsOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  const hash = generateSearchSuggestionsHash(query);

  const error = useSelector((state: StoreState) =>
    getSearchSuggestionsError(state, hash),
  );
  const isLoading = useSelector((state: StoreState) =>
    areSearchSuggestionsLoading(state, hash),
  );
  const searchSuggestions = useSelector((state: StoreState) =>
    getSearchSuggestionsResult(state, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    areSearchSuggestionsFetched(state, hash),
  );
  const suggestionsQuery = useSelector((state: StoreState) =>
    getSearchSuggestionsQuery(state, hash),
  );

  const fetch = useAction(fetchSearchSuggestions);
  const reset = useAction(resetSearchSuggestions);

  useEffect(() => {
    if (!isLoading && !error && !isFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, error, fetch, fetchConfig, isFetched, isLoading, query]);

  return {
    error,
    isLoading,
    isFetched,
    data: { searchSuggestions, query: suggestionsQuery },
    actions: {
      fetch,
      reset,
    },
  };
};

export default useSearchSuggestions;
