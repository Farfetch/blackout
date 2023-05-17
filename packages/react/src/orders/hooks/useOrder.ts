import {
  getOrder,
  getOrderError,
  isOrderFetched,
  isOrderLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useOrderReturnOptions from './useOrderReturnOptions.js';
import useUserOrders from './useUserOrders.js';
import type { Config, Order } from '@farfetch/blackout-client';
import type { UseOrderOptions } from './types/index.js';

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
      resetOrderDetails: resetOrderDetailsStateFromUseOrders,
    },
  } = useUserOrders({ enableAutoFetch: false });
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

  /**
   * Fetches the order details. You can override the order id to fetch by using
   * the optional `orderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param guestUserEmail - Overrides the guest user email from the hook. If undefined, the `guestUserEmail` passed to the hook will be used instead.
   * @param orderId  - Overrides the order id from the hook. If undefined, the `orderId` passed to the hook will be used instead. Note that the output of the hook will respect the `orderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      guestUserEmail: string | null | undefined = guestUserEmailHookParameter,
      orderId: Order['id'] = orderIdHookParameter,
    ) => {
      if (!orderId) {
        return Promise.reject(new Error('No order id was specified.'));
      }

      return fetchOrderDetails(orderId, guestUserEmail, config);
    },
    [
      orderIdHookParameter,
      guestUserEmailHookParameter,
      fetchOrderDetails,
      fetchConfig,
    ],
  );

  /**
   * Reset order details state. You can override the order id to reset by using
   * the optional `orderId` parameter.
   *
   * @param orderId  - Overrides the order id from the hook. If undefined, the `orderId` passed to the hook will be used instead.
   */
  const reset = useCallback(
    (orderId: Order['id'] = orderIdHookParameter) => {
      if (orderId) {
        resetOrderDetailsStateFromUseOrders([orderId]);
      }
    },
    [orderIdHookParameter, resetOrderDetailsStateFromUseOrders],
  );

  const {
    isLoading: areReturnOptionsLoading,
    isFetched: areReturnOptionsFetched,
    error: returnOptionsError,
    actions: { fetch: fetchReturnOptions, reset: resetReturnOptions },
  } = useOrderReturnOptions(orderIdHookParameter, {
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
      reset,
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
