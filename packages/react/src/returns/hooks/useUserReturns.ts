import {
  type BlackoutError,
  getUserReturns,
  getUserReturnsLegacy,
  type User,
  type UserReturns,
} from '@farfetch/blackout-client';
import {
  buildQueryStringFromObject,
  createReturn as createReturnAction,
  fetchReturn as fetchReturnAction,
  resetReturn as resetReturnStateAction,
  updateReturn as updateReturnAction,
} from '@farfetch/blackout-redux';
import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { usePrevious } from '../../helpers/index.js';
import useAction from '../../helpers/useAction.js';
import useUser from '../../users/hooks/useUser.js';
import type { UseUserReturnsOptions } from './types/index.js';

const actionTypes = {
  FetchUserReturnsRequest: 'FETCH_USER_RETURNS_REQUEST',
  FetchUserReturnsSuccess: 'FETCH_USER_RETURNS_SUCCESS',
  FetchUserReturnsFailure: 'FETCH_USER_RETURNS_FAILURE',
} as const;

type State = {
  isLoading: boolean;
  error: BlackoutError | null;
  result?: UserReturns;
  currentQueryHash?: string;
  currentRequestId: number;
  currentUserId: User['id'];
} | null;

type FetchActionBase = {
  meta: {
    userId: User['id'];
    requestId: number;
    queryHash: string;
  };
};

type FetchUserReturnsRequestAction = FetchActionBase & {
  type: typeof actionTypes.FetchUserReturnsRequest;
};

type FetchUserReturnsSuccessAction = FetchActionBase & {
  type: typeof actionTypes.FetchUserReturnsSuccess;
  payload: UserReturns;
};

type FetchUserReturnsFailureAction = FetchActionBase & {
  type: typeof actionTypes.FetchUserReturnsFailure;
  payload: BlackoutError;
};

type Action =
  | FetchUserReturnsFailureAction
  | FetchUserReturnsRequestAction
  | FetchUserReturnsSuccessAction;

const initialState: State = null;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.FetchUserReturnsRequest: {
      const actionUserId = action.meta.userId;

      const newState = {
        isLoading: true,
        currentRequestId: action.meta.requestId,
        error: null,
        currentUserId: action.meta.userId,
        currentQueryHash: action.meta.queryHash,
        // If the action is requesting data for the same user
        // and the query hash is the same from the previous state,
        // keep the previous result on the state, otherwise
        // set it to undefined.
        result:
          actionUserId === state?.currentUserId &&
          action.meta.queryHash === state?.currentQueryHash
            ? state.result
            : undefined,
      };

      return newState;
    }
    case actionTypes.FetchUserReturnsSuccess: {
      // Do not update the state if:
      // - the userId from the action is not equal to the userId from the state (set on the request action dispatch).
      // - the userIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      // - the query hash is not equal to the current query hash.
      if (
        !state ||
        state.currentUserId !== action.meta.userId ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentQueryHash !== action.meta.queryHash
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
    case actionTypes.FetchUserReturnsFailure: {
      // Do not update the state if:
      // - the userId from the action is not equal to the userId from the state (set on the request action dispatch).
      // - the userIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      // - the query hash is not equal to the current query hash.
      if (
        !state ||
        state.currentUserId !== action.meta.userId ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentQueryHash !== action.meta.queryHash
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
    default:
      return state;
  }
}

function useUserReturns(options: UseUserReturnsOptions = {}) {
  const {
    enableAutoFetch = true,
    fetchConfig,
    fetchQuery,
    useLegacyGuestFlow = false,
    guestUserEmail,
  } = options;
  const currentRequestId = useRef(0);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { data: user } = useUser();
  const userId = user?.id;
  const isGuest = user?.isGuest;
  const orderId = fetchQuery?.orderId;
  const queryHash = useMemo(() => {
    if (!fetchQuery) {
      return '';
    }

    return buildQueryStringFromObject(fetchQuery);
  }, [fetchQuery]);
  const previousQueryHash = usePrevious(queryHash) || '';
  const hasQueryHashChanged = previousQueryHash !== queryHash;
  const userIdRequestState =
    userId === state?.currentUserId && queryHash === state?.currentQueryHash
      ? state
      : undefined;
  const isLoading = userIdRequestState?.isLoading || false;
  const error = userIdRequestState?.error || null;
  const data = userIdRequestState?.result;
  const isFetched = !!(data || error) && !isLoading;
  const fetchReturn = useAction(fetchReturnAction);
  const resetReturn = useAction(resetReturnStateAction);
  const updateReturn = useAction(updateReturnAction);
  const createReturn = useAction(createReturnAction);

  const fetch = useCallback(async () => {
    if (!userId) {
      return Promise.reject(new Error('No userId provided'));
    }

    if (useLegacyGuestFlow && !isGuest) {
      return Promise.reject(
        new Error('The user must be a guest to use the legacy flow'),
      );
    }

    if (useLegacyGuestFlow && (!guestUserEmail || !orderId)) {
      return Promise.reject(
        new Error(
          'To use the legacy flow both guestUserEmail and orderId must be provided',
        ),
      );
    }

    const requestId = currentRequestId.current++;
    const actionMetadata = { userId, requestId, queryHash };
    const getUserReturnsLegacyData =
      guestUserEmail && orderId
        ? {
            guestUserEmail,
            orderId,
          }
        : undefined;

    dispatch({
      type: actionTypes.FetchUserReturnsRequest,
      meta: actionMetadata,
    });

    const getUserReturnsClient =
      useLegacyGuestFlow && !!getUserReturnsLegacyData
        ? getUserReturnsLegacy(
            userId,
            getUserReturnsLegacyData,
            fetchQuery,
            fetchConfig,
          )
        : getUserReturns(userId, fetchQuery, fetchConfig);

    const result = await getUserReturnsClient.then(
      userReturns => {
        dispatch({
          type: actionTypes.FetchUserReturnsSuccess,
          meta: actionMetadata,
          payload: userReturns,
        });

        return userReturns;
      },
      e => {
        dispatch({
          type: actionTypes.FetchUserReturnsFailure,
          meta: actionMetadata,
          payload: e,
        });
      },
    );

    return result;
  }, [
    userId,
    queryHash,
    fetchQuery,
    fetchConfig,
    isGuest,
    guestUserEmail,
    orderId,
    useLegacyGuestFlow,
  ]);

  useEffect(() => {
    if (
      ((!isLoading && !isFetched && userId) || hasQueryHashChanged) &&
      enableAutoFetch
    ) {
      fetch();
    }
  }, [
    enableAutoFetch,
    fetch,
    hasQueryHashChanged,
    isFetched,
    isLoading,
    userId,
  ]);

  return {
    isLoading,
    isFetched,
    error,
    data,
    actions: {
      fetch,
      fetchReturn,
      resetReturn,
      updateReturn,
      createReturn,
    },
  };
}

export default useUserReturns;
