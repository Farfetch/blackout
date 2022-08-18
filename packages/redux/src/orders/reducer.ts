import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import merge from 'lodash/merge';
import produce from 'immer';
import reducerFactory from '../helpers/reducerFactory';
import type * as T from './types';
import type { FetchOrderReturnOptionsSuccessAction } from './types';
import type { ReturnOptionEntity } from '../entities/types';
import type { StoreState } from '../types';

export const INITIAL_STATE: T.OrdersState = {
  error: null,
  isLoading: false,
  result: null,
  ordersList: {
    error: null,
    isLoading: false,
  },
  orderDetails: {
    error: {},
    isLoading: {},
  },
  orderReturns: {
    error: {},
    isLoading: {},
  },
  orderReturnOptions: {
    error: {},
    isLoading: {},
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
    case actionTypes.FETCH_ORDER_FAILURE:
    case actionTypes.FETCH_ORDER_RETURNS_FAILURE:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.FETCH_USER_ORDERS_FAILURE:
    case actionTypes.FETCH_GUEST_ORDERS_FAILURE:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_ORDER_REQUEST:
    case actionTypes.FETCH_ORDER_RETURNS_REQUEST:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.FETCH_USER_ORDERS_REQUEST:
    case actionTypes.FETCH_GUEST_ORDERS_REQUEST:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ORDERS_REQUEST:
    case actionTypes.FETCH_GUEST_ORDERS_REQUEST:
    case actionTypes.FETCH_ORDER_REQUEST:
    case actionTypes.FETCH_ORDER_RETURNS_REQUEST:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST:
      return true;
    case actionTypes.FETCH_USER_ORDERS_FAILURE:
    case actionTypes.FETCH_USER_ORDERS_SUCCESS:
    case actionTypes.FETCH_GUEST_ORDERS_FAILURE:
    case actionTypes.FETCH_GUEST_ORDERS_SUCCESS:
    case actionTypes.FETCH_ORDER_FAILURE:
    case actionTypes.FETCH_ORDER_SUCCESS:
    case actionTypes.FETCH_ORDER_RETURNS_FAILURE:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.FETCH_ORDER_RETURNS_SUCCESS:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_ORDERS_SUCCESS:
    case actionTypes.FETCH_GUEST_ORDERS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.FETCH_USER_ORDERS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { entities } = action.payload;

    // Reset orders before merging with entities
    const stateWithResetOrders = {
      ...state,
      orders: {},
      orderItems: {},
      returnOptions: {},
      returns: {},
    };

    return produce(stateWithResetOrders, draftState => {
      merge(draftState, entities);
    });
  },
  [actionTypes.FETCH_GUEST_ORDERS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { entities } = action.payload;

    // Reset orders before merging with entities
    const stateWithResetOrders = {
      ...state,
      orders: {},
      orderItems: {},
      returnOptions: {},
      returns: {},
    };

    return produce(stateWithResetOrders, draftState => {
      merge(draftState, entities);
    });
  },
  [actionTypes.FETCH_ORDER_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { entities } = action.payload;

    return produce(state, draftState => {
      merge(draftState, entities);
    });
  },
  [actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const orderReturnOptionsSuccessAction =
      action as FetchOrderReturnOptionsSuccessAction;

    const { orderId } = orderReturnOptionsSuccessAction.meta;
    const returnOptions =
      orderReturnOptionsSuccessAction.payload.entities.returnOptions;

    const newReturnOptions: typeof returnOptions = {};

    Object.values(returnOptions).forEach(value => {
      newReturnOptions[`${orderId}_${value.id}`] = {
        ...value,
        id: `${orderId}_${value.id}`,
      };
    });

    const newPayloadEntities = {
      ...action.payload.entities,
      returnOptions: newReturnOptions,
    };

    return produce(state, (draftState: NonNullable<typeof state>) => {
      merge(draftState, newPayloadEntities);
      for (const returnOptionId in newReturnOptions) {
        const returnOption = newReturnOptions[
          returnOptionId
        ] as ReturnOptionEntity;

        const merchantId = returnOption.merchant;

        let orders = draftState.orders;

        if (!orders) {
          orders = {};
          draftState.orders = orders;
        }

        let order = orders[orderId];

        if (!order) {
          order = {
            byMerchant: { [merchantId]: { merchant: merchantId } },
            id: orderId,
            totalItems: 1,
            createdDate: null,
          } as NonNullable<typeof order>;
          orders[orderId] = order;
        }

        let orderMerchant = order.byMerchant[merchantId];

        if (!orderMerchant) {
          orderMerchant = { merchant: merchantId } as NonNullable<
            typeof orderMerchant
          >;
          order.byMerchant[merchantId] = orderMerchant;
        }

        let existingReturnOptions = orderMerchant.returnOptions;

        if (!existingReturnOptions) {
          existingReturnOptions = [];
          orderMerchant.returnOptions = existingReturnOptions;
        }

        if (!existingReturnOptions.includes(returnOptionId)) {
          existingReturnOptions.push(returnOptionId);
        }
      }
    });
  },
  [actionTypes.RESET_ORDERS]: (state: NonNullable<StoreState['entities']>) => {
    if (!state) {
      return state;
    }

    const {
      orders,
      orderItems,
      labelTracking,
      returnOptions,
      returns,
      ...remainingEntities
    } = state;

    return remainingEntities;
  },
  [LOGOUT_SUCCESS]: (state: NonNullable<StoreState['entities']>) => {
    if (!state) {
      return state;
    }

    const {
      orders,
      orderItems,
      labelTracking,
      returnOptions,
      returns,
      ...remainingEntities
    } = state;

    return remainingEntities;
  },
};

export const ordersList = reducerFactory(
  'FETCH_USER_ORDERS',
  INITIAL_STATE.ordersList,
  actionTypes,
);

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
    default:
      return state;
  }
};

export const orderReturns = (
  state = INITIAL_STATE.orderReturns,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_RETURNS_REQUEST:
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
    case actionTypes.FETCH_ORDER_RETURNS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
      };
    case actionTypes.FETCH_ORDER_RETURNS_FAILURE:
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
export const getOrdersList = (
  state: T.OrdersState,
): T.OrdersState['ordersList'] => state.ordersList;
export const getOrderDetails = (
  state: T.OrdersState,
): T.OrdersState['orderDetails'] => state.orderDetails;
export const getOrderReturns = (
  state: T.OrdersState,
): T.OrdersState['orderReturns'] => state.orderReturns;
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
  error,
  isLoading,
  result,
  ordersList,
  orderDetails,
  orderReturns,
  orderReturnOptions,
  trackings,
  documents,
  orderAvailableItemsActivities,
  orderItemAvailableActivities,
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
    action.type === actionTypes.RESET_ORDERS
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default ordersReducer;
