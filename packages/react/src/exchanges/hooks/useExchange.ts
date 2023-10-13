import {
  areExchangesLoading,
  createExchange as createExchangeAction,
  fetchExchange as fetchExchangeAction,
  getExchange,
  getExchangeError,
  isExchangeFetched,
  resetExchanges,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import useExchangeBookRequest from './useExchangeBookRequest.js';
import useExchangeFilters from './useExchangeFilters.js';
import type {
  Config,
  Exchange,
  PostExchangeData,
} from '@farfetch/blackout-client';
import type { UseExchangeOptions } from './types/useExchange.js';

/**
 * Provides facilities to manage an exchange.
 */
function useExchange(
  exchangeId?: Exchange['id'],
  options: UseExchangeOptions = {},
) {
  const store = useStore();

  const exchangeIdHookParameter = exchangeId;
  const { enableAutoFetch = true, fetchConfig, orderItemUuid } = options;
  const isLoading = useSelector(areExchangesLoading);
  const error = useSelector(getExchangeError);
  const exchangeResult = useSelector(getExchange);
  const isFetched = useSelector(isExchangeFetched);
  const fetchExchange = useAction(fetchExchangeAction);
  const createExchange = useAction(createExchangeAction);
  const reset = useAction(resetExchanges);

  /**
   * Fetches an exchange. If no exchangeId is passed, the one passed to the hook will be used.
   * Will throw an error if no exchange id is provided to either the hook or the `exchangeId` parameter.
   *
   * @param config - Custom configurations to send to the client instance (axios).
   * @param exchangeId - Exchange id to override the one provided by the hook, if any.
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      exchangeId: Exchange['id'] | undefined = exchangeIdHookParameter,
    ) => {
      if (!exchangeId) {
        return Promise.reject(new Error('No exchangeId provided'));
      }

      return fetchExchange(exchangeId, config);
    },
    [exchangeIdHookParameter, fetchConfig, fetchExchange],
  );

  /**
   * Creates an exchange. Please note that if there is data for another exchange
   * in the redux store, this method will clear it. Will throw if no data is passed
   * to create the exchange.
   *
   * @param data - Data to create the exchange.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Promise that will be resolved when the call to the endpoint finishes.
   */
  const create = useCallback(
    (data: PostExchangeData, config: Config | undefined = fetchConfig) => {
      if (!data) {
        return Promise.reject(new Error('No exchange data provided'));
      }

      reset();

      return createExchange(data, config);
    },
    [fetchConfig, createExchange, reset],
  );

  const {
    actions: {
      fetch: fetchExchangeBookRequest,
      create: createExchangeBookRequest,
    },
  } = useExchangeBookRequest(exchangeIdHookParameter, undefined, {
    enableAutoFetch: false,
  });

  const {
    actions: { create: createExchangeFilter },
  } = useExchangeFilters(orderItemUuid);

  useEffect(() => {
    const updatedState = store.getState() as StoreState;
    const updatedIsLoading = areExchangesLoading(updatedState);
    const updatedIsFetched = isExchangeFetched(updatedState);

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      exchangeIdHookParameter
    ) {
      fetch();
    }
  }, [
    isFetched,
    isLoading,
    enableAutoFetch,
    exchangeIdHookParameter,
    fetch,
    store,
  ]);

  const data = useMemo(() => {
    if (!exchangeResult) {
      return undefined;
    }

    return exchangeResult;
  }, [exchangeResult]);

  return {
    isLoading,
    error,
    data,
    actions: {
      fetch,
      create,
      fetchExchangeBookRequest,
      createExchangeBookRequest,
      createExchangeFilter,
    },
  };
}

export default useExchange;
