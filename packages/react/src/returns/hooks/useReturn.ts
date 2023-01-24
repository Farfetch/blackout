import {
  type BlackoutError,
  type Config,
  type PatchReturnData,
  type PostReturnData,
  type Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  getReturn,
  getReturnError,
  isReturnFetched,
  isReturnLoading,
  type StoreState,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useReturnPickupCapability from './useReturnPickupCapability.js';
import useReturnPickupRescheduleRequests from './useReturnPickupRescheduleRequests.js';
import useUserReturns from './useUserReturns.js';
import type { UseReturnOptions } from './types/index.js';

/**
 * Provides facilities to manage a return.
 */
function useReturn(returnId?: Return['id'], options: UseReturnOptions = {}) {
  const returnIdHookParameter = returnId;
  const { enableAutoFetch = true, fetchConfig } = options;
  const [createdReturnId, setCreatedReturnId] = useState<
    Return['id'] | undefined
  >(undefined);
  const [isCreatingReturn, setIsCreatingReturn] = useState(false);
  const [createReturnError, setCreateReturnError] =
    useState<BlackoutError | null>(null);

  const isLoading = useSelector((state: StoreState) =>
    returnIdHookParameter
      ? isReturnLoading(state, returnIdHookParameter)
      : isCreatingReturn,
  );

  const error = useSelector((state: StoreState) =>
    returnIdHookParameter
      ? getReturnError(state, returnIdHookParameter)
      : createReturnError,
  );

  const implicitReturnId = returnIdHookParameter || createdReturnId;

  const returnEntity = useSelector((state: StoreState) => {
    if (implicitReturnId) {
      return getReturn(state, implicitReturnId);
    }

    return undefined;
  });

  const isFetched = useSelector((state: StoreState) =>
    returnIdHookParameter
      ? isReturnFetched(state, returnIdHookParameter)
      : (!!returnEntity || createReturnError) && !isCreatingReturn,
  );

  const {
    actions: { fetchReturn, resetReturnState, updateReturn, createReturn },
  } = useUserReturns({ enableAutoFetch: false });

  /**
   * Fetches the return details. You can override the return id to fetch
   * by using the optional `returnId` parameter. However, the output from
   * the hook will respect the return id passed to it and not the override.
   *
   * @param config - Custom configurations to send to the client instance (axios). If undefined, the `fetchConfig` passed to the hook will be used instead.
   * @param returnId  - Overrides the return id from the hook. If undefined, the `returnId` passed to the hook will be used instead. Note that the output of the hook will respect the `returnId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      returnId: Return['id'] | undefined = implicitReturnId,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      return fetchReturn(returnId, config);
    },
    [fetchReturn, fetchConfig, implicitReturnId],
  );

  /**
   * Updates the return. You can override the return id to update by using
   * the optional `returnId` parameter. However, the output from
   * the hook will respect the return id passed to it and not the override.
   *
   * @param data - Patch return data.
   * @param config - Custom configurations to send to the client instance (axios).
   * @param returnId  - Overrides the return id from the hook. If undefined, the `returnId` passed to the hook will be used instead. Note that the output of the hook will respect the `returnId` parameter from the hook.
   *
   * @returns Promise that will resolve when the call to the endpoint finishes.
   */
  const update = useCallback(
    (
      data?: PatchReturnData,
      config?: Config,
      returnId: Return['id'] | undefined = implicitReturnId,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      if (!data) {
        return Promise.reject(new Error('No data was specified.'));
      }

      return updateReturn(returnId, data, config);
    },
    [updateReturn, implicitReturnId],
  );

  const create = useCallback(
    (data: PostReturnData, config?: Config) => {
      // Do not allow a request to create if a returnId is set.
      // This is because the isLoading/error/data will be out-of-sync
      // as the hook will give priority to the passed in returnId when
      // calculating those values instead of looking at the create return ones.
      if (returnIdHookParameter) {
        const error = toBlackoutError(
          new Error("Cannot call 'create' when 'returnId' is set"),
        );

        setCreateReturnError(error);

        return Promise.reject(error);
      }

      setIsCreatingReturn(true);
      setCreateReturnError(null);
      setCreatedReturnId(undefined);

      // Due to a bug in how node/jest handles unhandled promises
      // (see https://github.com/facebook/jest/issues/9210) await is not
      // being used here, instead we need to use .then with 2 handlers.
      // This is because if await was used instead, the jest test would
      // crash, although it would work at runtime.
      const createReturnPromise = createReturn(data, config).then(
        createdReturn => {
          setIsCreatingReturn(false);
          setCreatedReturnId(createdReturn.id);
        },
        e => {
          setIsCreatingReturn(false);
          setCreateReturnError(e as BlackoutError);
        },
      );

      return createReturnPromise;
    },
    [createReturn, returnIdHookParameter],
  );

  /**
   * Reset return state. You can override the return id to reset by using
   * the optional `returnId` parameter.
   *
   * @param returnId  - Overrides the return id from the hook. If undefined, the `returnId` passed to the hook or the created return id will be used instead.
   */
  const reset = useCallback(
    (returnId: Return['id'] | undefined = implicitReturnId) => {
      setCreateReturnError(null);
      setCreatedReturnId(undefined);
      setIsCreatingReturn(false);

      if (returnId) {
        resetReturnState([returnId]);
      }
    },
    [implicitReturnId, resetReturnState],
  );

  // Clear create return state every time the hook is rendered
  // with a returnId parameter passed and there is any changes to create
  // return state. This will discard the current render if the
  // create return state values were different than the initial values.
  // Do not change this to a useEffect call to avoid an unnecessary
  // render of all child components of the component that uses this hook.
  if (returnIdHookParameter) {
    if (createdReturnId || isCreatingReturn || createReturnError) {
      setCreateReturnError(null);
      setCreatedReturnId(undefined);
      setIsCreatingReturn(false);
    }

    if (returnIdHookParameter !== createdReturnId && createdReturnId) {
      reset(createdReturnId);
    }
  }

  // We can only export the actions here since the pickupDay parameter
  // will always be undefined, so the pickup capability state can never
  // be fetched correctly from the hook.
  const {
    actions: { fetch: fetchPickupCapability, reset: resetPickupCapability },
  } = useReturnPickupCapability(implicitReturnId, undefined, {
    enableAutoFetch: false,
  });

  const {
    data: pickupRescheduleRequests,
    isLoading: arePickupRescheduleRequestsLoading,
    error: pickupRescheduleRequestsError,
    actions: {
      fetch: fetchPickupRescheduleRequests,
      create: createPickupRescheduleRequest,
      fetchPickupRescheduleRequest,
    },
  } = useReturnPickupRescheduleRequests(implicitReturnId, {
    enableAutoFetch: false,
  });

  const data = useMemo(() => {
    const hasAnyData = returnEntity || pickupRescheduleRequests;

    if (!hasAnyData) {
      return undefined;
    }

    return {
      ...returnEntity,
      pickupRescheduleRequests,
    };
  }, [returnEntity, pickupRescheduleRequests]);

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && returnIdHookParameter) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, returnIdHookParameter]);

  return {
    actions: {
      fetch,
      reset,
      update,
      create,
      fetchPickupCapability,
      resetPickupCapability,
      fetchPickupRescheduleRequests,
      createPickupRescheduleRequest,
      fetchPickupRescheduleRequest,
    },
    data,
    returnError: error,
    isReturnLoading: isLoading,
    isReturnFetched: isFetched,
    arePickupRescheduleRequestsLoading,
    pickupRescheduleRequestsError,
  };
}

export default useReturn;
