// @ts-nocheck
import {
  areOrderReturnOptionsFetched,
  areOrderReturnOptionsLoading,
  fetchOrderReturnOptions as fetchOrderReturnOptionsAction,
  getOrderReturnOptions,
  getOrderReturnOptionsError,
  type MerchantEntity,
  resetOrderReturnOptions as resetOrderReturnOptionsAction,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, Order } from '@farfetch/blackout-client';
import type { UseOrderReturnOptions } from './types/index.js';

/**
 * Obtains the order return options and actions to perform on them.
 */
function useOrderReturnOptions(
  orderId: Order['id'],
  merchantId?: MerchantEntity['id'],
  options: UseOrderReturnOptions = {},
) {
  const orderIdHookParameter = orderId;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector((state: StoreState) =>
    areOrderReturnOptionsLoading(state, orderIdHookParameter),
  );
  const error = useSelector((state: StoreState) =>
    getOrderReturnOptionsError(state, orderIdHookParameter),
  );
  const orderReturnOptions = useSelector((state: StoreState) =>
    getOrderReturnOptions(state, orderIdHookParameter, merchantId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areOrderReturnOptionsFetched(state, orderIdHookParameter),
  );
  const fetchOrderReturnOptions = useAction(fetchOrderReturnOptionsAction);
  const resetOrderReturnOptions = useAction(resetOrderReturnOptionsAction);

  const fetch = useCallback(
    (orderId?: Order['id'], config?: Config) => {
      const orderIdRequest = orderId || orderIdHookParameter;

      if (!orderIdRequest) {
        return Promise.reject(new Error('No order id was specified.'));
      }

      return fetchOrderReturnOptions(orderIdRequest, config || fetchConfig);
    },
    [fetchConfig, fetchOrderReturnOptions, orderIdHookParameter],
  );

  const reset = useCallback(
    (orderId?: Order['id']) => {
      const orderIdRequest = orderId || orderIdHookParameter;

      if (orderIdRequest) {
        resetOrderReturnOptions([orderIdRequest]);
      }
    },
    [orderIdHookParameter, resetOrderReturnOptions],
  );

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderIdHookParameter) {
      fetch(orderIdHookParameter, fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetch,
    fetchConfig,
    isFetched,
    isLoading,
    orderIdHookParameter,
  ]);

  return {
    actions: {
      fetch,
      reset,
    },
    data: orderReturnOptions,
    error,
    isLoading,
    isFetched,
  };
}

export default useOrderReturnOptions;
