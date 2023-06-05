import {
  createExchangeFilter as createExchangeFilterAction,
  getExchangeFilter,
  getExchangeFilterError,
  isExchangeFilterLoading,
  resetExchangeFilterState,
} from '@farfetch/blackout-redux';
import { useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, PostExchangeFilterData } from '@farfetch/blackout-client';

/**
 * Provides facilities to create an exchange filter.
 */
function useCreateExchangeFilter() {
  const isCreating = useSelector(isExchangeFilterLoading);
  const error = useSelector(getExchangeFilterError);
  const exchangeFilterResult = useSelector(getExchangeFilter);
  const createExchangeFilter = useAction(createExchangeFilterAction);
  const reset = useAction(resetExchangeFilterState);

  /**
   * Creates an exchange filter. Please note that if there is data for another exchange filter
   * in the redux store, this method will clear it. Will throw if no exchangeFilterData is passed
   * to create the filter.
   *
   * @param exchangeFilterData - Data to create the exchange filter.
   * @param config - Custom configurations to send to the client instance (axios).
   *
   * @returns Promise that will be resolved when the call to the endpoint finishes.
   */
  const create = useCallback(
    (exchangeFilterData: PostExchangeFilterData, config?: Config) => {
      if (!exchangeFilterData) {
        return Promise.reject(new Error('No data to filter provided'));
      }

      reset();

      return createExchangeFilter(exchangeFilterData, config);
    },
    [createExchangeFilter, reset],
  );

  const data = useMemo(() => {
    if (!exchangeFilterResult) {
      return undefined;
    }

    return exchangeFilterResult;
  }, [exchangeFilterResult]);

  return {
    isCreating,
    error,
    data,
    actions: {
      create,
    },
  };
}

export default useCreateExchangeFilter;
