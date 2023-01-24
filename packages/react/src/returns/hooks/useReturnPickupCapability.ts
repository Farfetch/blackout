import {
  fetchReturnPickupCapability as fetchReturnPickupCapabilityAction,
  getReturnPickupCapability,
  getReturnPickupCapabilityError,
  isReturnPickupCapabilityFetched,
  isReturnPickupCapabilityLoading,
  resetReturnPickupCapabilityState as resetReturnPickupCapabilityStateAction,
  StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import type { Config, Return } from '@farfetch/blackout-client';
import type { UseReturnPickupCapabilityOptions } from './types/useReturnPickupCapability';

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

  /**
   * Fetches the pickup capability for the specified day. You can override the
   * return id to fetch by using the optional `returnId` parameter. However, the output from the
   * hook will respect the return id passed to it and not the override.
   *
   * @param pickupDay - The desired pickup day in iso format (yyyy-MM-dd).
   * @param config - Custom configurations to send to the client instance (axios).
   * @param returnId  - Overrides the return id from the hook. If undefined, the returnId passed to the hook will be used instead. Note that the output of the hook will respect the `returnId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      pickupDay: string | undefined = pickupDayHookParameter,
      config?: Config,
      returnId: Return['id'] | undefined = returnIdHookParameter,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      const pickupDayRequest = pickupDay || pickupDayHookParameter;

      if (!pickupDayRequest) {
        return Promise.reject(new Error('No pickup day was specified.'));
      }

      return fetchReturnPickupCapability(
        returnId,
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
      fetch(pickupDay, fetchConfig);
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
