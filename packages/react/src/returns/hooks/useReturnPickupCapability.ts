import {
  fetchReturnPickupCapability as fetchReturnPickupCapabilityAction,
  getReturnPickupCapability,
  getReturnPickupCapabilityError,
  isReturnPickupCapabilityFetched,
  isReturnPickupCapabilityLoading,
  resetReturnPickupCapabilityState as resetReturnPickupCapabilityStateAction,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction.js';
import type { Config, Return } from '@farfetch/blackout-client';
import type { UseReturnPickupCapabilityOptions } from './types/useReturnPickupCapability.js';

/**
 * Obtains the pickup capability for a specific return and pickup day.
 */
function useReturnPickupCapability(
  returnId?: Return['id'],
  pickupDay?: string,
  options: UseReturnPickupCapabilityOptions = {},
) {
  const returnIdHookParameter = returnId;
  const pickupDayHookParameter = pickupDay;
  const { enableAutoFetch = true, fetchConfig } = options;

  const isLoading = useSelector((state: StoreState) =>
    pickupDayHookParameter && returnIdHookParameter
      ? isReturnPickupCapabilityLoading(
          state,
          returnIdHookParameter,
          pickupDayHookParameter,
        )
      : false,
  );
  const error = useSelector((state: StoreState) =>
    pickupDayHookParameter && returnIdHookParameter
      ? getReturnPickupCapabilityError(
          state,
          returnIdHookParameter,
          pickupDayHookParameter,
        )
      : null,
  );
  const returnPickupCapability = useSelector((state: StoreState) =>
    pickupDayHookParameter && returnIdHookParameter
      ? getReturnPickupCapability(
          state,
          returnIdHookParameter,
          pickupDayHookParameter,
        )
      : undefined,
  );
  const isFetched = useSelector((state: StoreState) =>
    pickupDayHookParameter && returnIdHookParameter
      ? isReturnPickupCapabilityFetched(
          state,
          returnIdHookParameter,
          pickupDayHookParameter,
        )
      : false,
  );

  const fetchReturnPickupCapability = useAction(
    fetchReturnPickupCapabilityAction,
  );
  const resetReturnPickupCapabilityState = useAction(
    resetReturnPickupCapabilityStateAction,
  );

  const fetch = useCallback(
    (returnId?: Return['id'], pickupDay?: string, config?: Config) => {
      const returnIdRequest = returnId || returnIdHookParameter;

      if (!returnIdRequest) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      const pickupDayRequest = pickupDay || pickupDayHookParameter;

      if (!pickupDayRequest) {
        return Promise.reject(new Error('No pickup day was specified.'));
      }

      return fetchReturnPickupCapability(
        returnIdRequest,
        pickupDayRequest,
        config || fetchConfig,
      );
    },
    [
      fetchConfig,
      fetchReturnPickupCapability,
      pickupDayHookParameter,
      returnIdHookParameter,
    ],
  );

  const reset = useCallback(
    (returnId?: Return['id'], pickupDay?: string) => {
      const returnIdRequest = returnId || returnIdHookParameter;
      const pickupDayRequest = pickupDay || pickupDayHookParameter;

      if (returnIdRequest && pickupDayRequest) {
        resetReturnPickupCapabilityState([
          { returnId: returnIdRequest, pickupDay: pickupDayRequest },
        ]);
      }
    },
    [
      pickupDayHookParameter,
      resetReturnPickupCapabilityState,
      returnIdHookParameter,
    ],
  );

  useEffect(() => {
    if (
      !isLoading &&
      !isFetched &&
      enableAutoFetch &&
      returnIdHookParameter &&
      pickupDay
    ) {
      fetch(returnIdHookParameter, pickupDay, fetchConfig);
    }
  }, [
    enableAutoFetch,
    fetch,
    isFetched,
    isLoading,
    pickupDay,
    fetchConfig,
    returnIdHookParameter,
  ]);

  return {
    actions: {
      fetch,
      reset,
    },
    data: returnPickupCapability,
    error,
    isLoading,
    isFetched,
  };
}

export default useReturnPickupCapability;
