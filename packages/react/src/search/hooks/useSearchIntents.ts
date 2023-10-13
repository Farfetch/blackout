import {
  areSearchIntentsFetched,
  areSearchIntentsLoading,
  fetchSearchIntents,
  getSearchIntentsError,
  getSearchIntentsResult,
  resetSearchIntents,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { GetSearchIntentsQuery } from '@farfetch/blackout-client';
import type { UseSearchIntentsOptions } from './types/index.js';

const useSearchIntents = (
  query: GetSearchIntentsQuery,
  options: UseSearchIntentsOptions = {},
) => {
  const store = useStore();

  const { enableAutoFetch = true, fetchConfig } = options;

  const error = useSelector((state: StoreState) =>
    getSearchIntentsError(state, query),
  );
  const isLoading = useSelector((state: StoreState) =>
    areSearchIntentsLoading(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    areSearchIntentsFetched(state, query),
  );
  const searchIntents = useSelector((state: StoreState) =>
    getSearchIntentsResult(state, query),
  );

  const fetch = useAction(fetchSearchIntents);
  const reset = useAction(resetSearchIntents);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areSearchIntentsLoading(updatedState, query);
    const updatedIsFetched = areSearchIntentsFetched(updatedState, query);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch(query, fetchConfig);
    }
  }, [enableAutoFetch, fetch, fetchConfig, isFetched, isLoading, query, store]);

  return {
    isLoading,
    error,
    isFetched,
    data: searchIntents,
    actions: {
      fetch,
      reset,
    },
  };
};

export default useSearchIntents;
