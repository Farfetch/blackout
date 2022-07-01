import * as actionTypes from './actionTypes';
import { AnyAction, combineReducers } from 'redux';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes';
import assignWith from 'lodash/assignWith';
import createMergedObject from '../helpers/createMergedObject';
import get from 'lodash/get';
import mergeWith from 'lodash/mergeWith';
import produce from 'immer';
import reducerFactory, {
  createReducerWithResult,
} from '../helpers/reducerFactory';
import type {
  CheckoutState,
  CreateCheckoutOrderChargeFailureAction,
  CreateCheckoutOrderChargeRequestAction,
  CreateCheckoutOrderChargeSuccessAction,
  DeliveryBundleFailureAction,
  DeliveryBundleRequestAction,
  FetchCheckoutDetailsSuccessAction,
  FetchCheckoutOrderChargeFailureAction,
  FetchCheckoutOrderChargeRequestAction,
  FetchCheckoutOrderChargeSuccessAction,
  FetchDeliveryBundleSuccessAction,
  GenericCheckoutAction,
  GenericCheckoutFailureAction,
  GenericCheckoutRequestAction,
  GenericCheckoutSuccessAction,
  ResetCheckoutOrderChargeStateAction,
  ResetCheckoutStateAction,
  UpdateDeliveryBundleSuccessAction,
} from './types';
import type { LogoutSuccessAction } from '../users/types';
import type { StoreState } from '../types';

export const INITIAL_STATE = {
  error: null,
  id: null,
  isLoading: false,
  checkoutDetails: {
    error: null,
    isLoading: false,
  },
  collectPoints: {
    error: null,
    isLoading: false,
  },
  itemTags: {
    error: null,
    isLoading: false,
  },
  promoCode: {
    error: null,
    isLoading: false,
  },
  tags: {
    error: null,
    isLoading: false,
  },
  giftMessage: {
    error: null,
    isLoading: false,
  },
  checkoutOrderCharge: {
    error: null,
    result: null,
    isLoading: false,
  },
  deliveryBundleUpgrades: {
    error: null,
    isLoading: false,
    result: null,
  },
  itemDeliveryProvisioning: {
    error: null,
    isLoading: false,
  },
  upgradeItemDeliveryProvisioning: {
    error: null,
    isLoading: false,
  },
  operation: {
    error: null,
    isLoading: false,
  },
  operations: {
    error: null,
    isLoading: false,
    result: null,
  },
  removeOrderItem: {
    error: null,
    isLoading: false,
  },
  updateOrderItem: {
    error: null,
    isLoading: false,
  },
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | GenericCheckoutFailureAction
    | GenericCheckoutRequestAction
    | ResetCheckoutStateAction
    | LogoutSuccessAction,
): CheckoutState['error'] => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_FAILURE:
    case actionTypes.FETCH_CHECKOUT_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_CHECKOUT_REQUEST:
    case actionTypes.FETCH_CHECKOUT_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_REQUEST:
    case actionTypes.RESET_CHECKOUT_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (
  state = INITIAL_STATE.id,
  action:
    | GenericCheckoutSuccessAction
    | ResetCheckoutStateAction
    | LogoutSuccessAction
    | FetchCheckoutDetailsSuccessAction,
) => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS:
    case actionTypes.SET_ITEM_TAGS_SUCCESS:
    case actionTypes.SET_PROMOCODE_SUCCESS:
    case actionTypes.SET_TAGS_SUCCESS:
      return action.payload.result;
    case actionTypes.RESET_CHECKOUT_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (
  state = INITIAL_STATE.isLoading,
  action:
    | GenericCheckoutAction
    | ResetCheckoutStateAction
    | LogoutSuccessAction,
) => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_REQUEST:
    case actionTypes.FETCH_CHECKOUT_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_REQUEST:
      return true;
    case actionTypes.CREATE_CHECKOUT_FAILURE:
    case actionTypes.CREATE_CHECKOUT_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_FAILURE:
    case actionTypes.FETCH_CHECKOUT_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_SUCCESS:
    case actionTypes.RESET_CHECKOUT_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const convertCheckoutOrder = (
  state: NonNullable<StoreState['entities']>,
  action: AnyAction,
): StoreState['entities'] => {
  const { entities, result } = action.payload;

  const customizer = (objValue: unknown, srcValue: unknown, key: string) => {
    if (
      Array.isArray(objValue) ||
      key === 'shippingAddress' ||
      key === 'billingAddress'
    ) {
      return srcValue;
    }
  };

  const tempMergedState = {};
  assignWith(tempMergedState, state, customizer);
  const entitiesMerged = mergeWith({}, entities, customizer);
  const mergedState = createMergedObject(tempMergedState, entitiesMerged);

  const shouldResetClickAndCollect =
    !!get(mergedState, `checkoutOrders[${result}].clickAndCollect`) &&
    !get(entities, `checkoutOrders[${result}].clickAndCollect`);

  if (!shouldResetClickAndCollect) {
    return mergedState;
  }

  return {
    ...mergedState,
    checkoutOrders: {
      ...mergedState.checkoutOrders,
      [result]: {
        collectpoints: mergedState.checkoutOrders[result].collectpoints,
        ...entities?.checkoutOrders[result],
      },
    },
  };
};

const mergeCheckoutOrder = (
  state: NonNullable<StoreState['entities']>,
  action: AnyAction,
): StoreState['entities'] => {
  const { id } = action.meta;
  const currentCheckoutOrder = get(state, `checkoutOrders[${id}]`);

  return {
    ...state,
    checkoutOrders: {
      [id]: {
        ...currentCheckoutOrder,
        ...action.payload.entities,
      },
    },
  };
};

const handleRemoveCheckoutOrderItemSuccess = produce<
  StoreState['entities'],
  [AnyAction]
>((draftState, action) => {
  if (!draftState || !draftState.checkoutOrderItems) {
    return;
  }

  const { id } = action.meta;
  delete draftState.checkoutOrderItems[id];
});

const handleUpdateCheckoutOrderItemSuccess = produce<
  StoreState['entities'],
  [AnyAction]
>((draftState, action) => {
  if (!draftState || !draftState.checkoutOrderItems) {
    return;
  }

  const { id } = action.meta;
  const checkoutOrderItem = draftState.checkoutOrderItems[id];
  if (!checkoutOrderItem) {
    return;
  }

  Object.assign(checkoutOrderItem, action.payload);
});

export const entitiesMapper = {
  [actionTypes.FETCH_COLLECT_POINTS_SUCCESS]: mergeCheckoutOrder,
  [actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { id } = action.meta;
    const currentCheckout = get(state, `checkout[${id}]`);
    const { entities } = action.payload;
    const mergedState = createMergedObject(
      state as NonNullable<StoreState['entities']>,
      entities,
    );

    return {
      ...mergedState,
      checkout: { [id]: { ...currentCheckout, checkoutOrder: id } },
    };
  },
  [actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { deliveryBundleId } = action.meta;
    const currentDeliveryBundles = get(state, 'deliveryBundles') || {};
    const currentDeliveryBundle = get(
      state,
      `deliveryBundles[${deliveryBundleId}]`,
    );

    return {
      ...state,
      deliveryBundles: {
        ...currentDeliveryBundles,
        [deliveryBundleId]: {
          ...currentDeliveryBundle,
          ...action.payload.entities,
          itemsIds: action.payload.result,
        },
      },
    };
  },
  [actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ): StoreState['entities'] => {
    const { deliveryBundleId, upgradeId } = action.meta;
    const currentDeliveryUpgrades = get(state, 'deliveryBundleUpgrades');
    const selectedDeliveryUpgrades = get(
      state,
      `deliveryBundleUpgrades[${deliveryBundleId}]`,
    );
    const { result: itemsId, entities } = action.payload;

    const upgradesWithItemsDeliveryProvisioning = itemsId.reduce(
      (acc: { [x: string]: { provisiong: unknown } }, itemID: string) => {
        const currentItemDeliveryProvisioning = get(
          entities,
          `itemDeliveryProvisioning[${itemID}]`,
        );
        return {
          ...acc,
          [itemID]: {
            ...acc[itemID],
            provisioning: {
              upgradeId,
              ...currentItemDeliveryProvisioning.provisioning,
            },
          },
        };
      },
      selectedDeliveryUpgrades,
    );

    return {
      ...state,
      deliveryBundleUpgrades: {
        ...currentDeliveryUpgrades,
        [deliveryBundleId]: {
          ...upgradesWithItemsDeliveryProvisioning,
        },
      },
    };
  },
  [actionTypes.UPDATE_CHECKOUT_SUCCESS]: convertCheckoutOrder,
  [actionTypes.CREATE_CHECKOUT_SUCCESS]: convertCheckoutOrder,
  [actionTypes.SET_PROMOCODE_SUCCESS]: convertCheckoutOrder,
  [actionTypes.FETCH_CHECKOUT_SUCCESS]: convertCheckoutOrder,
  [actionTypes.SET_ITEM_TAGS_SUCCESS]: convertCheckoutOrder,
  [actionTypes.SET_TAGS_SUCCESS]: convertCheckoutOrder,
  [actionTypes.RESET_CHECKOUT_STATE]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    const {
      checkout,
      checkoutDetails,
      checkoutOrders,
      checkoutOrderItems,
      checkoutOrderItemProducts,
      ...rest
    } = state as NonNullable<StoreState['entities']>;

    return { ...rest };
  },
  [LOGOUT_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
  ): StoreState['entities'] => {
    const {
      checkout,
      checkoutDetails,
      checkoutOrders,
      checkoutOrderItems,
      checkoutOrderItemProducts,
      ...rest
    } = state as NonNullable<StoreState['entities']>;

    return { ...rest };
  },
  [actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS]:
    handleRemoveCheckoutOrderItemSuccess,
  [actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS]:
    handleUpdateCheckoutOrderItemSuccess,
} as const;

export const checkoutDetails = reducerFactory(
  'FETCH_CHECKOUT_DETAILS',
  INITIAL_STATE.checkoutDetails,
  actionTypes,
  true,
);

export const collectPoints = reducerFactory(
  'FETCH_COLLECT_POINTS',
  INITIAL_STATE.collectPoints,
  actionTypes,
  true,
);

export const itemTags = reducerFactory(
  'SET_ITEM_TAGS',
  INITIAL_STATE.itemTags,
  actionTypes,
  true,
);

export const promoCode = reducerFactory(
  'SET_PROMOCODE',
  INITIAL_STATE.promoCode,
  actionTypes,
  true,
);

export const tags = reducerFactory(
  'SET_TAGS',
  INITIAL_STATE.tags,
  actionTypes,
  true,
);

export const giftMessage = reducerFactory(
  'UPDATE_GIFT_MESSAGE',
  INITIAL_STATE.giftMessage,
  actionTypes,
  true,
);

export const checkoutOrderCharge = (
  state = INITIAL_STATE.checkoutOrderCharge,
  action:
    | LogoutSuccessAction
    | FetchCheckoutOrderChargeSuccessAction
    | FetchCheckoutOrderChargeFailureAction
    | FetchCheckoutOrderChargeRequestAction
    | CreateCheckoutOrderChargeSuccessAction
    | CreateCheckoutOrderChargeFailureAction
    | CreateCheckoutOrderChargeRequestAction
    | ResetCheckoutOrderChargeStateAction,
): CheckoutState['checkoutOrderCharge'] => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST:
    case actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.checkoutOrderCharge.error,
        isLoading: true,
      };
    case actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_FAILURE:
    case actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS:
      return {
        error: INITIAL_STATE.checkoutOrderCharge.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.checkoutOrderCharge;
    default:
      return state;
  }
};

export const deliveryBundleUpgrades = (
  state = INITIAL_STATE.deliveryBundleUpgrades,
  action:
    | LogoutSuccessAction
    | DeliveryBundleRequestAction
    | UpdateDeliveryBundleSuccessAction
    | FetchDeliveryBundleSuccessAction
    | DeliveryBundleFailureAction,
): CheckoutState['deliveryBundleUpgrades'] => {
  switch (action?.type) {
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST:
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST:
    case actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.deliveryBundleUpgrades.error,
        isLoading: true,
      };
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS:
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.deliveryBundleUpgrades.error,
        isLoading: false,
      };
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE:
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE:
    case actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS:
      return {
        error: INITIAL_STATE.checkoutOrderCharge.error,
        isLoading: false,
        result: action.payload.result,
      };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.deliveryBundleUpgrades;
    default:
      return state;
  }
};

export const itemDeliveryProvisioning = reducerFactory(
  'FETCH_ITEM_DELIVERY_PROVISIONING',
  INITIAL_STATE.itemDeliveryProvisioning,
  actionTypes,
  true,
);

export const upgradeItemDeliveryProvisioning = reducerFactory(
  'FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING',
  INITIAL_STATE.upgradeItemDeliveryProvisioning,
  actionTypes,
  true,
);

export const operation = reducerFactory(
  'FETCH_CHECKOUT_ORDER_OPERATION',
  INITIAL_STATE.operation,
  actionTypes,
  true,
);

export const operations = createReducerWithResult(
  'FETCH_CHECKOUT_ORDER_OPERATIONS',
  INITIAL_STATE.operations,
  actionTypes,
  true,
  true,
);

export const removeOrderItem = reducerFactory(
  'REMOVE_CHECKOUT_ORDER_ITEM',
  INITIAL_STATE.removeOrderItem,
  actionTypes,
  true,
);

export const updateOrderItem = reducerFactory(
  'UPDATE_CHECKOUT_ORDER_ITEM',
  INITIAL_STATE.updateOrderItem,
  actionTypes,
  true,
);

export const getError = (state: CheckoutState): CheckoutState['error'] =>
  state.error;
export const getId = (state: CheckoutState): CheckoutState['id'] => state.id;
export const getIsLoading = (
  state: CheckoutState,
): CheckoutState['isLoading'] => state.isLoading;

export const getCheckoutDetails = (
  state: CheckoutState,
): CheckoutState['checkoutDetails'] => state.checkoutDetails;
export const getCollectPoints = (
  state: CheckoutState,
): CheckoutState['collectPoints'] => state.collectPoints;
export const getItemTags = (state: CheckoutState): CheckoutState['itemTags'] =>
  state.itemTags;
export const getPromoCode = (
  state: CheckoutState,
): CheckoutState['promoCode'] => state.promoCode;
export const getTags = (state: CheckoutState): CheckoutState['tags'] =>
  state.tags;
export const getGiftMessage = (
  state: CheckoutState,
): CheckoutState['giftMessage'] => state.giftMessage;
export const getCheckoutOrderCharge = (
  state: CheckoutState,
): CheckoutState['checkoutOrderCharge'] => state.checkoutOrderCharge;
export const getDeliveryBundleUpgrades = (
  state: CheckoutState,
): CheckoutState['deliveryBundleUpgrades'] => state.deliveryBundleUpgrades;
export const getItemDeliveryProvisioning = (
  state: CheckoutState,
): CheckoutState['itemDeliveryProvisioning'] => state.itemDeliveryProvisioning;
export const getUpgradeItemDeliveryProvisioning = (
  state: CheckoutState,
): CheckoutState['upgradeItemDeliveryProvisioning'] =>
  state.upgradeItemDeliveryProvisioning;
export const getOperation = (
  state: CheckoutState,
): CheckoutState['operation'] => state.operation;
export const getOperations = (
  state: CheckoutState,
): CheckoutState['operations'] => state.operations;
export const getRemoveOrderItem = (
  state: CheckoutState,
): CheckoutState['removeOrderItem'] => state.removeOrderItem;
export const getUpdateOrderItem = (
  state: CheckoutState,
): CheckoutState['updateOrderItem'] => state.updateOrderItem;

/**
 * Reducer for checkout state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
export default combineReducers({
  error,
  id,
  isLoading,
  checkoutDetails,
  collectPoints,
  itemTags,
  promoCode,
  tags,
  giftMessage,
  checkoutOrderCharge,
  deliveryBundleUpgrades,
  itemDeliveryProvisioning,
  upgradeItemDeliveryProvisioning,
  operation,
  operations,
  removeOrderItem,
  updateOrderItem,
});
