import {
  areOrderReturnsFetched,
  areOrderReturnsLoading,
  fetchOrderReturns as fetchOrderReturnsAction,
  getOrderReturns,
  getOrderReturnsError,
  type MerchantEntity,
  resetOrderReturns as resetOrderReturnsAction,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, Order } from '@farfetch/blackout-client';
import type { UseOrderReturnsOptions } from './types/index.js';

/**
 * Obtains the order returns and actions to perform on them.
 */
function useOrderReturns(
  orderId: Order['id'],
  merchantId?: MerchantEntity['id'],
  options: UseOrderReturnsOptions = {},
) {
  const orderIdHookParameter = orderId;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector((state: StoreState) =>
    areOrderReturnsLoading(state, orderIdHookParameter),
  );
  const error = useSelector((state: StoreState) =>
    getOrderReturnsError(state, orderIdHookParameter),
  );
  const orderReturns = useSelector((state: StoreState) =>
    getOrderReturns(state, orderIdHookParameter, merchantId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areOrderReturnsFetched(state, orderIdHookParameter),
  );
  const fetchOrderReturns = useAction(fetchOrderReturnsAction);
  const resetOrderReturns = useAction(resetOrderReturnsAction);

  const fetch = useCallback(
    (orderId?: Order['id'], config?: Config) => {
      const orderIdRequest = orderId || orderIdHookParameter;

      if (!orderIdRequest) {
        return Promise.reject(new Error('No order id was specified.'));
      }

      return fetchOrderReturns(orderIdRequest, config || fetchConfig);
    },
    [orderIdHookParameter, fetchOrderReturns, fetchConfig],
  );

  const reset = useCallback(
    (orderId?: Order['id']) => {
      const orderIdRequest = orderId || orderIdHookParameter;

      if (orderIdRequest) {
        resetOrderReturns([orderIdRequest]);
      }
    },
    [orderIdHookParameter, resetOrderReturns],
  );

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderIdHookParameter) {
      fetch();
    }
  }, [
    enableAutoFetch,
    fetchConfig,
    fetch,
    isFetched,
    isLoading,
    orderIdHookParameter,
  ]);

  return {
    actions: {
      fetch,
      reset,
    },
    data: orderReturns,
    error,
    isLoading,
    isFetched,
  };
}

export default useOrderReturns;
