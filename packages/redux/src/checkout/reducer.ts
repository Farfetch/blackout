import * as actionTypes from './actionTypes.js';
import { type AnyAction, combineReducers, type Reducer } from 'redux';
import { assignWith, get, isEqual, mergeWith } from 'lodash-es';
import { LOGOUT_SUCCESS } from '../users/authentication/actionTypes.js';
import { produce } from 'immer';
import createMergedObject from '../helpers/createMergedObject.js';
import reducerFactory, {
  createReducerWithResult,
} from '../helpers/reducerFactory.js';
import type { CheckoutEntity, CheckoutOrderEntity } from '../entities/index.js';
import type { CheckoutState } from './types/index.js';
import type { StoreState } from '../types/index.js';

export const INITIAL_STATE: CheckoutState = {
  error: null,
  id: null,
  isLoading: false,
  checkoutOrderDetails: {
    error: null,
    isLoading: false,
  },
  collectPoints: {},
  checkoutOrderTags: {
    error: null,
    isLoading: false,
  },
  checkoutOrderPromocodes: {
    error: null,
    isLoading: false,
  },
  checkoutOrderItemTags: {
    error: null,
    isLoading: false,
  },
  checkoutOrderItems: {
    error: null,
    isLoading: false,
  },
  checkoutOrderCharge: {
    error: null,
    result: null,
    isLoading: false,
  },
  checkoutOrderDeliveryBundleUpgrades: {
    error: null,
    isLoading: false,
    result: null,
  },
  checkoutOrderDeliveryBundleProvisioning: {
    error: null,
    isLoading: false,
  },
  checkoutOrderDeliveryBundleUpgradeProvisioning: {
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
  context: {
    error: null,
    isLoading: false,
    result: null,
  },
  contexts: {
    error: null,
    isLoading: false,
    result: null,
  },
};

const error = (
  state = INITIAL_STATE.error,
  action: AnyAction,
): CheckoutState['error'] => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_ORDER_FAILURE:
    case actionTypes.FETCH_CHECKOUT_ORDER_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_CHECKOUT_ORDER_REQUEST:
    case actionTypes.FETCH_CHECKOUT_ORDER_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST:
      return INITIAL_STATE.error;

    default:
      return state;
  }
};

const id = (state = INITIAL_STATE.id, action: AnyAction) => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS:
    case actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS:
    case actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_SUCCESS:
    case actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS:
      return action.payload.result;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action: AnyAction) => {
  switch (action?.type) {
    case actionTypes.CREATE_CHECKOUT_ORDER_REQUEST:
    case actionTypes.FETCH_CHECKOUT_ORDER_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST:
      return true;
    case actionTypes.CREATE_CHECKOUT_ORDER_FAILURE:
    case actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS:
    case actionTypes.FETCH_CHECKOUT_ORDER_FAILURE:
    case actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const resetEntitiesStateReducer = (
  state: NonNullable<StoreState['entities']>,
) => {
  const {
    checkout,
    checkoutDetails,
    checkoutOrders,
    checkoutOrderItems,
    checkoutOrderItemProducts,
    ...rest
  } = state as NonNullable<StoreState['entities']>;

  return rest;
};

const convertCheckoutOrder = (
  state: NonNullable<StoreState['entities']>,
  action: AnyAction,
) => {
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
  const mergedState = createMergedObject(tempMergedState, entitiesMerged) as {
    checkoutOrders: Record<string, CheckoutOrderEntity>;
  };

  const mergedClickAndCollectState = get(
    mergedState,
    `checkoutOrders[${result}].clickAndCollect`,
  );
  const receivedClickAndCollectState = get(
    entities,
    `checkoutOrders[${result}].clickAndCollect`,
  );
  const shouldReplaceClickAndCollect = !isEqual(
    mergedClickAndCollectState,
    receivedClickAndCollectState,
  );

  const mergedShippingAddressState = get(
    mergedState,
    `checkoutOrders[${result}].shippingAddress.state`,
  );
  const receivedShippingAddressState = get(
    entities,
    `checkoutOrders[${result}].shippingAddress.state`,
  );
  const shouldReplaceShippingState = !isEqual(
    mergedShippingAddressState,
    receivedShippingAddressState,
  );

  const mergedBillingAddressState = get(
    mergedState,
    `checkoutOrders[${result}].billingAddress.state`,
  );
  const receivedBillingAddressState = get(
    entities,
    `checkoutOrders[${result}].billingAddress.state`,
  );
  const shouldReplaceBillingState = !isEqual(
    mergedBillingAddressState,
    receivedBillingAddressState,
  );

  return produce(mergedState, draftState => {
    const checkoutOrder = draftState?.checkoutOrders?.[result];

    if (
      !checkoutOrder ||
      (!shouldReplaceClickAndCollect &&
        !shouldReplaceBillingState &&
        !shouldReplaceShippingState)
    ) {
      return;
    }

    if (shouldReplaceClickAndCollect) {
      checkoutOrder.clickAndCollect =
        entities.checkoutOrders[result]?.clickAndCollect;
    }

    if (shouldReplaceShippingState) {
      checkoutOrder.shippingAddress.state =
        entities.checkoutOrders[result]?.shippingAddress?.state;
    }

    if (shouldReplaceBillingState) {
      checkoutOrder.billingAddress.state =
        entities.checkoutOrders[result]?.billingAddress?.state;
    }
  });
};

const handleRemoveCheckoutOrderItemSuccess = produce<
  NonNullable<StoreState['entities']>,
  [AnyAction]
>((draftState, action) => {
  if (!draftState || !draftState.checkoutOrderItems) {
    return;
  }

  const { id } = action.meta;

  delete draftState.checkoutOrderItems[id];
});

const handleUpdateCheckoutOrderItemSuccess = produce<
  NonNullable<StoreState['entities']>,
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

const handleRemoveCheckoutOrderContextSuccess = produce<
  NonNullable<StoreState['entities']>,
  [AnyAction]
>((draftState, action) => {
  if (!draftState || !draftState.checkoutOrderContext) {
    return;
  }

  const { contextId } = action.meta;

  delete draftState.checkoutOrderContext[contextId];
});

export const entitiesMapper = {
  [actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
    const { id } = action.meta;
    const currentCheckout = get(state, `checkout[${id}]`, {}) as CheckoutEntity;
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
  [actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS]: (
    state: NonNullable<StoreState['entities']>,
    action: AnyAction,
  ) => {
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
  [actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS]:
    (state: NonNullable<StoreState['entities']>, action: AnyAction) => {
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
  [actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS]: convertCheckoutOrder,
  [actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS]: convertCheckoutOrder,
  [actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_SUCCESS]: convertCheckoutOrder,
  [actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS]: convertCheckoutOrder,
  [actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS]: convertCheckoutOrder,
  [actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS]: convertCheckoutOrder,
  [actionTypes.RESET_CHECKOUT]: resetEntitiesStateReducer,
  [LOGOUT_SUCCESS]: resetEntitiesStateReducer,
  [actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS]:
    handleRemoveCheckoutOrderItemSuccess,
  [actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS]:
    handleUpdateCheckoutOrderItemSuccess,
  [actionTypes.REMOVE_CHECKOUT_ORDER_CONTEXT_SUCCESS]:
    handleRemoveCheckoutOrderContextSuccess,
} as const;

export const checkoutOrderDetails = reducerFactory(
  'FETCH_CHECKOUT_ORDER_DETAILS',
  INITIAL_STATE.checkoutOrderDetails,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_DETAILS_STATE,
);

export const collectPoints = (
  state = INITIAL_STATE.collectPoints,
  action: AnyAction,
) => {
  switch (action.type) {
    case actionTypes.FETCH_COLLECT_POINTS_REQUEST:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: true,
          error: null,
        },
      };
    case actionTypes.FETCH_COLLECT_POINTS_SUCCESS:
      return {
        ...state,
        [action.meta.hash]: {
          result: action.payload.result,
          isLoading: false,
          error: null,
        },
      };
    case actionTypes.FETCH_COLLECT_POINTS_FAILURE:
      return {
        ...state,
        [action.meta.hash]: {
          result: null,
          isLoading: false,
          error: action.payload.error,
        },
      };
    case actionTypes.RESET_COLLECT_POINTS_STATE:
      return INITIAL_STATE.collectPoints;
    default:
      return state;
  }
};

export const checkoutOrderTags = reducerFactory(
  'SET_CHECKOUT_ORDER_TAGS',
  INITIAL_STATE.checkoutOrderTags,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_TAGS_STATE,
);

export const checkoutOrderItemTags = reducerFactory(
  'SET_CHECKOUT_ORDER_ITEM_TAGS',
  INITIAL_STATE.checkoutOrderItemTags,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_ITEM_TAGS_STATE,
);

export const checkoutOrderPromocodes = reducerFactory(
  'SET_CHECKOUT_ORDER_PROMOCODES',
  INITIAL_STATE.checkoutOrderPromocodes,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_PROMOCODES_STATE,
);

export const checkoutOrderItems = reducerFactory(
  'UPDATE_CHECKOUT_ORDER_ITEMS',
  INITIAL_STATE.checkoutOrderItems,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_ITEMS_STATE,
);

export const checkoutOrderCharge = (
  state = INITIAL_STATE.checkoutOrderCharge,
  action: AnyAction,
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
      return INITIAL_STATE.checkoutOrderCharge;
    default:
      return state;
  }
};

export const checkoutOrderDeliveryBundleUpgrades = (
  state = INITIAL_STATE.checkoutOrderDeliveryBundleUpgrades,
  action: AnyAction,
): CheckoutState['checkoutOrderDeliveryBundleUpgrades'] => {
  switch (action?.type) {
    case actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST:
    case actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.checkoutOrderDeliveryBundleUpgrades.error,
        isLoading: true,
      };
    case actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.checkoutOrderDeliveryBundleUpgrades.error,
        isLoading: false,
      };
    case actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE:
    case actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS:
      return {
        error: INITIAL_STATE.checkoutOrderCharge.error,
        isLoading: false,
        result: action.payload.result,
      };
    case actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_STATE:
      return INITIAL_STATE.checkoutOrderDeliveryBundleUpgrades;
    default:
      return state;
  }
};

export const checkoutOrderDeliveryBundleProvisioning = reducerFactory(
  'FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING',
  INITIAL_STATE.checkoutOrderDeliveryBundleProvisioning,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_STATE,
);

export const checkoutOrderDeliveryBundleUpgradeProvisioning = reducerFactory(
  'FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING',
  INITIAL_STATE.checkoutOrderDeliveryBundleUpgradeProvisioning,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_STATE,
);

export const operation = reducerFactory(
  'FETCH_CHECKOUT_ORDER_OPERATION',
  INITIAL_STATE.operation,
  actionTypes,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_OPERATION_STATE,
);

export const operations = createReducerWithResult(
  'FETCH_CHECKOUT_ORDER_OPERATIONS',
  INITIAL_STATE.operations,
  actionTypes,
  true,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_OPERATIONS_STATE,
);

export const removeOrderItem = reducerFactory(
  'REMOVE_CHECKOUT_ORDER_ITEM',
  INITIAL_STATE.removeOrderItem,
  actionTypes,
  false,
  actionTypes.RESET_REMOVE_CHECKOUT_ORDER_ITEM_STATE,
);

export const updateOrderItem = reducerFactory(
  'UPDATE_CHECKOUT_ORDER_ITEM',
  INITIAL_STATE.updateOrderItem,
  actionTypes,
  false,
  actionTypes.RESET_UPDATE_CHECKOUT_ORDER_ITEM_STATE,
);

export const context = createReducerWithResult(
  [
    'FETCH_CHECKOUT_ORDER_CONTEXT',
    'CREATE_CHECKOUT_ORDER_CONTEXT',
    'REMOVE_CHECKOUT_ORDER_CONTEXT',
  ],
  INITIAL_STATE.context,
  actionTypes,
  true,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_CONTEXT_STATE,
);

export const contexts = createReducerWithResult(
  'FETCH_CHECKOUT_ORDER_CONTEXTS',
  INITIAL_STATE.contexts,
  actionTypes,
  true,
  false,
  actionTypes.RESET_CHECKOUT_ORDER_CONTEXTS_STATE,
);

export const getError = (state: CheckoutState): CheckoutState['error'] =>
  state.error;
export const getId = (state: CheckoutState): CheckoutState['id'] => state.id;
export const getIsLoading = (
  state: CheckoutState,
): CheckoutState['isLoading'] => state.isLoading;

export const getCheckoutOrderDetails = (
  state: CheckoutState,
): CheckoutState['checkoutOrderDetails'] => state.checkoutOrderDetails;
export const getCollectPoints = (
  state: CheckoutState,
): CheckoutState['collectPoints'] => state.collectPoints;
export const getCheckoutOrderItemTags = (
  state: CheckoutState,
): CheckoutState['checkoutOrderItemTags'] => state.checkoutOrderItemTags;
export const getCheckoutOrderPromocodes = (
  state: CheckoutState,
): CheckoutState['checkoutOrderPromocodes'] => state.checkoutOrderPromocodes;
export const getCheckoutOrderTags = (
  state: CheckoutState,
): CheckoutState['checkoutOrderTags'] => state.checkoutOrderTags;
export const getCheckoutOrderItems = (
  state: CheckoutState,
): CheckoutState['checkoutOrderItems'] => state.checkoutOrderItems;
export const getCheckoutOrderCharge = (
  state: CheckoutState,
): CheckoutState['checkoutOrderCharge'] => state.checkoutOrderCharge;
export const getCheckoutOrderDeliveryBundleUpgrades = (
  state: CheckoutState,
): CheckoutState['checkoutOrderDeliveryBundleUpgrades'] =>
  state.checkoutOrderDeliveryBundleUpgrades;
export const getCheckoutOrderDeliveryBundleProvisioning = (
  state: CheckoutState,
): CheckoutState['checkoutOrderDeliveryBundleProvisioning'] =>
  state.checkoutOrderDeliveryBundleProvisioning;
export const getCheckoutOrderDeliveryBundleUpgradeProvisioning = (
  state: CheckoutState,
): CheckoutState['checkoutOrderDeliveryBundleUpgradeProvisioning'] =>
  state.checkoutOrderDeliveryBundleUpgradeProvisioning;
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
export const getContext = (state: CheckoutState): CheckoutState['context'] =>
  state.context;
export const getContexts = (state: CheckoutState): CheckoutState['contexts'] =>
  state.contexts;

const reducer: Reducer<CheckoutState> = combineReducers({
  error,
  id,
  isLoading,
  checkoutOrderDetails,
  collectPoints,
  checkoutOrderTags,
  checkoutOrderPromocodes,
  checkoutOrderItemTags,
  checkoutOrderItems,
  checkoutOrderCharge,
  checkoutOrderDeliveryBundleUpgrades,
  checkoutOrderDeliveryBundleProvisioning,
  checkoutOrderDeliveryBundleUpgradeProvisioning,
  operation,
  operations,
  removeOrderItem,
  updateOrderItem,
  context,
  contexts,
});

/**
 * Reducer for checkout state.
 *
 * @param state  - Current redux state.
 * @param action - Action dispatched.
 *
 * @returns New state.
 */
const checkoutReducer: Reducer<CheckoutState> = (state, action) => {
  if (
    action.type === LOGOUT_SUCCESS ||
    action.type === actionTypes.RESET_CHECKOUT
  ) {
    return INITIAL_STATE;
  }

  return reducer(state, action);
};

export default checkoutReducer;
