import {
  getOrder,
  getOrderError,
  isOrderFetched,
  isOrderLoading,
  StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useOrders from './useOrders';
import type { Config, Order } from '@farfetch/blackout-client';

export type UseOrderOptions = {
  enableAutoFetch?: boolean;
  fetchConfig?: Config;
};

/**
 * Obtains the user orders and actions to perform on them.
 */
function useOrder(
  orderId: Order['id'],
  guestUserEmail?: string | null,
  options: UseOrderOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const {
    actions: {
      fetchOrderDetails,
      resetOrderDetailsState: resetOrderDetailsStateFromUseOrders,
    },
  } = useOrders({ enableAutoFetch: false });
  const isLoading = useSelector((state: StoreState) =>
    isOrderLoading(state, orderId),
  );
  const error = useSelector((state: StoreState) =>
    getOrderError(state, orderId),
  );
  const order = useSelector((state: StoreState) => getOrder(state, orderId));
  const isFetched = useSelector((state: StoreState) =>
    isOrderFetched(state, orderId),
  );

  const fetch = useCallback(() => {
    return fetchOrderDetails(orderId, guestUserEmail, fetchConfig);
  }, [orderId, fetchOrderDetails, guestUserEmail, fetchConfig]);

  const resetOrderDetailsState = useCallback(() => {
    resetOrderDetailsStateFromUseOrders(orderId);
  }, [resetOrderDetailsStateFromUseOrders, orderId]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderId) {
      fetch();
    }
  }, [enableAutoFetch, fetchConfig, fetch, isFetched, isLoading, orderId]);

  return {
    actions: {
      fetch,
      resetOrderDetailsState,
    },
    data: order,
    error,
    isLoading,
    isFetched,
  };
}

export default useOrder;
