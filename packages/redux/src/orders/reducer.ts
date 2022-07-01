import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import produce from 'immer';
import reducerFactory from '../helpers/reducerFactory';
import type * as T from './types';
import type {
  FetchOrderDetailsSuccessAction,
  FetchOrderReturnOptionsSuccessAction,
  FetchOrdersSuccessAction,
} from './types';
import type { LogoutSuccessAction } from '../users/types';
import type {
  OrderItemEntity,
  OrderMerchantNormalized,
  OrderSummarySemiNormalized,
  ReturnOptionsEntity,
} from '../entities/types';
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
    case actionTypes.FETCH_ORDER_DETAILS_FAILURE:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.FETCH_ORDERS_FAILURE:
    case actionTypes.FETCH_TRACKINGS_FAILURE:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_FAILURE:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_FAILURE:
      return action.payload.error;
    case actionTypes.FETCH_ORDER_DETAILS_REQUEST:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.FETCH_ORDERS_REQUEST:
    case actionTypes.FETCH_TRACKINGS_REQUEST:
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
    case actionTypes.FETCH_ORDER_DETAILS_REQUEST:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_REQUEST:
    case actionTypes.FETCH_TRACKINGS_REQUEST:
    case actionTypes.FETCH_ORDER_AVAILABLE_ITEMS_ACTIVITIES_REQUEST:
    case actionTypes.FETCH_ORDER_ITEM_AVAILABLE_ACTIVITIES_REQUEST:
      return true;
    case actionTypes.FETCH_ORDERS_FAILURE:
    case actionTypes.FETCH_ORDERS_SUCCESS:
    case actionTypes.FETCH_ORDER_DETAILS_FAILURE:
    case actionTypes.FETCH_ORDER_DETAILS_SUCCESS:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_FAILURE:
    case actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS:
    case actionTypes.FETCH_TRACKINGS_FAILURE:
    case actionTypes.FETCH_TRACKINGS_SUCCESS:
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
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const ordersSuccessAction = action as FetchOrdersSuccessAction;
    const orders = ordersSuccessAction.payload.entities.orders;
    const { entities } = action.payload;
    const merchantsFromOrders: NonNullable<
      StoreState['entities']
    >['merchants'] = {};

    for (const orderId in orders) {
      const order = orders[orderId] as OrderSummarySemiNormalized;

      Object.values(order.byMerchant).forEach(orderByMerchant => {
        merchantsFromOrders[orderByMerchant.merchant.id] =
          orderByMerchant.merchant;
        // This is because the merchant prop is not being normalized by the order
        // schema, so we need to do here the job that the order schema should be doing.
        // This is ugly and should be revisited later to make sure the merchant entities
        // are being extracted from the order schema after normalizr call.
        (orderByMerchant as unknown as OrderMerchantNormalized).merchant =
          orderByMerchant.merchant.id;
      });
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
  [actionTypes.FETCH_ORDER_DETAILS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const orderDetailsSuccessAction = action as FetchOrderDetailsSuccessAction;
    const { orderId } = orderDetailsSuccessAction.meta;
    const { entities, result } = orderDetailsSuccessAction.payload;
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
    ]);
    const { createdDate } = result;
    const orderItems = entities.orderItems;

    const tempState = {
      ...state,
    };

    if (orderDetailsSuccessAction.meta.guest) {
      tempState.orders = {};
    }

    return produce(tempState, draftState => {
      merge(draftState, entities);

      let ordersEntity = draftState.orders;

      if (!ordersEntity) {
        ordersEntity = {};
      }

      draftState.orders = draftState.orders ?? ordersEntity;

      let order = ordersEntity[orderId];

      if (!order) {
        order = {
          byMerchant: {},
          id: orderId,
          totalItems: orderDetails.totalQuantity ?? 1,
          createdDate,
        } as NonNullable<typeof order>;
        ordersEntity[orderId] = order;
      }

      order = {
        ...order,
        ...result,
      } as NonNullable<typeof order>;

      for (const orderItemId in orderItems) {
        const orderItem = orderItems[orderItemId] as OrderItemEntity;
        const merchantId = orderItem.merchant;

        let orderMerchant = order.byMerchant[merchantId];

        if (!orderMerchant) {
          orderMerchant = { merchant: merchantId };
          order.byMerchant[merchantId] = orderMerchant;
        }

        let existingOrderItems = orderMerchant.orderItems;

        if (!existingOrderItems) {
          existingOrderItems = [] as NonNullable<typeof existingOrderItems>;
          orderMerchant.orderItems = existingOrderItems;
        }

        if (!existingOrderItems.includes(orderItemId as unknown as number)) {
          existingOrderItems.push(orderItemId as unknown as number);
        }
      }

      draftState.orders[orderId] = order;
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

    const newEntities = {
      ...action.payload.entities,
      returnOptions: newReturnOptions,
    };

    return produce(state, (draftState: NonNullable<typeof state>) => {
      merge(draftState, newEntities);
      for (const returnOptionId in newReturnOptions) {
        const returnOption = newReturnOptions[
          returnOptionId
        ] as ReturnOptionsEntity;

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
          orderMerchant = {
            [merchantId]: { merchant: merchantId },
          } as NonNullable<typeof orderMerchant>;
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

    const { orders, orderItems, ...remainingEntities } = state;

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
    case actionTypes.FETCH_ORDER_DETAILS_REQUEST:
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
    case actionTypes.FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: {
          ...state.isLoading,
          [action.meta.orderId]: false,
        },
      };
    case actionTypes.FETCH_ORDER_DETAILS_FAILURE:
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
  'FETCH_TRACKINGS',
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

const result = (state = INITIAL_STATE.result, action: AnyAction) => {
  switch (action.type) {
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

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
export const getOrderReturnOptions = (
  state: T.OrdersState,
): T.OrdersState['orderReturnOptions'] => state.orderReturnOptions;
export const getTrackings = (
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
const ordersReducer = (
  state: T.OrdersState,
  action: LogoutSuccessAction | AnyAction,
) => {
  if (action.type === LOGOUT_SUCCESS) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default ordersReducer;
