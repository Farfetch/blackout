import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../users/authentication/actionTypes';
import omit from 'lodash/omit';
import reducerFactory from '../helpers/reducerFactory';
import type * as T from './types';
import type {
  ResetOrderDetailsStateAction,
  ResetOrderReturnOptionsStateAction,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE: T.OrdersState = {
  error: {},
  isLoading: {},
  result: {},
  orderDetails: {
    error: {},
    isLoading: {},
  },
  orderReturnOptions: {
    error: {},
    isLoading: {},
    result: {},
  },
  trackings: {
    error: null,
    isLoading: false,
  },
  documents: {
    error: null,
    isLoading: false,
  },
  orderAvailableItemsActivities: {
    error: null,
    isLoading: false,
  },
  orderItemAvailableActivities: {
    error: null,
    isLoading: false,
  },
};

const error = (state = INITIAL_STATE.error, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ORDERS_REQUEST:
      return { ...state, [action.meta.hash]: null };
    case actionTypes.FETCH_USER_ORDERS_FAILURE:
      return { ...state, [action.meta.hash]: action.payload.error };
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ORDERS_REQUEST:
      return { ...state, [action.meta.hash]: true };
    case actionTypes.FETCH_USER_ORDERS_FAILURE:
    case actionTypes.FETCH_USER_ORDERS_SUCCESS:
      return { ...state, [action.meta.hash]: false };
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ORDERS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: action.payload.result,
      };
    default:
      return state;
  }
};

const resetEntitiesStateReducer = (
  state: NonNullable<StoreState['entities']>,
) => {
  const {
    orders,
    orderItems,
    orderSummaries,
    labelTracking,
    returnOptions,
    returns,
    ...rest
  } = state;

  return rest;
};

export const entitiesMapper = {
  [actionTypes.RESET_ORDERS]: resetEntitiesStateReducer,
  [LOGOUT_SUCCESS]: resetEntitiesStateReducer,
  [LOGIN_SUCCESS]: resetEntitiesStateReducer,
  [FETCH_USER_SUCCESS]: resetEntitiesStateReducer,
  [REGISTER_SUCCESS]: resetEntitiesStateReducer,
};

export const orderDetails = (
  state = INITIAL_STATE.orderDetails,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_REQUEST:
      return {
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: true,
        },
        error: {
          ...state.error,
          [action.meta.orderId]: null,
        },
      };
    case actionTypes.FETCH_ORDER_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
      };
    case actionTypes.FETCH_ORDER_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
        error: {
          ...state.error,
          [action.meta.orderId]: action.payload.error,
        },
      };
    case actionTypes.RESET_ORDER_DETAILS_STATE:
      const orderIds = (action as ResetOrderDetailsStateAction).payload;

      if (!orderIds?.length) {
        return INITIAL_STATE.orderDetails;
      }

      return {
        isLoading: omit(state.isLoading, orderIds),
        error: omit(state.error, orderIds),
      };
    default:
      return state;
  }
};

export const orderReturnOptions = (
  state = INITIAL_STATE.orderReturnOptions,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: true,
        },
        error: {
          ...state.error,
          [action.meta.orderId]: null,
        },
      };
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
        result: {
          ...state.result,
          [action.meta.orderId]: action.payload.result,
        },
      };
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
        error: {
          ...state.error,
          [action.meta.orderId]: action.payload.error,
        },
      };
    case actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE:
      const orderIds = (action as ResetOrderReturnOptionsStateAction).payload;

      if (!orderIds?.length) {
        return INITIAL_STATE.orderReturnOptions;
      }

      return {
        isLoading: omit(state.isLoading, orderIds),
        error: omit(state.error, orderIds),
        result: omit(state.result, orderIds),
      };
    default:
      return state;
  }
};

export const trackings = reducerFactory(
  'FETCH_SHIPMENT_TRACKINGS',
  INITIAL_STATE.trackings,
  actionTypes,
);

export const documents = reducerFactory(
  ['FETCH_ORDER_DOCUMENTS', 'FETCH_ORDER_DOCUMENT', 'ADD_ORDER_DOCUMENT'],
  INITIAL_STATE.documents,
  actionTypes,
);

export const orderAvailableItemsActivities = reducerFactory(
  'FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES',
  INITIAL_STATE.orderAvailableItemsActivities,
  actionTypes,
);

export const orderItemAvailableActivities = reducerFactory(
  ['FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES', 'ADD_ORDER_ITEM_ACTIVITIES'],
  INITIAL_STATE.orderItemAvailableActivities,
  actionTypes,
);

export const getError = (state: T.OrdersState): T.OrdersState['error'] =>
  state.error;
export const getIsLoading = (
  state: T.OrdersState,
): T.OrdersState['isLoading'] => state.isLoading;
export const getResult = (state: T.OrdersState): T.OrdersState['result'] =>
  state.result;
export const getOrderDetails = (
  state: T.OrdersState,
): T.OrdersState['orderDetails'] => state.orderDetails;
export const getOrderReturnOptions = (
  state: T.OrdersState,
): T.OrdersState['orderReturnOptions'] => state.orderReturnOptions;
export const getShipmentTrackings = (
  state: T.OrdersState,
): T.OrdersState['trackings'] => state.trackings;
export const getDocuments = (
  state: T.OrdersState,
): T.OrdersState['documents'] => state.documents;
export const getOrderAvailableItemsActivities = (
  state: T.OrdersState,
): T.OrdersState['orderAvailableItemsActivities'] =>
  state.orderAvailableItemsActivities;
export const getOrderItemAvailableActivities = (
  state: T.OrdersState,
): T.OrdersState['orderItemAvailableActivities'] =>
  state.orderItemAvailableActivities;

const reducer = combineReducers({
  documents,
  error,
  isLoading,
  orderAvailableItemsActivities,
  orderDetails,
  orderItemAvailableActivities,
  orderReturnOptions,
  result,
  trackings,
});

/**
 * Reducer for orders state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const ordersReducer: Reducer<T.OrdersState> = (state, action) => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === LOGIN_SUCCESS ||
    action.type === FETCH_USER_SUCCESS ||
    action.type === REGISTER_SUCCESS ||
    action.type === actionTypes.RESET_ORDERS
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default ordersReducer;
