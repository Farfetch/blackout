import {
  createExchangeBookRequest as createExchangeBookRequestAction,
  fetchExchangeBookRequest as fetchExchangeBookRequestAction,
  getExchangeBookRequest,
  getExchangeBookRequestError,
  isExchangeBookRequestFetched,
  isExchangeBookRequestLoading,
  resetExchangeBookRequestState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type {
  Config,
  Exchange,
  ExchangeBookRequest,
  PostExchangeBookRequestData,
} from '@farfetch/blackout-client';
import type { UseExchangeBookRequestOptions } from './types/useExchangeBookRequest.js';

/**
 * Provides facilities to manage an exchange book request.
 */
function useExchangeBookRequest(
  exchangeId?: Exchange['id'],
  bookRequestId?: ExchangeBookRequest['id'],
  options: UseExchangeBookRequestOptions = {},
) {
  const exchangeIdHookParameter = exchangeId;
  const bookRequestIdHookParameter = bookRequestId;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector(isExchangeBookRequestLoading);
  const error = useSelector(getExchangeBookRequestError);
  const exchangeBookRequestResult = useSelector(getExchangeBookRequest);
  const isFetched = useSelector(isExchangeBookRequestFetched);
  const fetchExchangeBookRequest = useAction(fetchExchangeBookRequestAction);
  const createExchangeBookRequest = useAction(createExchangeBookRequestAction);
  const reset = useAction(resetExchangeBookRequestState);

  /**
   * Fetches an exchange book request. If no exchangeId or bookRequestId is passed, the ones passed to the hook will be used.
   * Will throw an error if no exchange id or book request id is provided to either the hook or both
   * `exchangeId` and `bookRequestId` parameters.
   *
   * @param exchangeId - Exchange id to override the one provided by the hook, if any.
   * @param bookRequestId - Book request id to override the one provided by the hook, if any.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      exchangeId: Exchange['id'] | undefined = exchangeIdHookParameter,
      bookRequestId:
        | ExchangeBookRequest['id']
        | undefined = bookRequestIdHookParameter,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!exchangeId) {
        return Promise.reject(new Error('No exchangeId provided'));
      }

      if (!bookRequestId) {
        return Promise.reject(new Error('No bookRequestId provided'));
      }

      return fetchExchangeBookRequest(exchangeId, bookRequestId, config);
    },
    [
      exchangeIdHookParameter,
      bookRequestIdHookParameter,
      fetchConfig,
      fetchExchangeBookRequest,
    ],
  );

  /**
   * Creates an exchange book request. Please note that if there is data for another book request
   * in the redux store, this method will clear it. Will throw if no exchangeId or data is passed
   * to create the book request.
   *
   * @param exchangeId - Exchange id to override the one provided by the hook, if any.
   * @param data - Data to create the exchange book request.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Promise that will be resolved when the call to the endpoint finishes.
   */
  const create = useCallback(
    (
      exchangeId: Exchange['id'] | undefined = exchangeIdHookParameter,
      data: PostExchangeBookRequestData,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!exchangeId) {
        return Promise.reject(new Error('No exchangeId provided'));
      }

      if (!data) {
        return Promise.reject(
          new Error('No exchange book request data provided'),
        );
      }

      reset();

      return createExchangeBookRequest(exchangeId, data, config);
    },
    [exchangeIdHookParameter, fetchConfig, createExchangeBookRequest, reset],
  );

  useEffect(() => {
    if (
      !isLoading &&
      !isFetched &&
      enableAutoFetch &&
      exchangeIdHookParameter &&
      bookRequestIdHookParameter
    ) {
      fetch();
    }
  }, [
    isLoading,
    isFetched,
    enableAutoFetch,
    exchangeIdHookParameter,
    bookRequestIdHookParameter,
    fetch,
  ]);

  const data = useMemo(() => {
    if (!exchangeBookRequestResult) {
      return undefined;
    }

    return exchangeBookRequestResult;
  }, [exchangeBookRequestResult]);

  return {
    isLoading,
    error,
    data,
    actions: {
      fetch,
      create,
    },
  };
}

export default useExchangeBookRequest;
