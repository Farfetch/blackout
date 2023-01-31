/**
 * @module checkout/reducer
 * @category Checkout
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createMergedObject, reducerFactory } from '../../helpers/redux';
import assignWith from 'lodash/assignWith';
import get from 'lodash/get';
import mergeWith from 'lodash/mergeWith';

const INITIAL_STATE = {
  error: null,
  id: null,
  isLoading: false,
  completePaymentCheckout: {
    error: null,
    isLoading: false,
  },
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
  charges: {
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
  operations: {
    error: null,
    isLoading: false,
  },
  operation: {
    error: null,
    isLoading: false,
  },
  orderItem: {
    error: null,
    isLoading: false,
  },
};

const error = (state = INITIAL_STATE.error, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_CHECKOUT_FAILURE:
    case actionTypes.GET_CHECKOUT_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_FAILURE:
      return action.payload.error;
    case actionTypes.CREATE_CHECKOUT_REQUEST:
    case actionTypes.GET_CHECKOUT_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_REQUEST:
    case actionTypes.RESET_CHECKOUT:
      return INITIAL_STATE.error;
    default:
      return state;
  }
};

const id = (state = INITIAL_STATE.id, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_CHECKOUT_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_SUCCESS:
    case actionTypes.GET_CHECKOUT_SUCCESS:
    case actionTypes.GET_CHECKOUT_DETAILS_SUCCESS:
    case actionTypes.SET_ITEM_TAGS_SUCCESS:
    case actionTypes.SET_PROMOCODE_SUCCESS:
    case actionTypes.SET_TAGS_SUCCESS:
      return action.payload.result;
    case actionTypes.RESET_CHECKOUT:
      return INITIAL_STATE.id;
    default:
      return state;
  }
};

const isLoading = (state = INITIAL_STATE.isLoading, action = {}) => {
  switch (action.type) {
    case actionTypes.CREATE_CHECKOUT_REQUEST:
    case actionTypes.GET_CHECKOUT_REQUEST:
    case actionTypes.UPDATE_CHECKOUT_REQUEST:
      return true;
    case actionTypes.CREATE_CHECKOUT_FAILURE:
    case actionTypes.CREATE_CHECKOUT_SUCCESS:
    case actionTypes.GET_CHECKOUT_FAILURE:
    case actionTypes.GET_CHECKOUT_SUCCESS:
    case actionTypes.UPDATE_CHECKOUT_FAILURE:
    case actionTypes.UPDATE_CHECKOUT_SUCCESS:
    case actionTypes.RESET_CHECKOUT:
      return INITIAL_STATE.isLoading;
    default:
      return state;
  }
};

const convertCheckoutOrder = (state, action) => {
  const { entities, result } = action.payload;

  const customizer = (objValue, srcValue, key) => {
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
      [result]: {
        collectpoints: mergedState.checkoutOrders[result].collectpoints,
        ...entities.checkoutOrders[result],
      },
    },
  };
};

const mergeCheckoutOrder = (state, action) => {
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

export const entitiesMapper = {
  [actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS]: mergeCheckoutOrder,
  [actionTypes.GET_COLLECTPOINTS_SUCCESS]: mergeCheckoutOrder,
  [actionTypes.GET_CHECKOUT_DETAILS_SUCCESS]: (state, action) => {
    const { id } = action.meta;
    const currentCheckout = get(state, `checkout[${id}]`);
    const { entities } = action.payload;
    const mergedState = createMergedObject(state, entities);

    return {
      ...mergedState,
      checkout: { [id]: { ...currentCheckout, checkoutOrder: id } },
    };
  },
  [actionTypes.GET_ITEM_DELIVERY_PROVISIONING_SUCCESS]: (state, action) => {
    const { deliveryBundleId } = action.meta;
    const currentDeliveryBundles = get(state, 'deliveryBundles');

    return {
      ...state,
      deliveryBundles: {
        ...currentDeliveryBundles,
        [deliveryBundleId]: {
          ...currentDeliveryBundles[deliveryBundleId],
          ...action.payload.entities,
          itemsIds: action.payload.result,
        },
      },
    };
  },
  [actionTypes.GET_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS]: (
    state,
    action,
  ) => {
    const { deliveryBundleId, upgradeId } = action.meta;
    const currentDeliveryUpgrades = get(state, 'deliveryBundleUpgrades');
    const selectedDeliveryUpgrades = get(
      state,
      `deliveryBundleUpgrades[${deliveryBundleId}]`,
    );
    const itemsId = action.payload.result;
    const entities = action.payload.entities;

    const upgradesWithItemsDeliveryProvisioing = itemsId.reduce(
      (acc, itemID) => {
        return {
          ...acc,
          [itemID]: {
            ...acc[itemID],
            provisioning: {
              upgradeId,
              ...entities.itemDeliveryProvisioning[itemID].provisioning,
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
          ...upgradesWithItemsDeliveryProvisioing,
        },
      },
    };
  },
  [actionTypes.UPDATE_CHECKOUT_SUCCESS]: (state, action) =>
    convertCheckoutOrder(state, action),
  [actionTypes.CREATE_CHECKOUT_SUCCESS]: (state, action) =>
    convertCheckoutOrder(state, action),
  [actionTypes.SET_PROMOCODE_SUCCESS]: (state, action) =>
    convertCheckoutOrder(state, action),
  [actionTypes.GET_CHECKOUT_SUCCESS]: (state, action) =>
    convertCheckoutOrder(state, action),
  [actionTypes.SET_ITEM_TAGS_SUCCESS]: (state, action) =>
    convertCheckoutOrder(state, action),
  [actionTypes.SET_TAGS_SUCCESS]: (state, action) =>
    convertCheckoutOrder(state, action),
  [actionTypes.RESET_CHECKOUT]: state => {
    const {
      checkout,
      checkoutDetails,
      checkoutOrders,
      checkoutOrderItems,
      checkoutOrderItemProducts,
      ...rest
    } = state;

    return { ...rest };
  },
};

export const completePaymentCheckout = reducerFactory(
  'COMPLETE_PAYMENT_CHECKOUT',
  INITIAL_STATE.completePaymentCheckout,
  actionTypes,
);

export const checkoutDetails = reducerFactory(
  'GET_CHECKOUT_DETAILS',
  INITIAL_STATE.checkoutDetails,
  actionTypes,
);

export const collectPoints = reducerFactory(
  'GET_COLLECTPOINTS',
  INITIAL_STATE.collectPoints,
  actionTypes,
);

export const itemTags = reducerFactory(
  'SET_ITEM_TAGS',
  INITIAL_STATE.itemTags,
  actionTypes,
);

export const promoCode = reducerFactory(
  'SET_PROMOCODE',
  INITIAL_STATE.promoCode,
  actionTypes,
);

export const tags = reducerFactory('SET_TAGS', INITIAL_STATE.tags, actionTypes);

export const giftMessage = reducerFactory(
  'UPDATE_GIFT_MESSAGE',
  INITIAL_STATE.giftMessage,
  actionTypes,
);

export const charges = (state = INITIAL_STATE.charges, action = {}) => {
  switch (action.type) {
    case actionTypes.POST_CHARGES_REQUEST:
    case actionTypes.GET_CHARGES_REQUEST:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: true,
      };
    case actionTypes.POST_CHARGES_FAILURE:
    case actionTypes.GET_CHARGES_FAILURE:
      return {
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.POST_CHARGES_SUCCESS:
    case actionTypes.GET_CHARGES_SUCCESS:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_CHARGES:
      return INITIAL_STATE.charges;
    default:
      return state;
  }
};

export const deliveryBundleUpgrades = (
  state = INITIAL_STATE.deliveryBundleUpgrades,
  action = {},
) => {
  switch (action.type) {
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST:
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST:
    case actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_REQUEST:
      return {
        error: INITIAL_STATE.deliveryBundleUpgrades.error,
        isLoading: true,
      };
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS:
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS:
      return {
        error: INITIAL_STATE.deliveryBundleUpgrades.error,
        isLoading: false,
      };
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE:
    case actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE:
    case actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_FAILURE:
      return {
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.GET_DELIVERY_BUNDLE_UPGRADES_SUCCESS:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: false,
        result: action.payload.result,
      };
    default:
      return state;
  }
};

export const itemDeliveryProvisioning = reducerFactory(
  'GET_ITEM_DELIVERY_PROVISIONING',
  INITIAL_STATE.itemDeliveryProvisioning,
  actionTypes,
);

export const upgradeItemDeliveryProvisioning = reducerFactory(
  'GET_UPGRADE_ITEM_DELIVERY_PROVISIONING',
  INITIAL_STATE.upgradeItemDeliveryProvisioning,
  actionTypes,
);

export const operations = reducerFactory(
  'GET_OPERATIONS',
  INITIAL_STATE.operations,
  actionTypes,
);

export const operation = reducerFactory(
  'GET_OPERATION',
  INITIAL_STATE.operation,
  actionTypes,
);

export const orderItem = reducerFactory(
  ['UPDATE_ORDER_ITEM', 'DELETE_ORDER_ITEM'],
  INITIAL_STATE.orderItem,
  actionTypes,
);

export const getError = state => state.error;
export const getId = state => state.id;
export const getIsLoading = state => state.isLoading;
export const getCompletePaymentCheckout = state =>
  state.completePaymentCheckout;
export const getCheckoutDetails = state => state.checkoutDetails;
export const getCollectPoints = state => state.collectPoints;
export const getItemTags = state => state.itemTags;
export const getPromoCode = state => state.promoCode;
export const getTags = state => state.tags;
export const getGiftMessage = state => state.giftMessage;
export const getCharges = state => state.charges;
export const getDeliveryBundleUpgrades = state => state.deliveryBundleUpgrades;
export const getItemDeliveryProvisioning = state =>
  state.itemDeliveryProvisioning;
export const getUpgradeItemDeliveryProvisioning = state =>
  state.upgradeItemDeliveryProvisioning;
export const getOperations = state => state.operations;
export const getOperation = state => state.operation;
export const getOrderItem = state => state.orderItem;

/**
 * Reducer for checkout state.
 *
 * @function checkoutReducer
 * @static
 *
 * @param {object} state - Current redux state.
 * @param {object} action - Action dispatched.
 *
 * @returns {object} New state.
 */
export default combineReducers({
  error,
  id,
  isLoading,
  completePaymentCheckout,
  checkoutDetails,
  collectPoints,
  itemTags,
  promoCode,
  tags,
  giftMessage,
  charges,
  deliveryBundleUpgrades,
  itemDeliveryProvisioning,
  upgradeItemDeliveryProvisioning,
  operations,
  operation,
  orderItem,
});
