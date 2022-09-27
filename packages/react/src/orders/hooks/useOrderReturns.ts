import {
  areOrderReturnsFetched,
  areOrderReturnsLoading,
  fetchOrderReturns as fetchOrderReturnsAction,
  getOrderReturns,
  getOrderReturnsError,
  MerchantEntity,
  resetOrderReturns as resetOrderReturnsAction,
  StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Order } from '@farfetch/blackout-client';
import type { UseOrderReturnsOptions } from './types';

/**
 * Obtains the order returns and actions to perform on them.
 */
function useOrderReturns(
  orderId: Order['id'],
  merchantId?: MerchantEntity['id'],
  options: UseOrderReturnsOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector((state: StoreState) =>
    areOrderReturnsLoading(state, orderId),
  );
  const error = useSelector((state: StoreState) =>
    getOrderReturnsError(state, orderId),
  );
  const orderReturns = useSelector((state: StoreState) =>
    getOrderReturns(state, orderId, merchantId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areOrderReturnsFetched(state, orderId),
  );
  const fetchOrderReturns = useAction(fetchOrderReturnsAction);
  const resetOrderReturns = useAction(resetOrderReturnsAction);

  const fetch = useCallback(() => {
    if (!orderId) {
      return Promise.reject('No order id was specified.');
    }

    return fetchOrderReturns(orderId, fetchConfig);
  }, [fetchOrderReturns, orderId, fetchConfig]);

  const reset = useCallback(() => {
    if (!orderId) {
      throw new Error('No order id was specified.');
    }

    resetOrderReturns([orderId]);
  }, [orderId, resetOrderReturns]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderId) {
      fetch();
    }
  }, [enableAutoFetch, fetchConfig, fetch, isFetched, isLoading, orderId]);

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
