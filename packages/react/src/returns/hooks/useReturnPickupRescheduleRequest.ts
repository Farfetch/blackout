import {
  type BlackoutError,
  type Config,
  getReturnPickupRescheduleRequest,
  type PickupRescheduleRequest,
  type Return,
} from '@farfetch/blackout-client';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import useReturnPickupRescheduleRequests from './useReturnPickupRescheduleRequests.js';
import type { UseReturnPickupRescheduleRequestOptions } from './types/index.js';

const actionTypes = {
  FetchPickupRescheduleRequestRequest:
    'FETCH_PICKUP_RESCHEDULE_REQUEST_REQUEST',
  FetchPickupRescheduleRequestSuccess:
    'FETCH_PICKUP_RESCHEDULE_REQUEST_SUCCESS',
  FetchPickupRescheduleRequestFailure:
    'FETCH_PICKUP_RESCHEDULE_REQUEST_FAILURE',
  ClearPickupRescheduleRequestState: 'CLEAR_PICKUP_RESCHEDULE_REQUEST_STATE',
} as const;

type State = {
  isLoading: boolean;
  error: BlackoutError | null;
  result?: PickupRescheduleRequest;
  currentRequestId: number;
  currentReturnId: Return['id'];
  currentPickupRescheduleRequestId: PickupRescheduleRequest['id'];
} | null;

type FetchActionBase = {
  meta: {
    requestId: number;
    returnId: Return['id'];
    pickupRescheduleRequestId: PickupRescheduleRequest['id'];
    isSyncedWithHookParams: boolean;
  };
};

type FetchPickupRescheduleRequestRequestAction = FetchActionBase & {
  type: typeof actionTypes.FetchPickupRescheduleRequestRequest;
};

type FetchPickupRescheduleRequestSuccessAction = FetchActionBase & {
  type: typeof actionTypes.FetchPickupRescheduleRequestSuccess;
  payload: PickupRescheduleRequest;
};

type FetchPickupRescheduleRequestFailureAction = FetchActionBase & {
  type: typeof actionTypes.FetchPickupRescheduleRequestFailure;
  payload: BlackoutError;
};

type ClearPickupRescheduleRequestStateAction = {
  type: typeof actionTypes.ClearPickupRescheduleRequestState;
};

type Action =
  | FetchPickupRescheduleRequestFailureAction
  | FetchPickupRescheduleRequestRequestAction
  | FetchPickupRescheduleRequestSuccessAction
  | ClearPickupRescheduleRequestStateAction;

const initialState: State = null;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.FetchPickupRescheduleRequestRequest: {
      const isSyncedWithHookParams = action.meta.isSyncedWithHookParams;

      if (!isSyncedWithHookParams) {
        return state;
      }

      const actionReturnId = action.meta.returnId;
      const actionPickupRescheduleRequestId =
        action.meta.pickupRescheduleRequestId;

      const newState = {
        isLoading: true,
        error: null,
        currentRequestId: action.meta.requestId,
        currentReturnId: action.meta.returnId,
        currentPickupRescheduleRequestId: action.meta.pickupRescheduleRequestId,
        // If the action is requesting data for the same return and
        // pickup reschedule request, keep the previous result on the
        // state, otherwise set it to undefined.
        result:
          actionReturnId === state?.currentReturnId &&
          actionPickupRescheduleRequestId ===
            state?.currentPickupRescheduleRequestId
            ? state.result
            : undefined,
      };

      return newState;
    }
    case actionTypes.FetchPickupRescheduleRequestSuccess: {
      // Do not update the state if:
      // - the returnId and pickupRescheduleRequestId from the action are not equal to the returnId and pickupRescheduleRequestId parameters from the hook.
      // - the returnId and pickupRescheduleRequestId from the action are not equal to the returnId and pickupRescheduleRequestId from the state (set on the request action dispatch).
      // - the returnIds/pickupRescheduleRequestIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      if (
        !action.meta.isSyncedWithHookParams ||
        !state ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentReturnId !== action.meta.returnId ||
        state.currentPickupRescheduleRequestId !==
          action.meta.pickupRescheduleRequestId
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
    case actionTypes.FetchPickupRescheduleRequestFailure: {
      // Do not update the state if:
      // - the returnId and pickupRescheduleRequestId from the action are not equal to the returnId and pickupRescheduleRequestId parameters from the hook.
      // - the returnId and pickupRescheduleRequestId from the action are not equal to the returnId and pickupRescheduleRequestId from the state (set on the request action dispatch).
      // - the returnIds/pickupRescheduleRequestIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      if (
        !action.meta.isSyncedWithHookParams ||
        !state ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentReturnId !== action.meta.returnId ||
        state.currentPickupRescheduleRequestId !==
          action.meta.pickupRescheduleRequestId
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
    case actionTypes.ClearPickupRescheduleRequestState: {
      return initialState;
    }
    default:
      return state;
  }
}

function useReturnPickupRescheduleRequest(
  returnId?: Return['id'],
  pickupRescheduleRequestId?: PickupRescheduleRequest['id'],
  options: UseReturnPickupRescheduleRequestOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const currentRequestId = useRef(0);
  const returnIdHookParameter = returnId;
  const pickupRescheduleRequestIdHookParameter = pickupRescheduleRequestId;
  const [state, dispatch] = useReducer(reducer, initialState);
  const returnIdRequestState =
    returnIdHookParameter === state?.currentReturnId &&
    pickupRescheduleRequestIdHookParameter ===
      state?.currentPickupRescheduleRequestId
      ? state
      : undefined;

  const isLoading = returnIdRequestState?.isLoading || false;
  const error = returnIdRequestState?.error || null;
  const data = returnIdRequestState?.result;
  const isFetched = !!(data || error) && !isLoading;

  const {
    actions: { create, fetchPickupRescheduleRequest },
  } = useReturnPickupRescheduleRequests(returnId, { enableAutoFetch: false });

  const fetch = useCallback(
    (
      pickupRescheduleRequestId:
        | PickupRescheduleRequest['id']
        | undefined = pickupRescheduleRequestIdHookParameter,
      returnId: Return['id'] | undefined = returnIdHookParameter,
      config: Config | undefined = fetchConfig,
    ) => {
      if (!returnId) {
        return Promise.reject(new Error('No returnId provided'));
      }

      if (!pickupRescheduleRequestId) {
        return Promise.reject(
          new Error('No pickup reschedule request id provided'),
        );
      }

      const isSyncedWithHookParams =
        returnId === returnIdHookParameter &&
        pickupRescheduleRequestId === pickupRescheduleRequestIdHookParameter;
      const requestId = currentRequestId.current++;
      const actionMetadata = {
        returnId,
        requestId,
        pickupRescheduleRequestId,
        isSyncedWithHookParams,
      };

      dispatch({
        type: actionTypes.FetchPickupRescheduleRequestRequest,
        meta: actionMetadata,
      });

      fetchPickupRescheduleRequest(
        pickupRescheduleRequestId,
        returnId,
        config,
      ).then(
        pickupRescheduleRequest => {
          dispatch({
            type: actionTypes.FetchPickupRescheduleRequestSuccess,
            meta: actionMetadata,
            payload: pickupRescheduleRequest,
          });
        },
        e => {
          dispatch({
            type: actionTypes.FetchPickupRescheduleRequestFailure,
            meta: actionMetadata,
            payload: e,
          });
        },
      );

      return getReturnPickupRescheduleRequest;
    },
    [
      fetchConfig,
      fetchPickupRescheduleRequest,
      pickupRescheduleRequestIdHookParameter,
      returnIdHookParameter,
    ],
  );

  // If the state contains data that does not match the parameters
  // from this hook render, dispatch a clear state action to reset
  // the local state. This will rerender the hook automatically but will
  // prevent the rerender of children if this was only done in a useEffect.
  if (
    state?.currentReturnId &&
    state?.currentPickupRescheduleRequestId &&
    (returnIdHookParameter !== state?.currentReturnId ||
      pickupRescheduleRequestIdHookParameter !==
        state?.currentPickupRescheduleRequestId)
  ) {
    dispatch({ type: actionTypes.ClearPickupRescheduleRequestState });
  }

  useEffect(() => {
    if (
      !isLoading &&
      !isFetched &&
      enableAutoFetch &&
      returnIdHookParameter &&
      pickupRescheduleRequestIdHookParameter
    ) {
      fetch();
    }
  }, [
    enableAutoFetch,
    fetch,
    isFetched,
    isLoading,
    returnIdHookParameter,
    pickupRescheduleRequestIdHookParameter,
  ]);

  return {
    isLoading,
    isFetched,
    error,
    data,
    actions: {
      fetch,
      create,
    },
  };
}

export default useReturnPickupRescheduleRequest;
