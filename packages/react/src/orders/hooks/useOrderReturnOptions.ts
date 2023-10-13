import {
  areOrderReturnOptionsFetched,
  areOrderReturnOptionsLoading,
  fetchOrderReturnOptions as fetchOrderReturnOptionsAction,
  getOrderReturnOptions,
  getOrderReturnOptionsError,
  resetOrderReturnOptions as resetOrderReturnOptionsAction,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, Order } from '@farfetch/blackout-client';
import type { UseOrderReturnOptions } from './types/index.js';

/**
 * Obtains the order return options and actions to perform on them.
 */
function useOrderReturnOptions(
  orderId: Order['id'],
  options: UseOrderReturnOptions = {},
) {
  const store = useStore();

  const orderIdHookParameter = orderId;
  const { enableAutoFetch = true, fetchConfig } = options;
  const isLoading = useSelector((state: StoreState) =>
    areOrderReturnOptionsLoading(state, orderIdHookParameter),
  );
  const error = useSelector((state: StoreState) =>
    getOrderReturnOptionsError(state, orderIdHookParameter),
  );
  const orderReturnOptions = useSelector((state: StoreState) =>
    getOrderReturnOptions(state, orderIdHookParameter),
  );
  const isFetched = useSelector((state: StoreState) =>
    areOrderReturnOptionsFetched(state, orderIdHookParameter),
  );
  const fetchOrderReturnOptions = useAction(fetchOrderReturnOptionsAction);
  const resetOrderReturnOptions = useAction(resetOrderReturnOptionsAction);

  /**
   * Fetches the order return options. You can override the order id to fetch return
   * options by using  the optional `orderId` parameter. However, the output from
   * the hook will respect the order id passed to it and not the override.
   *
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param orderId - Overrides the order id from the hook. If undefined, the `orderId` passed to the hook will be used instead. Note that the output of the hook will respect the `orderId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      orderId: Order['id'] = orderIdHookParameter,
    ) => {
      if (!orderId) {
        return Promise.reject(new Error('No order id was specified.'));
      }

      return fetchOrderReturnOptions(orderId, config);
    },
    [fetchConfig, fetchOrderReturnOptions, orderIdHookParameter],
  );

  /**
   * Reset order return options state. You can override the order id to reset by using
   * the optional `orderId` parameter.
   *
   * @param orderId  - Overrides the order id from the hook. If undefined, the orderId passed to the hook will be used instead.
   */
  const reset = useCallback(
    (orderId: Order['id'] = orderIdHookParameter) => {
      if (orderId) {
        resetOrderReturnOptions([orderId]);
      }
    },
    [orderIdHookParameter, resetOrderReturnOptions],
  );

  useEffect(() => {
    const updatedState = store.getState() as StoreState;

    const updatedIsLoading = areOrderReturnOptionsLoading(
      updatedState,
      orderIdHookParameter,
    );
    const updatedIsFetched = areOrderReturnOptionsFetched(
      updatedState,
      orderIdHookParameter,
    );

    if (
      !updatedIsLoading &&
      !updatedIsFetched &&
      enableAutoFetch &&
      orderIdHookParameter
    ) {
      fetch();
    }
  }, [enableAutoFetch, fetch, fetchConfig, store, orderIdHookParameter]);

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
