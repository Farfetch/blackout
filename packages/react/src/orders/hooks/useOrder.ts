import {
  getOrder,
  getOrderError,
  isOrderFetched,
  isOrderLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useOrderReturnOptions from './useOrderReturnOptions';
import useOrders from './useOrders';
import type { Config, Order } from '@farfetch/blackout-client';
import type { UseOrderOptions } from './types';

/**
 * Obtains the user orders and actions to perform on them.
 */
function useOrder(
  orderId: Order['id'],
  guestUserEmail?: string | null,
  options: UseOrderOptions = {},
) {
  const orderIdHookParameter = orderId;
  const guestUserEmailHookParameter = guestUserEmail;
  const { enableAutoFetch = true, fetchConfig } = options;
  const {
    actions: {
      fetchOrderDetails,
      resetOrderDetailsState: resetOrderDetailsStateFromUseOrders,
    },
  } = useOrders({ enableAutoFetch: false });
  const isLoading = useSelector((state: StoreState) =>
    isOrderLoading(state, orderIdHookParameter),
  );
  const error = useSelector((state: StoreState) =>
    getOrderError(state, orderIdHookParameter),
  );
  const order = useSelector((state: StoreState) =>
    getOrder(state, orderIdHookParameter),
  );
  const isFetched = useSelector((state: StoreState) =>
    isOrderFetched(state, orderIdHookParameter),
  );

  const fetch = useCallback(
    (
      orderId?: Order['id'],
      guestUserEmail?: string | null,
      config?: Config,
    ) => {
      const orderIdRequest = orderId || orderIdHookParameter;

      if (!orderIdRequest) {
        return Promise.reject(new Error('No order id was specified.'));
      }

      const guestUserEmailRequest =
        guestUserEmail || guestUserEmailHookParameter;

      return fetchOrderDetails(
        orderIdRequest,
        guestUserEmailRequest,
        config || fetchConfig,
      );
    },
    [
      orderIdHookParameter,
      guestUserEmailHookParameter,
      fetchOrderDetails,
      fetchConfig,
    ],
  );

  const resetOrderDetailsState = useCallback(
    (orderId?: Order['id']) => {
      const orderIdRequest = orderId || orderIdHookParameter;

      if (orderIdRequest) {
        resetOrderDetailsStateFromUseOrders([orderIdRequest]);
      }
    },
    [orderIdHookParameter, resetOrderDetailsStateFromUseOrders],
  );

  const {
    isLoading: areReturnOptionsLoading,
    isFetched: areReturnOptionsFetched,
    error: returnOptionsError,
    actions: { fetch: fetchReturnOptions, reset: resetReturnOptions },
  } = useOrderReturnOptions(orderIdHookParameter, undefined, {
    enableAutoFetch: false,
  });

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderIdHookParameter) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, orderIdHookParameter]);

  return {
    actions: {
      fetch,
      resetOrderDetailsState,
      fetchReturnOptions,
      resetReturnOptions,
    },
    data: order,
    orderError: error,
    returnOptionsError,
    isOrderLoading: isLoading,
    isOrderFetched: isFetched,
    areReturnOptionsFetched,
    areReturnOptionsLoading,
  };
}

export default useOrder;
