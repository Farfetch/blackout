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
import type { Return } from '@farfetch/blackout-client';
import type { UseReturnPickupCapabilityOptions } from './types/useReturnPickupCapability';

/**
 * Obtains the pickup capability for a specific return and pickup day.
 */
function useReturnPickupCapability(
  returnId: Return['id'],
  pickupDay: string,
  options: UseReturnPickupCapabilityOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;

  const isLoading = useSelector((state: StoreState) =>
    isReturnPickupCapabilityLoading(state, returnId, pickupDay),
  );
  const error = useSelector((state: StoreState) =>
    getReturnPickupCapabilityError(state, returnId, pickupDay),
  );
  const returnPickupCapability = useSelector((state: StoreState) =>
    getReturnPickupCapability(state, returnId, pickupDay),
  );
  const isFetched = useSelector((state: StoreState) =>
    isReturnPickupCapabilityFetched(state, returnId, pickupDay),
  );
  const fetchReturnPickupCapability = useAction(
    fetchReturnPickupCapabilityAction,
  );
  const resetReturnPickupCapabilityState = useAction(
    resetReturnPickupCapabilityStateAction,
  );

  const fetch = useCallback(() => {
    if (!returnId) {
      return Promise.reject('No return id was specified.');
    }

    if (!pickupDay) {
      return Promise.reject('No pickup day was specified.');
    }

    return fetchReturnPickupCapability(returnId, pickupDay, fetchConfig);
  }, [returnId, pickupDay, fetchReturnPickupCapability, fetchConfig]);

  const reset = useCallback(() => {
    if (!returnId) {
      throw new Error('No return id was specified.');
    }

    if (!pickupDay) {
      throw new Error('No pickup day was specified.');
    }

    resetReturnPickupCapabilityState([{ returnId, pickupDay }]);
  }, [pickupDay, resetReturnPickupCapabilityState, returnId]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && returnId && pickupDay) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, returnId, pickupDay]);

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
