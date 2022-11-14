import {
  BlackoutError,
  Config,
  getReturnPickupRescheduleRequest,
  getReturnPickupRescheduleRequests,
  PickupRescheduleRequest,
  PickupRescheduleRequests,
  postReturnPickupRescheduleRequest,
  PostReturnPickupRescheduleRequestData,
  Return,
} from '@farfetch/blackout-client';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { UseReturnPickupRescheduleRequestsOptions } from './types';

const actionTypes = {
  FetchPickupRescheduleRequestsRequest:
    'FETCH_PICKUP_RESCHEDULE_REQUESTS_REQUEST',
  FetchPickupRescheduleRequestsSuccess:
    'FETCH_PICKUP_RESCHEDULE_REQUESTS_SUCCESS',
  FetchPickupRescheduleRequestsFailure:
    'FETCH_PICKUP_RESCHEDULE_REQUESTS_FAILURE',
  ClearPickupRescheduleRequestsState: 'CLEAR_PICKUP_RESCHEDULE_REQUESTS_STATE',
} as const;

type State = {
  isLoading: boolean;
  error: BlackoutError | null;
  result?: PickupRescheduleRequests;
  currentRequestId: number;
  currentReturnId: Return['id'];
} | null;

type FetchActionBase = {
  meta: {
    requestId: number;
    returnId: Return['id'];
    isSyncedWithHookParams: boolean;
  };
};

type FetchPickupRescheduleRequestsRequestAction = FetchActionBase & {
  type: typeof actionTypes.FetchPickupRescheduleRequestsRequest;
};

type FetchPickupRescheduleRequestsSuccessAction = FetchActionBase & {
  type: typeof actionTypes.FetchPickupRescheduleRequestsSuccess;
  payload: PickupRescheduleRequests;
};

type FetchPickupRescheduleRequestsFailureAction = FetchActionBase & {
  type: typeof actionTypes.FetchPickupRescheduleRequestsFailure;
  payload: BlackoutError;
};

type ClearPickupRescheduleRequestsStateAction = {
  type: typeof actionTypes.ClearPickupRescheduleRequestsState;
};

type Action =
  | FetchPickupRescheduleRequestsFailureAction
  | FetchPickupRescheduleRequestsRequestAction
  | FetchPickupRescheduleRequestsSuccessAction
  | ClearPickupRescheduleRequestsStateAction;

const initialState: State = null;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.FetchPickupRescheduleRequestsRequest: {
      const isSyncedWithHookParams = action.meta.isSyncedWithHookParams;

      if (!isSyncedWithHookParams) {
        return state;
      }

      const actionReturnId = action.meta.returnId;

      const newState = {
        isLoading: true,
        error: null,
        currentRequestId: action.meta.requestId,
        currentReturnId: action.meta.returnId,
        // If the action is requesting data for the same return
        // keep the previous result on the state, otherwise
        // set it to undefined.
        result:
          actionReturnId === state?.currentReturnId ? state.result : undefined,
      };

      return newState;
    }
    case actionTypes.FetchPickupRescheduleRequestsSuccess: {
      // Do not update the state if:
      // - the returnId from the action is not equal to the returnId parameter from the hook.
      // - the returnId from the action is not equal to the returnId from the state (set on the request action dispatch).
      // - the returnIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      if (
        !action.meta.isSyncedWithHookParams ||
        !state ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentReturnId !== action.meta.returnId
      ) {
        return state;
      }

      const newState = {
        ...state,
        isLoading: false,
        result: action.payload,
      };

      return newState;
    }
    case actionTypes.FetchPickupRescheduleRequestsFailure: {
      // Do not update the state if:
      // - the returnId from the action is not equal to the returnId parameter from the hook.
      // - the returnId from the action is not equal to the returnId from the state (set on the request action dispatch).
      // - the returnIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      if (
        !action.meta.isSyncedWithHookParams ||
        !state ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentReturnId !== action.meta.returnId
      ) {
        return state;
      }

      const newState = {
        ...state,
        isLoading: false,
        error: action.payload,
      };

      return newState;
    }
    case actionTypes.ClearPickupRescheduleRequestsState: {
      return initialState;
    }
    default:
      return state;
  }
}

function useReturnPickupRescheduleRequests(
  returnId?: Return['id'],
  options: UseReturnPickupRescheduleRequestsOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const currentRequestId = useRef(0);
  const returnIdHookParameter = returnId;
  const [state, dispatch] = useReducer(reducer, initialState);
  const returnIdRequestState =
    returnIdHookParameter === state?.currentReturnId ? state : undefined;
  const isLoading = returnIdRequestState?.isLoading || false;
  const error = returnIdRequestState?.error || null;
  const data = returnIdRequestState?.result;
  const isFetched = !!(data || error) && !isLoading;

  const fetch = useCallback(
    (
      returnId: Return['id'] | undefined = returnIdHookParameter,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No returnId provided'));
      }

      const isSyncedWithHookParams = returnId === returnIdHookParameter;
      const requestId = currentRequestId.current++;
      const actionMetadata = { returnId, requestId, isSyncedWithHookParams };

      dispatch({
        type: actionTypes.FetchPickupRescheduleRequestsRequest,
        meta: actionMetadata,
      });

      getReturnPickupRescheduleRequests(returnId, config).then(
        pickupRescheduleRequests => {
          dispatch({
            type: actionTypes.FetchPickupRescheduleRequestsSuccess,
            meta: actionMetadata,
            payload: pickupRescheduleRequests,
          });
        },
        e => {
          dispatch({
            type: actionTypes.FetchPickupRescheduleRequestsFailure,
            meta: actionMetadata,
            payload: e,
          });
        },
      );

      return getReturnPickupRescheduleRequests;
    },
    [fetchConfig, returnIdHookParameter],
  );

  const create = useCallback(
    (
      data: PostReturnPickupRescheduleRequestData,
      returnId: Return['id'] | undefined = returnIdHookParameter,
      config?: Config,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No returnId provided'));
      }

      return postReturnPickupRescheduleRequest(returnId, data, config);
    },
    [returnIdHookParameter],
  );

  const fetchPickupRescheduleRequest = useCallback(
    (
      rescheduleRequestId: PickupRescheduleRequest['id'],
      returnId: Return['id'] | undefined = returnIdHookParameter,
      config?: Config,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No returnId provided'));
      }

      return getReturnPickupRescheduleRequest(
        returnId,
        rescheduleRequestId,
        config,
      );
    },
    [returnIdHookParameter],
  );

  // If the state contains data that does not match the parameters
  // from this hook render, dispatch a clear state action to reset
  // the local state. This will rerender the hook automatically but will
  // prevent the rerender of children if this was only done in a useEffect.
  if (
    state?.currentReturnId &&
    returnIdHookParameter !== state?.currentReturnId
  ) {
    dispatch({ type: actionTypes.ClearPickupRescheduleRequestsState });
  }

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && returnIdHookParameter) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, returnIdHookParameter]);

  return {
    isLoading,
    isFetched,
    error,
    data,
    actions: {
      fetch,
      create,
      fetchPickupRescheduleRequest,
    },
  };
}

export default useReturnPickupRescheduleRequests;
