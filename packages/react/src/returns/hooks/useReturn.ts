import {
  fetchReturn as fetchReturnAction,
  getReturn,
  getReturnError,
  isReturnFetched,
  isReturnLoading,
  resetReturnState as resetReturnStateAction,
  StoreState,
  updateReturn as updateReturnAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type {
  Config,
  PatchReturnData,
  Return,
} from '@farfetch/blackout-client';
import type { UseReturnOptions } from './types';

/**
 * Obtains a specific return and actions to perform on it.
 */
function useReturn(returnId: Return['id'], options: UseReturnOptions = {}) {
  const { enableAutoFetch = true, fetchConfig } = options;

  const isLoading = useSelector((state: StoreState) =>
    isReturnLoading(state, returnId),
  );

  const error = useSelector((state: StoreState) =>
    getReturnError(state, returnId),
  );

  const returnEntity = useSelector((state: StoreState) =>
    getReturn(state, returnId),
  );

  const isFetched = useSelector((state: StoreState) =>
    isReturnFetched(state, returnId),
  );

  const fetchReturn = useAction(fetchReturnAction);
  const resetReturnState = useAction(resetReturnStateAction);
  const updateReturn = useAction(updateReturnAction);

  const fetch = useCallback(() => {
    if (!returnId) {
      return Promise.reject('No return id was specified.');
    }

    return fetchReturn(returnId, fetchConfig);
  }, [fetchReturn, fetchConfig, returnId]);

  const update = useCallback(
    (data: PatchReturnData, config?: Config) => {
      if (!returnId) {
        return Promise.reject('No return id was specified.');
      }

      return updateReturn(returnId, data, config);
    },
    [updateReturn, returnId],
  );

  const reset = useCallback(() => {
    if (!returnId) {
      throw new Error('No return id was specified.');
    }

    resetReturnState([returnId]);
  }, [resetReturnState, returnId]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && returnId) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, returnId]);

  return {
    actions: {
      fetch,
      reset,
      update,
    },
    data: returnEntity,
    error,
    isLoading,
    isFetched,
  };
}

export default useReturn;
