import {
  createExchangeFilter as createExchangeFilterAction,
  getExchangeFilterById,
  getExchangeFilterError,
  getExchangeFilters,
  isExchangeFilterLoading,
  resetExchangeFilters,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, OrderItem } from '@farfetch/blackout-client';
import type { PostExchangeFilterDataHook } from './index.js';

/**
 * Provides facilities to manage exchange filters.
 */
function useExchangeFilters(orderItemUuid?: OrderItem['shippingOrderLineId']) {
  const orderItemUuidHookParameter = orderItemUuid;
  const isLoading = useSelector((state: StoreState) =>
    orderItemUuidHookParameter
      ? isExchangeFilterLoading(state, orderItemUuidHookParameter)
      : false,
  );
  const error = useSelector((state: StoreState) =>
    orderItemUuidHookParameter
      ? getExchangeFilterError(state, orderItemUuidHookParameter)
      : null,
  );
  const exchangeFilters = useSelector((state: StoreState) =>
    orderItemUuidHookParameter
      ? getExchangeFilterById(state, orderItemUuidHookParameter)
      : getExchangeFilters(state),
  );
  const createExchangeFilter = useAction(createExchangeFilterAction);
  const reset = useAction(resetExchangeFilters);

  /**
   * Creates an exchange filter. This method will save the exchange filter by orderItemUuid without
   * replacing existing filters. Will throw in the following conditions:
   * - exchangeFilterData parameter is not passed;
   * - or no usable `orderItemUuid` is found. If it is not passed in `exchangeFilterData`, the one passed on the hook call will be used.
   *
   * Please notice that if you pass a value for the orderItemUuid property inside exchangeFilterData parameter,
   * the values for isLoading, error and exchangeFilters properties returned by the hook
   * will not be based on it as the hook bases those values on the value of the orderItemUuid that was passed to the hook.
   * If you need to call the create action with a different value for the orderItemUuid property that was passed to the hook,
   * do not rely on the values returned by hook for the isLoading, error and exchangeFilters properties.
   *
   * @param exchangeFilterData - Data to create the exchange filter.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Promise that will be resolved when the call to the endpoint finishes.
   */
  const create = useCallback(
    (exchangeFilterData: PostExchangeFilterDataHook, config?: Config) => {
      if (!exchangeFilterData) {
        return Promise.reject(new Error('No data to filter provided'));
      }

      // Although exchangeFilterItems is an array, it only has 1 object at a time, so it's safe to
      // directly access the first index.
      const orderItemUuid =
        exchangeFilterData.exchangeFilterItems[0]?.orderItemUuid;

      if (!orderItemUuid && !orderItemUuidHookParameter) {
        return Promise.reject(
          new Error(
            'No orderItemUuid provided to either the hook or the create function',
          ),
        );
      }

      if (!orderItemUuid && orderItemUuidHookParameter) {
        exchangeFilterData.exchangeFilterItems.forEach(item => {
          item.orderItemUuid = orderItemUuidHookParameter;
        });
      }

      return createExchangeFilter(exchangeFilterData, config);
    },
    [createExchangeFilter, orderItemUuidHookParameter],
  );

  const data = useMemo(() => {
    return exchangeFilters;
  }, [exchangeFilters]);

  return {
    isLoading,
    error,
    data,
    actions: {
      create,
      reset,
    },
  };
}

export default useExchangeFilters;
