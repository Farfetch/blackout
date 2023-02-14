import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers, Reducer } from 'redux';
import {
  FETCH_USER_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
} from '../users/authentication/actionTypes';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import produce from 'immer';
import reducerFactory from '../helpers/reducerFactory';
import type * as T from './types';
import type {
  // FetchOrderReturnOptionsSuccessAction,
  ResetOrderDetailsStateAction,
  ResetOrderReturnOptionsStateAction,
} from './types';
// import type {
//   // OrderEntity,
//   ReturnOptionEntity,
// } from '../entities/types';
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

// const getReturnOptionIdWithOrder = (
//   orderId: OrderEntity['id'],
//   returnOptionId: ReturnOptionEntity['id'],
// ) => {
//   return `${orderId}_${returnOptionId}`;
// };

export const entitiesMapper = {
  [actionTypes.FETCH_ORDER_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { entities } = action.payload;

    return produce(state, draftState => {
      merge(draftState, entities);
    });
  },
  // [actionTypes.FETCH_ORDER_RETURN_OPTIONS_SUCCESS]: (
  //   state: NonNullable<StoreState['entities']>,
  //   action: AnyAction,
  // ) => {
  //   const orderReturnOptionsSuccessAction =
  //     action as FetchOrderReturnOptionsSuccessAction;

  //   const { orderId } = orderReturnOptionsSuccessAction.meta;
  //   const {
  //     entities: { returnOptions },
  //     result,
  //   } = orderReturnOptionsSuccessAction.payload;

  //   const newReturnOptions: typeof returnOptions = {};

  //   Object.values(returnOptions).forEach(value => {
  //     const newReturnOptionId = getReturnOptionIdWithOrder(orderId, value.id);

  //     newReturnOptions[newReturnOptionId] = {
  //       ...value,
  //       id: newReturnOptionId,
  //     };
  //   });

  //   const newPayloadEntities = {
  //     ...action.payload.entities,
  //     returnOptions: newReturnOptions,
  //   };

  //   return produce(state, (draftState: typeof state) => {
  //     merge(draftState, newPayloadEntities);

  //     let orders = draftState.orders;

  //     if (!orders) {
  //       orders = {};
  //       draftState.orders = orders;
  //     }

  //     let order = orders[orderId];

  //     if (!order) {
  //       order = {
  //         byMerchant: {},
  //         id: orderId,
  //         totalItems: 1,
  //         createdDate: null,
  //       } as NonNullable<typeof order>;
  //       orders[orderId] = order;
  //     }

  //     order.returnOptions =
  //       result && result.length >= 0
  //         ? result.reduce<Array<ReturnOptionEntity['id']>>(
  //             (acc, merchantReturnOptions) => {
  //               return acc.concat(
  //                 merchantReturnOptions.options.map(returnOptionId =>
  //                   getReturnOptionIdWithOrder(orderId, returnOptionId),
  //                 ),
  //               );
  //             },
  //             [],
  //           )
  //         : null;

  //     for (const returnOptionId in newReturnOptions) {
  //       const returnOption = newReturnOptions[
  //         returnOptionId
  //       ] as ReturnOptionEntity;

  //       const merchantId = returnOption.merchant;

  //       let orderMerchant = order.byMerchant[merchantId];

  //       if (!orderMerchant) {
  //         orderMerchant = { merchant: merchantId } as NonNullable<
  //           typeof orderMerchant
  //         >;
  //         order.byMerchant[merchantId] = orderMerchant;
  //       }

  //       let existingReturnOptions = orderMerchant.returnOptions;

  //       if (!existingReturnOptions) {
  //         existingReturnOptions = [];
  //         orderMerchant.returnOptions = existingReturnOptions;
  //       }

  //       if (!existingReturnOptions.includes(returnOptionId)) {
  //         existingReturnOptions.push(returnOptionId);
  //       }
  //     }
  //   });
  // },
  // [actionTypes.RESET_ORDER_RETURN_OPTIONS_ENTITIES]: (
  //   state: NonNullable<StoreState['entities']>,
  //   action: AnyAction,
  // ) => {
  //   const orderIdsPayload = (action as ResetOrderReturnOptionsStateAction)
  //     .payload;
  //   const orderIdsToEnumerate = orderIdsPayload?.length
  //     ? orderIdsPayload
  //     : Object.keys(state.orders ?? {});

  //   return produce(state, draftState => {
  //     orderIdsToEnumerate.forEach(orderId => {
  //       const order = draftState.orders?.[orderId];

  //       if (order) {
  //         delete order.returnOptions;

  //         Object.values(order.byMerchant).forEach(merchantOrder => {
  //           const orderReturnOptions = merchantOrder.returnOptions;

  //           if (orderReturnOptions) {
  //             orderReturnOptions.forEach(returnOptionId => {
  //               delete draftState.returnOptions?.[returnOptionId];
  //             });
  //           }

  //           delete merchantOrder.returnOptions;
  //         });
  //       }
  //     });
  //   });
  // },
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
    case actionTypes.RESET_ORDER_RETURN_OPTIONS_STATE:
      const orderIds = (action as ResetOrderReturnOptionsStateAction).payload;

      if (!orderIds?.length) {
        return INITIAL_STATE.orderReturnOptions;
      }

      return {
        isLoading: omit(state.isLoading, orderIds),
        error: omit(state.error, orderIds),
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
