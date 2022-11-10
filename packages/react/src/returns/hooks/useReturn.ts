import {
  BlackoutError,
  Config,
  PatchReturnData,
  PostReturnData,
  Return,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  createReturn as createReturnAction,
  fetchReturn as fetchReturnAction,
  getReturn,
  getReturnError,
  isReturnFetched,
  isReturnLoading,
  resetReturnState as resetReturnStateAction,
  StoreState,
  updateReturn as updateReturnAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useAction from '../../helpers/useAction';
import useReturnPickupCapability from './useReturnPickupCapability';
import type { UseReturnOptions } from './types';

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

  const fetchReturn = useAction(fetchReturnAction);
  const resetReturnState = useAction(resetReturnStateAction);
  const updateReturn = useAction(updateReturnAction);
  const createReturn = useAction(createReturnAction);

  const fetch = useCallback(
    (returnId?: Return['id'], config?: Config) => {
      const returnIdRequest = returnId || implicitReturnId;

      if (!returnIdRequest) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      return fetchReturn(returnIdRequest, config || fetchConfig);
    },
    [fetchReturn, fetchConfig, implicitReturnId],
  );

  const update = useCallback(
    (returnId?: Return['id'], data?: PatchReturnData, config?: Config) => {
      const returnIdRequest = returnId || implicitReturnId;

      if (!returnIdRequest) {
        return Promise.reject(new Error('No return id was specified.'));
      }

      if (!data) {
        return Promise.reject(new Error('No data was specified.'));
      }

      return updateReturn(returnIdRequest, data, config);
    },
    [updateReturn, implicitReturnId],
  );

  const create = useCallback(
    async (data: PostReturnData, config?: Config) => {
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

  const reset = useCallback(
    (returnId?: Return['id']) => {
      const returnIdRequest = returnId || implicitReturnId;

      setCreateReturnError(null);
      setCreatedReturnId(undefined);
      setIsCreatingReturn(false);

      if (returnIdRequest) {
        resetReturnState([returnIdRequest]);
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
  // will be always undefined, so the pickup capability state can never
  // be fetched correctly from the hook.
  const {
    actions: { fetch: fetchPickupCapability, reset: resetPickupCapability },
  } = useReturnPickupCapability(implicitReturnId, undefined, {
    enableAutoFetch: false,
  });

  const data = useMemo(() => {
    if (!returnEntity) {
      return undefined;
    }

    return {
      ...returnEntity,
    };
  }, [returnEntity]);

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
    },
    data,
    returnError: error,
    isReturnLoading: isLoading,
    isReturnFetched: isFetched,
  };
}

export default useReturn;
