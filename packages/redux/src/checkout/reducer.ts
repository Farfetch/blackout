/**
 * @module checkout/reducer
 * @category Checkout
 * @subcategory Reducer
 */

import * as actionTypes from './actionTypes';
import { combineReducers } from 'redux';
import { createMergedObject, reducerFactory } from '../helpers';
import { LOGOUT_SUCCESS } from '../authentication/actionTypes';
import assignWith from 'lodash/assignWith';
import get from 'lodash/get';
import mergeWith from 'lodash/mergeWith';
import type {
  ChargeFailureAction,
  ChargeRequestAction,
  ChargeSuccessAction,
  CompletePaymentCheckoutSuccessAction,
  DeliveryBundleFailureAction,
  DeliveryBundleRequestAction,
  FetchChargesFailureAction,
  FetchChargesRequestAction,
  FetchChargesSuccessAction,
  FetchCheckoutDetailsSuccessAction,
  FetchCollectPointsSuccessAction,
  FetchDeliveryBundleSuccessAction,
  FetchItemDeliveryProvisioningSuccessAction,
  FetchUpgradeItemDeliveryProvisioningSuccessAction,
  GenericCheckoutAction,
  GenericCheckoutFailureAction,
  GenericCheckoutRequestAction,
  GenericCheckoutSuccessAction,
  LogoutAction,
  ResetChargesStateAction,
  ResetCheckoutStateAction,
  State,
  StateWithResult,
  UpdateDeliveryBundleSuccessAction,
} from './types';
import type { StoreState } from '../types';

export const INITIAL_STATE = {
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
};

const error = (
  state = INITIAL_STATE.error,
  action:
    | GenericCheckoutFailureAction
    | GenericCheckoutRequestAction
    | ResetCheckoutStateAction
    | LogoutAction,
): State['error'] => {
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
    | LogoutAction
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
  action: GenericCheckoutAction | ResetCheckoutStateAction | LogoutAction,
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
  state: StoreState['entities'],
  action: GenericCheckoutSuccessAction,
): StoreState['entities'] => {
  const { entities, result } = action.payload;

  const customizer = (objValue: any, srcValue: any, key: string) => {
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
  state: StoreState['entities'],
  action:
    | CompletePaymentCheckoutSuccessAction
    | FetchCollectPointsSuccessAction,
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

export const entitiesMapper = {
  [actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS as typeof actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS]:
    mergeCheckoutOrder,
  [actionTypes.FETCH_COLLECT_POINTS_SUCCESS as typeof actionTypes.FETCH_COLLECT_POINTS_SUCCESS]:
    mergeCheckoutOrder,
  [actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS as typeof actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: FetchCheckoutDetailsSuccessAction,
    ): StoreState['entities'] => {
      const { id } = action.meta;
      const currentCheckout = get(state, `checkout[${id}]`);
      const { entities } = action.payload;
      const mergedState = createMergedObject(state, entities);

      return {
        ...mergedState,
        checkout: { [id]: { ...currentCheckout, checkoutOrder: id } },
      };
    },
  [actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS as typeof actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS]:
    (
      state: StoreState['entities'],
      action: FetchItemDeliveryProvisioningSuccessAction,
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
  [actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS as typeof actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS]:
    (
      state: StoreState['entities'],
      action: FetchUpgradeItemDeliveryProvisioningSuccessAction,
    ): StoreState['entities'] => {
      const { deliveryBundleId, upgradeId } = action.meta;
      const currentDeliveryUpgrades = get(state, 'deliveryBundleUpgrades');
      const selectedDeliveryUpgrades = get(
        state,
        `deliveryBundleUpgrades[${deliveryBundleId}]`,
      );
      const { result: itemsId, entities } = action.payload;

      const upgradesWithItemsDeliveryProvisioing = itemsId.reduce(
        (acc: { [x: string]: any }, itemID: string) => {
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
            ...upgradesWithItemsDeliveryProvisioing,
          },
        },
      };
    },
  [actionTypes.UPDATE_CHECKOUT_SUCCESS as typeof actionTypes.UPDATE_CHECKOUT_SUCCESS]:
    (
      state: StoreState['entities'],
      action: GenericCheckoutSuccessAction,
    ): StoreState['entities'] => convertCheckoutOrder(state, action),
  [actionTypes.CREATE_CHECKOUT_SUCCESS as typeof actionTypes.CREATE_CHECKOUT_SUCCESS]:
    (
      state: StoreState['entities'],
      action: GenericCheckoutSuccessAction,
    ): StoreState['entities'] => convertCheckoutOrder(state, action),
  [actionTypes.SET_PROMOCODE_SUCCESS as typeof actionTypes.SET_PROMOCODE_SUCCESS]:
    (
      state: StoreState['entities'],
      action: GenericCheckoutSuccessAction,
    ): StoreState['entities'] => convertCheckoutOrder(state, action),
  [actionTypes.FETCH_CHECKOUT_SUCCESS as typeof actionTypes.FETCH_CHECKOUT_SUCCESS]:
    (
      state: StoreState['entities'],
      action: GenericCheckoutSuccessAction,
    ): StoreState['entities'] => convertCheckoutOrder(state, action),
  [actionTypes.SET_ITEM_TAGS_SUCCESS as typeof actionTypes.SET_ITEM_TAGS_SUCCESS]:
    (
      state: StoreState['entities'],
      action: GenericCheckoutSuccessAction,
    ): StoreState['entities'] => convertCheckoutOrder(state, action),
  [actionTypes.SET_TAGS_SUCCESS as typeof actionTypes.SET_TAGS_SUCCESS]: (
    state: StoreState['entities'],
    action: GenericCheckoutSuccessAction,
  ): StoreState['entities'] => convertCheckoutOrder(state, action),
  [actionTypes.RESET_CHECKOUT_STATE as typeof actionTypes.RESET_CHECKOUT_STATE]:
    (state: StoreState['entities']): StoreState['entities'] => {
      const {
        checkout,
        checkoutDetails,
        checkoutOrders,
        checkoutOrderItems,
        ...rest
      } = state;

      return { ...rest };
    },
  [LOGOUT_SUCCESS as typeof LOGOUT_SUCCESS]: (
    state: StoreState['entities'],
  ): StoreState['entities'] => {
    const {
      checkout,
      checkoutDetails,
      checkoutOrders,
      checkoutOrderItems,
      ...rest
    } = state;

    return { ...rest };
  },
};

export const completePaymentCheckout = reducerFactory(
  'COMPLETE_PAYMENT_CHECKOUT',
  INITIAL_STATE.completePaymentCheckout,
  actionTypes,
  true,
);

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

export const charges = (
  state = INITIAL_STATE.charges,
  action:
    | LogoutAction
    | FetchChargesSuccessAction
    | FetchChargesFailureAction
    | FetchChargesRequestAction
    | ChargeSuccessAction
    | ChargeFailureAction
    | ChargeRequestAction
    | ResetChargesStateAction,
): StateWithResult => {
  switch (action?.type) {
    case actionTypes.CHARGE_REQUEST:
    case actionTypes.FETCH_CHARGES_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.charges.error,
        isLoading: true,
      };
    case actionTypes.CHARGE_FAILURE:
    case actionTypes.FETCH_CHARGES_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    case actionTypes.CHARGE_SUCCESS:
    case actionTypes.FETCH_CHARGES_SUCCESS:
      return {
        error: INITIAL_STATE.charges.error,
        isLoading: false,
        result: action.payload,
      };
    case actionTypes.RESET_CHARGES_STATE:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE.charges;
    default:
      return state;
  }
};

export const deliveryBundleUpgrades = (
  state = INITIAL_STATE.deliveryBundleUpgrades,
  action:
    | LogoutAction
    | DeliveryBundleRequestAction
    | UpdateDeliveryBundleSuccessAction
    | FetchDeliveryBundleSuccessAction
    | DeliveryBundleFailureAction,
): StateWithResult => {
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
        error: INITIAL_STATE.charges.error,
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

export const getError = (state: State): State['error'] => state.error;
export const getId = (state: State): State['id'] => state.id;
export const getIsLoading = (state: State): State['isLoading'] =>
  state.isLoading;

export const getCompletePaymentCheckout = (
  state: State,
): State['completePaymentCheckout'] => state.completePaymentCheckout;
export const getCheckoutDetails = (state: State): State['checkoutDetails'] =>
  state.checkoutDetails;
export const getCollectPoints = (state: State): State['collectPoints'] =>
  state.collectPoints;
export const getItemTags = (state: State): State['itemTags'] => state.itemTags;
export const getPromoCode = (state: State): State['promoCode'] =>
  state.promoCode;
export const getTags = (state: State): State['tags'] => state.tags;
export const getGiftMessage = (state: State): State['giftMessage'] =>
  state.giftMessage;
export const getCharges = (state: State): State['charges'] => state.charges;
export const getDeliveryBundleUpgrades = (
  state: State,
): State['deliveryBundleUpgrades'] => state.deliveryBundleUpgrades;
export const getItemDeliveryProvisioning = (
  state: State,
): State['itemDeliveryProvisioning'] => state.itemDeliveryProvisioning;
export const getUpgradeItemDeliveryProvisioning = (
  state: State,
): State['upgradeItemDeliveryProvisioning'] =>
  state.upgradeItemDeliveryProvisioning;

/**
 * Reducer for checkout state.
 *
 * @function checkoutReducer
 * @static
 * @param {object} state - Current redux state.
 * // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
 * @param {object} action - Action dispatched.
 *
 * // @ts-expect-error ts-migrate(7006) FIXME: Parameter 'state' implicitly has an 'any' type.
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
});
