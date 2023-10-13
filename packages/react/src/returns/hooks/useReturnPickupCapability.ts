import {
  fetchReturnPickupCapability as fetchReturnPickupCapabilityAction,
  getReturnPickupCapability,
  getReturnPickupCapabilityError,
  isReturnPickupCapabilityFetched,
  isReturnPickupCapabilityLoading,
  resetReturnPickupCapability as resetReturnPickupCapabilityStateAction,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
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
  const store = useStore();

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
  const resetReturnPickupCapability = useAction(
    resetReturnPickupCapabilityStateAction,
  );

  /**
   * Fetches the pickup capability for the specified day. You can override both the
   * pickup day and return id to fetch by using the optional `pickupDay` and `returnId` parameters.
   * However, the output from the hook will respect the pickup day and return id passed to it and not the overrides.
   *
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param pickupDay - Overrides the pickup day from the hook. If undefined, the `pickupDay` passed to the hook will be used instead. Note that the output of the hook will respect the `pickupDay` parameter from the hook.
   * @param returnId  - Overrides the return id from the hook. If undefined, the `returnId` passed to the hook will be used instead. Note that the output of the hook will respect the `returnId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      pickupDay: string | undefined = pickupDayHookParameter,
      returnId: Return['id'] | undefined = returnIdHookParameter,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      if (!pickupDay) {
        return Promise.reject(new Error('No pickup day was specified.'));
      }

      return fetchReturnPickupCapability(returnId, pickupDay, config);
    },
    [
      fetchConfig,
      fetchReturnPickupCapability,
      pickupDayHookParameter,
      returnIdHookParameter,
    ],
  );

  /**
   * Reset return pickup capability state. You can override both the pickup day and return id
   * to reset by using the optional `pickupDay` and `returnId` parameters.
   *
   * @param pickupDay  - Overrides the pickup day from the hook. If undefined, the `pickupDay` passed to the hook will be used instead.
   * @param returnId  - Overrides the return id from the hook. If undefined, the `returnId` passed to the hook will be used instead.
   */
  const reset = useCallback(
    (
      pickupDay: string | undefined = pickupDayHookParameter,
      returnId: Return['id'] | undefined = returnIdHookParameter,
    ) => {
      if (returnId && pickupDay) {
        resetReturnPickupCapability([{ returnId, pickupDay }]);
      }
    },
    [
      pickupDayHookParameter,
      resetReturnPickupCapability,
      returnIdHookParameter,
    ],
  );

  useEffect(() => {
    if (pickupDayHookParameter && returnIdHookParameter) {
      const updatedState = store.getState() as StoreState;

      const updatedIsLoading = isReturnPickupCapabilityLoading(
        updatedState,
        returnIdHookParameter,
        pickupDayHookParameter,
      );
      const updatedIsFetched = isReturnPickupCapabilityFetched(
        updatedState,
        returnIdHookParameter,
        pickupDayHookParameter,
      );

      if (!updatedIsLoading && !updatedIsFetched && enableAutoFetch) {
        fetch();
      }
    }
  }, [
    enableAutoFetch,
    fetch,
    fetchConfig,
    returnIdHookParameter,
    store,
    pickupDayHookParameter,
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
