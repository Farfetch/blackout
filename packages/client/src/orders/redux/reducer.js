/**
 * @module orders/reducer
 * @category Orders
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { adaptDate } from '../../helpers/adapters';
import { combineReducers } from 'redux';
import { reducerFactory } from '../../helpers/redux';
import get from 'lodash/get';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import produce from 'immer';

const INITIAL_STATE = {
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
};

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_DETAILS_FAILURE:
    case actionTypes.GET_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.GET_ORDERS_FAILURE:
    case actionTypes.GET_TRACKINGS_FAILURE:
      return action.payload.error;
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
    case actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.GET_ORDERS_REQUEST:
    case actionTypes.GET_TRACKINGS_REQUEST:
    case actionTypes.RESET_ORDERS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_REQUEST:
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
    case actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.GET_TRACKINGS_REQUEST:
      return true;
    case actionTypes.GET_ORDERS_FAILURE:
    case actionTypes.GET_ORDERS_SUCCESS:
    case actionTypes.GET_ORDER_DETAILS_FAILURE:
    case actionTypes.GET_ORDER_DETAILS_SUCCESS:
    case actionTypes.GET_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS:
    case actionTypes.GET_TRACKINGS_FAILURE:
    case actionTypes.GET_TRACKINGS_SUCCESS:
    case actionTypes.RESET_ORDERS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

export const entitiesMapper = {
  [actionTypes.GET_ORDERS_SUCCESS]: (state, action) => {
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
  [actionTypes.GET_ORDER_DETAILS_SUCCESS]: (state, action) => {
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
  [actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS]: (state, action) => {
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
  [actionTypes.RESET_ORDERS]: state => {
    const { orders, orderItems, ...remainingEntities } = state;

    return { ...remainingEntities };
  },
};

export const ordersList = reducerFactory(
  'GET_ORDERS',
  INITIAL_STATE.ordersList,
  actionTypes,
);

export const orderDetails = (
  state = INITIAL_STATE.orderDetails,
  action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_DETAILS_REQUEST:
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
    case actionTypes.GET_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
      };
    case actionTypes.GET_ORDER_DETAILS_FAILURE:
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
  action = {},
) => {
  switch (action.type) {
    case actionTypes.GET_ORDER_RETURN_OPTIONS_REQUEST:
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
    case actionTypes.GET_ORDER_RETURN_OPTIONS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
      };
    case actionTypes.GET_ORDER_RETURN_OPTIONS_FAILURE:
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
  'GET_TRACKINGS',
  INITIAL_STATE.trackings,
  actionTypes,
);

export const documents = reducerFactory(
  ['GET_ORDER_DOCUMENTS', 'GET_ORDER_DOCUMENT', 'POST_ORDER_DOCUMENT'],
  INITIAL_STATE.documents,
  actionTypes,
);

const result = (state = INITIAL_STATE.result, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

export const getError = state => state.error;
export const getIsLoading = state => state.isLoading;
export const getResult = state => state.result;
export const getOrdersList = state => state.ordersList;
export const getOrderDetails = state => state.orderDetails;
export const getOrderReturnOptions = state => state.orderReturnOptions;
export const getTrackings = state => state.trackings;
export const getDocuments = state => state.documents;

/**
 * Reducer for orders state.
 *
 * @function ordersReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  error,
  isLoading,
  result,
  ordersList,
  orderDetails,
  orderReturnOptions,
  trackings,
  documents,
});
