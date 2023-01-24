import {
  areSearchIntentsFetched,
  areSearchIntentsLoading,
  fetchSearchIntents,
  generateSearchIntentsHash,
  getSearchIntentsError,
  getSearchIntentsQuery,
  getSearchIntentsResult,
  resetSearchIntents,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { SearchIntentsQuery } from '@farfetch/blackout-client';
import type { UseSearchIntentsOptions } from './types/index.js';

const useSearchIntents = (
  query: SearchIntentsQuery,
  options: UseSearchIntentsOptions = {},
) => {
  const { enableAutoFetch = true, fetchConfig } = options;
  const hash = generateSearchIntentsHash(query);

  const error = useSelector((state: StoreState) =>
    getSearchIntentsError(state, hash),
  );
  const isLoading = useSelector((state: StoreState) =>
    areSearchIntentsLoading(state, hash),
  );
  const isFetched = useSelector((state: StoreState) =>
    areSearchIntentsFetched(state, hash),
  );
  const searchIntents = useSelector((state: StoreState) =>
    getSearchIntentsResult(state, hash),
  );
  const intentsQuery = useSelector((state: StoreState) =>
    getSearchIntentsQuery(state, hash),
  );

  const fetch = useAction(fetchSearchIntents);
  const reset = useAction(resetSearchIntents);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query]);

  return {
    isLoading,
    error,
    isFetched,
    data: { searchIntents, query: intentsQuery },
    actions: {
      fetch,
      reset,
    },
  };
};

export default useSearchIntents;
