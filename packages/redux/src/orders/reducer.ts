import * as actionTypes from './actionTypes';
import { adaptDate } from '../helpers/adapters';
import { combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import { reducerFactory } from '../helpers';
import get from 'lodash/get';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import produce from 'immer';
import type * as T from './types';

export const INITIAL_STATE: T.OrderState = {
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

const error = (
  state = INITIAL_STATE.error,
  action:
    | T.FetchOrderDetailsFailureAction
    | T.FetchOrderDetailsRequestAction
    | T.FetchOrderReturnOptionsFailureAction
    | T.FetchOrderReturnOptionsRequestAction
    | T.FetchOrdersFailureAction
    | T.FetchOrdersRequestAction
    | T.FetchTrackingsFailureAction
    | T.FetchTrackingsRequestAction
    | T.FetchOrderAvailableItemsActivitiesAction
    | T.FetchOrderItemAvailableActivitiesAction
    | T.ResetOrdersAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDER_FAILURE:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.FETCH_ORDERS_FAILURE:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_ORDER_REQUEST:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.FETCH_ORDERS_REQUEST:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST:
    case actionTypes.RESET_ORDERS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | T.FetchOrdersAction
    | T.FetchOrderDetailsAction
    | T.FetchOrderReturnOptionsAction
    | T.FetchTrackingsAction
    | T.FetchOrderItemAvailableActivitiesAction
    | T.FetchOrderAvailableItemsActivitiesAction
    | T.ResetOrdersAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_REQUEST:
    case actionTypes.FETCH_ORDER_REQUEST:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_REQUEST:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST:
      return true;
    case actionTypes.FETCH_ORDERS_FAILURE:
    case actionTypes.FETCH_ORDERS_SUCCESS:
    case actionTypes.FETCH_ORDER_FAILURE:
    case actionTypes.FETCH_ORDER_SUCCESS:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_FAILURE:
    case actionTypes.FETCH_SHIPMENT_TRACKINGS_SUCCESS:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_SUCCESS:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_SUCCESS:
    case actionTypes.RESET_ORDERS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.FETCH_ORDERS_SUCCESS]: (
    state: T.OrderState,
    action: T.FetchOrdersSuccessAction,
  ) => {
    const orders = action.payload.entities.orders;
    const { entities } = action.payload;
    const merchantsFromOrders = {};

    for (const order in orders) {
      if (orders.hasOwnProperty(order)) {
        Object.values(orders[order].byMerchant).forEach(orderByMerchant => {
          merchantsFromOrders[orderByMerchant.merchant.id] =
            orderByMerchant.merchant;
          orderByMerchant.merchant = orderByMerchant.merchant.id;
        });
      }
    }

    // Reset orders before merging with entities
    const stateWithResetOrders = {
      ...state,
      orders: {},
    };

    return produce(stateWithResetOrders, draftState => {
      merge(draftState, entities);

      const newMerchants = merge(draftState.merchants, merchantsFromOrders);

      draftState.merchants = newMerchants;
    });
  },
  [actionTypes.FETCH_ORDER_SUCCESS]: (
    state: T.OrderState,
    action: T.FetchOrderDetailsSuccessAction,
  ) => {
    const { orderId } = action.meta;
    const { entities, result } = action.payload;
    // Filtering unimportant properties from the orderDetails request.
    const orderDetails = omit(result, [
      'baseUrl',
      'clientOnlyPage',
      'components',
      'countryCode',
      'countryId',
      'cultureCode',
      'currency',
      'currencyCode',
      'currencyCultureCode',
      'dataLayer',
      'isMobileDevice',
      'pageContent',
      'pageType',
      'redirectUrl',
      'relativeUrl',
      'requestSourceCountryCode',
      'returnUrl',
      'screenPixelsHeight',
      'screenPixelsWidth',
      'seoMetadata',
      'seoPageType',
      'serverSideJsApp',
      'slug',
      'staticPathorderDetails',
      'subfolder',
      'translationsUrl',
      'createdDate',
      'updatedDate',
    ]);
    const { createdDate, updatedDate } = result;
    const orderItems = entities.orderItems;

    const tempState = {
      ...state,
    };

    if (action.guest) {
      tempState.orders = {};
    }

    return produce(tempState, draftState => {
      merge(draftState, entities);
      for (const orderItem in orderItems) {
        if (orderItems.hasOwnProperty(orderItem)) {
          const merchantId = orderItems[orderItem].merchant;

          if (!draftState.orders || !draftState.orders[orderId]) {
            draftState.orders = {
              ...draftState.orders,
              [orderId]: { byMerchant: { [merchantId]: {} } },
            };
          }
          const orderByMerchant =
            draftState.orders[orderId].byMerchant[merchantId];
          const existingOrderItems = orderByMerchant?.orderItems || [];

          if (!existingOrderItems.includes(orderItem)) {
            draftState.orders[orderId].byMerchant[merchantId] = {
              ...orderByMerchant,
              orderItems: [...existingOrderItems, orderItem],
            };
          }
        }
      }

      draftState.orders[orderId] = {
        ...draftState.orders[orderId],
        ...orderDetails,
        createdDate: adaptDate(createdDate),
        updatedDate: adaptDate(updatedDate),
      };
    });
  },
  [actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS]: (
    state: T.OrderState,
    action: T.FetchOrderReturnOptionsSuccessAction,
  ) => {
    const { orderId } = action.meta;
    const returnOptions = action.payload.entities.returnOptions;
    const newReturnOptions = {};

    Object.values(returnOptions).forEach(value => {
      newReturnOptions[`${orderId}_${value.id}`] = {
        ...value,
        id: `${orderId}_${value.id}`,
      };
    });

    const newEntities = {
      ...action.payload.entities,
      returnOptions: newReturnOptions,
    };

    return produce(state, draftState => {
      merge(draftState, newEntities);
      for (const returnOption in newReturnOptions) {
        if (newReturnOptions.hasOwnProperty(returnOption)) {
          const merchantId = newReturnOptions[returnOption].merchant;

          const existingReturnOptions = get(
            draftState,
            `orders[${orderId}].byMerchant[${merchantId}].returnOptions`,
            [],
          );

          if (!existingReturnOptions.includes(returnOption)) {
            draftState.orders[orderId].byMerchant[merchantId] = {
              ...draftState.orders[orderId].byMerchant[merchantId],
              returnOptions: [...existingReturnOptions, returnOption],
            };
          }
        }
      }
    });
  },
  [actionTypes.RESET_ORDERS]: (state: T.OrderState) => {
    const { orders, orderItems, ...remainingEntities } = state;

    return remainingEntities;
  },
  [LOGOUT_SUCCESS]: (state: T.OrderState) => {
    const {
      orders,
      orderItems,
      labelTracking,
      returnOptions,
      ...remainingEntities
    } = state;

    return remainingEntities;
  },
};

export const ordersList = reducerFactory(
  'FETCH_ORDERS',
  INITIAL_STATE.ordersList,
  actionTypes,
);

export const orderDetails = (
  state = INITIAL_STATE.orderDetails,
  action: T.FetchOrderDetailsAction,
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

export const orderReturnOptions = (
  state = INITIAL_STATE.orderReturnOptions,
  action: T.FetchOrderReturnOptionsAction,
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

const result = (
  state = INITIAL_STATE.result,
  action: T.FetchOrdersSuccessAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = (state: T.OrderState): T.OrderState['error'] =>
  state.error;
export const getIsLoading = (state: T.OrderState): T.OrderState['isLoading'] =>
  state.isLoading;
export const getResult = (state: T.OrderState): T.OrderState['result'] =>
  state.result;
export const getOrdersList = (
  state: T.OrderState,
): T.OrderState['ordersList'] => state.ordersList;
export const getOrderDetails = (
  state: T.OrderState,
): T.OrderState['orderDetails'] => state.orderDetails;
export const getOrderReturnOptions = (
  state: T.OrderState,
): T.OrderState['orderReturnOptions'] => state.orderReturnOptions;
export const getShipmentTrackings = (
  state: T.OrderState,
): T.OrderState['trackings'] => state.trackings;
export const getDocuments = (state: T.OrderState): T.OrderState['documents'] =>
  state.documents;
export const getOrderAvailableItemsActivities = (
  state: T.OrderState,
): T.OrderState['orderAvailableItemsActivities'] =>
  state.orderAvailableItemsActivities;
export const getOrderItemAvailableActivities = (
  state: T.OrderState,
): T.OrderState['orderItemAvailableActivities'] =>
  state.orderItemAvailableActivities;

const reducer = combineReducers({
  error,
  isLoading,
  result,
  ordersList,
  orderDetails,
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
const ordersReducer = (state: T.OrderState, action: T.LogoutAction) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default ordersReducer;
