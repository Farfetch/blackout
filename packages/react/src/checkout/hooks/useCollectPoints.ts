import {
  areCollectPointsFetched,
  areCollectPointsLoading,
  fetchCollectPoints,
  getCheckoutOrderId,
  getCollectPoints,
  getCollectPointsError,
  resetCollectPointsState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Config, GetCollectPointsQuery } from '@farfetch/blackout-client';
import type { UseCollectPointsOptions } from './types';

function useCollectPoints(
  query?: GetCollectPointsQuery,
  options: UseCollectPointsOptions = {},
) {
  const queryHookParameter = query;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector(areCollectPointsLoading);
  const error = useSelector(getCollectPointsError);
  const isFetched = useSelector(areCollectPointsFetched);
  const collectPoints = useSelector(getCollectPoints);
  const checkoutOrderId = useSelector(getCheckoutOrderId);
  const fetchCollectPointsAction = useAction(fetchCollectPoints);
  const reset = useAction(resetCollectPointsState);

  const fetch = useCallback(
    (
      query: GetCollectPointsQuery | undefined = queryHookParameter,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!query) {
        return Promise.reject(new Error('Invalid `query` value'));
      }

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
    if (!isLoading && !isFetched && enableAutoFetch && queryHookParameter) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, queryHookParameter]);

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
