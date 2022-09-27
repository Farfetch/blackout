import {
  areOrderReturnOptionsFetched,
  areOrderReturnOptionsLoading,
  fetchOrderReturnOptions as fetchOrderReturnOptionsAction,
  getOrderReturnOptions,
  getOrderReturnOptionsError,
  MerchantEntity,
  resetOrderReturnOptions as resetOrderReturnOptionsAction,
  StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Order } from '@farfetch/blackout-client';
import type { UseOrderReturnOptions } from './types';

/**
 * Obtains the order return options and actions to perform on them.
 */
function useOrderReturnOptions(
  orderId: Order['id'],
  merchantId?: MerchantEntity['id'],
  options: UseOrderReturnOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector((state: StoreState) =>
    areOrderReturnOptionsLoading(state, orderId),
  );
  const error = useSelector((state: StoreState) =>
    getOrderReturnOptionsError(state, orderId),
  );
  const orderReturnOptions = useSelector((state: StoreState) =>
    getOrderReturnOptions(state, orderId, merchantId),
  );
  const isFetched = useSelector((state: StoreState) =>
    areOrderReturnOptionsFetched(state, orderId),
  );
  const fetchOrderReturnOptions = useAction(fetchOrderReturnOptionsAction);
  const resetOrderReturnOptions = useAction(resetOrderReturnOptionsAction);

  const fetch = useCallback(() => {
    if (!orderId) {
      return Promise.reject('No order id was specified.');
    }

    return fetchOrderReturnOptions(orderId, fetchConfig);
  }, [fetchOrderReturnOptions, orderId, fetchConfig]);

  const reset = useCallback(() => {
    if (!orderId) {
      throw new Error('No order id was specified.');
    }

    resetOrderReturnOptions([orderId]);
  }, [orderId, resetOrderReturnOptions]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderId) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, orderId]);

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
