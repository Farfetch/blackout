import {
  type BlackoutError,
  type Config,
  getOrderShippingAddressChangeRequests,
  type Order,
  type OrderShippingAddressChangeRequests,
  postOrderShippingAddressChangeRequest,
  type PostOrderShippingAddressChangeRequestData,
} from '@farfetch/blackout-client';
import { useCallback, useEffect, useReducer, useRef } from 'react';
import type { UseOrderShippingAddressChangeRequestsOptions } from './index.js';

const actionTypes = {
  FetchOrderShippingAddressChangeRequestsRequest:
    'FETCH_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_REQUEST',
  FetchOrderShippingAddressChangeRequestsSuccess:
    'FETCH_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_SUCCESS',
  FetchOrderShippingAddressChangeRequestsFailure:
    'FETCH_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_FAILURE',
  ResetOrderShippingAddressChangeRequestsState:
    'RESET_ORDER_SHIPPING_ADDRESS_CHANGE_REQUESTS_STATE',
} as const;

type State = {
  isLoading: boolean;
  error: BlackoutError | null;
  result?: OrderShippingAddressChangeRequests;
  currentRequestId: number;
  currentOrderId: Order['id'];
} | null;

type FetchActionBase = {
  meta: {
    requestId: number;
    orderId: Order['id'];
    isSyncedWithHookParams: boolean;
  };
};

type FetchOrderShippingAddressChangeRequestsRequestAction = FetchActionBase & {
  type: typeof actionTypes.FetchOrderShippingAddressChangeRequestsRequest;
};

type FetchOrderShippingAddressChangeRequestsSuccessAction = FetchActionBase & {
  type: typeof actionTypes.FetchOrderShippingAddressChangeRequestsSuccess;
  payload: OrderShippingAddressChangeRequests;
};

type FetchOrderShippingAddressChangeRequestsFailureAction = FetchActionBase & {
  type: typeof actionTypes.FetchOrderShippingAddressChangeRequestsFailure;
  payload: BlackoutError;
};

type ResetOrderShippingAddressChangeRequestsStateAction = {
  type: typeof actionTypes.ResetOrderShippingAddressChangeRequestsState;
};

type Action =
  | FetchOrderShippingAddressChangeRequestsFailureAction
  | FetchOrderShippingAddressChangeRequestsRequestAction
  | FetchOrderShippingAddressChangeRequestsSuccessAction
  | ResetOrderShippingAddressChangeRequestsStateAction;

const initialState: State = null;

function reducer(state: State, action: Action) {
  switch (action.type) {
    case actionTypes.FetchOrderShippingAddressChangeRequestsRequest: {
      const isSyncedWithHookParams = action.meta.isSyncedWithHookParams;

      if (!isSyncedWithHookParams) {
        return state;
      }

      const actionOrderId = action.meta.orderId;

      const newState = {
        isLoading: true,
        error: null,
        currentRequestId: action.meta.requestId,
        currentOrderId: action.meta.orderId,
        // If the action is requesting data for the same order
        // keep the previous result on the state, otherwise
        // set it to undefined.
        result:
          actionOrderId === state?.currentOrderId ? state.result : undefined,
      };

      return newState;
    }
    case actionTypes.FetchOrderShippingAddressChangeRequestsSuccess: {
      // Do not update the state if:
      // - the orderId from the action is not equal to the orderId parameter from the hook.
      // - the orderId from the action is not equal to the orderId from the state (set on the request action dispatch).
      // - the orderIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      if (
        !action.meta.isSyncedWithHookParams ||
        !state ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentOrderId !== action.meta.orderId
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
    case actionTypes.FetchOrderShippingAddressChangeRequestsFailure: {
      // Do not update the state if:
      // - the orderId from the action is not equal to the orderId parameter from the hook.
      // - the orderId from the action is not equal to the orderId from the state (set on the request action dispatch).
      // - the orderIds are the same but the requestId from the action is not the same from the state (set on the request action dispatch).
      if (
        !action.meta.isSyncedWithHookParams ||
        !state ||
        state.currentRequestId !== action.meta.requestId ||
        state.currentOrderId !== action.meta.orderId
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
    case actionTypes.ResetOrderShippingAddressChangeRequestsState: {
      return initialState;
    }
    default:
      return state;
  }
}

function useOrderShippingAddressChangeRequests(
  orderId: Order['id'],
  options: UseOrderShippingAddressChangeRequestsOptions = {},
) {
  const { enableAutoFetch = true, fetchConfig } = options;
  const currentRequestId = useRef(0);
  const orderIdHookParameter = orderId;
  const [state, dispatch] = useReducer(reducer, initialState);
  const orderIdRequestState =
    orderIdHookParameter === state?.currentOrderId ? state : undefined;
  const isLoading = orderIdRequestState?.isLoading || false;
  const error = orderIdRequestState?.error || null;
  const data = orderIdRequestState?.result;
  const isFetched = !!(data || error) && !isLoading;

  /**
   * Fetches a shipping address change request. If no orderId is passed, the one passed to the hook will be used.
   * Will throw an error if no order id is provided to either the hook or the `orderId` parameter.
   *
   * @param config - Custom configurations to send to the client instance (axios).
   * @param orderId - Order id to override the one provided by the hook, if any.
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const fetch = useCallback(
    (
      config: Config | undefined = fetchConfig,
      orderId: Order['id'] | undefined = orderIdHookParameter,
    ) => {
      if (!orderId) {
        return Promise.reject(new Error('No orderId provided'));
      }

      const isSyncedWithHookParams = orderId === orderIdHookParameter;
      const requestId = currentRequestId.current++;
      const actionMetadata = { orderId, requestId, isSyncedWithHookParams };

      dispatch({
        type: actionTypes.FetchOrderShippingAddressChangeRequestsRequest,
        meta: actionMetadata,
      });

      getOrderShippingAddressChangeRequests(orderId, config).then(
        orderShippingAddressChangeRequests => {
          dispatch({
            type: actionTypes.FetchOrderShippingAddressChangeRequestsSuccess,
            meta: actionMetadata,
            payload: orderShippingAddressChangeRequests,
          });
        },
        e => {
          dispatch({
            type: actionTypes.FetchOrderShippingAddressChangeRequestsFailure,
            meta: actionMetadata,
            payload: e,
          });
        },
      );

      return getOrderShippingAddressChangeRequests;
    },
    [fetchConfig, orderIdHookParameter],
  );

  /**
   * Creates a shipping address change request. If no orderId is passed, the one passed to the hook will be used.
   * Will throw an error if no order id or data is provided to either the hook or both the `orderId` and `data` parameters.
   *
   * @param data - Order shipping address change request data.
   * @param config - Custom configurations to send to the client instance (axios).
   * @param orderId - Order id to override the one provided by the hook, if any.
   *
   * @returns - Promise that will be resolved when the call to the endpoint finishes.
   */
  const create = useCallback(
    (
      data: PostOrderShippingAddressChangeRequestData,
      config?: Config,
      orderId: Order['id'] | undefined = orderIdHookParameter,
    ) => {
      if (!orderId) {
        return Promise.reject(new Error('No orderId provided'));
      }

      if (!data) {
        return Promise.reject(new Error('No data provided'));
      }

      return postOrderShippingAddressChangeRequest(orderId, data, config);
    },
    [orderIdHookParameter],
  );

  // If the state contains data that does not match the parameters
  // from this hook render, dispatch a reset state action to reset
  // the local state. This will rerender the hook automatically but will
  // prevent the rerender of children if this was only done in a useEffect.
  if (state?.currentOrderId && orderIdHookParameter !== state?.currentOrderId) {
    dispatch({
      type: actionTypes.ResetOrderShippingAddressChangeRequestsState,
    });
  }

  useEffect(() => {
    if (!isLoading && !isFetched && enableAutoFetch && orderIdHookParameter) {
      fetch();
    }
  }, [enableAutoFetch, fetch, isFetched, isLoading, orderIdHookParameter]);

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

export default useOrderShippingAddressChangeRequests;
