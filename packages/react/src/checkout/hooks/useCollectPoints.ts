import {
  areCollectPointsFetched,
  areCollectPointsLoading,
  fetchCollectPoints,
  getCheckoutOrderId,
  getCollectPoints,
  getCollectPointsError,
  resetCollectPoints,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, GetCollectPointsQuery } from '@farfetch/blackout-client';
import type { UseCollectPointsOptions } from './types/index.js';

function useCollectPoints(
  query?: GetCollectPointsQuery,
  options: UseCollectPointsOptions = {},
) {
  const store = useStore();
  const queryHookParameter = query;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector((state: StoreState) =>
    areCollectPointsLoading(state, query),
  );
  const error = useSelector((state: StoreState) =>
    getCollectPointsError(state, query),
  );
  const isFetched = useSelector((state: StoreState) =>
    areCollectPointsFetched(state, query),
  );
  const collectPoints = useSelector((state: StoreState) =>
    getCollectPoints(state, query),
  );
  const checkoutOrderId = useSelector(getCheckoutOrderId);
  const fetchCollectPointsAction = useAction(fetchCollectPoints);
  const reset = useAction(resetCollectPoints);

  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      query: GetCollectPointsQuery | undefined = queryHookParameter,
    ) => {
      return fetchCollectPointsAction(query, config);
    },
    [fetchCollectPointsAction, fetchConfig, queryHookParameter],
  );

  // If query.orderId parameter was passed and it is different
  // than the current checkoutOrderId in the store, reset all collect points data
  // in redux.
  if (query?.orderId && checkoutOrderId && query?.orderId !== checkoutOrderId) {
    reset();
  }

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = areCollectPointsLoading(updatedState, query);
    const updatedIsFetched = areCollectPointsFetched(updatedState, query);

    if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, store, query]);

  return {
    actions: {
      fetch,
      reset,
    },
    data: collectPoints,
    isLoading,
    isFetched,
    error,
  };
}

export default useCollectPoints;
