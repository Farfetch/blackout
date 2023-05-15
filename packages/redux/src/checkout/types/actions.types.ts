import type * as actionTypes from '../actionTypes.js';
import type { Action } from 'redux';
import type {
  BlackoutError,
  CheckoutOrderCharge,
  CheckoutOrderDeliveryBundle,
  CheckoutOrderDeliveryBundleUpgrades,
  CheckoutOrderItemDeliveryProvisioning,
  CheckoutOrderOperations,
  PatchCheckoutOrderItemData,
  PaymentMethods,
} from '@farfetch/blackout-client';
import type {
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderDeliveryBundleEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
} from '../../entities/types/index.js';
import type { NormalizedSchema } from 'normalizr';

type Payload = NormalizedSchema<
  {
    checkout: Record<CheckoutEntity['id'], CheckoutEntity>;
    checkoutOrderItems: Record<
      CheckoutOrderItemEntity['id'],
      CheckoutOrderItemEntity
    >;
    checkoutOrders: Record<string, CheckoutOrderEntity>;
    checkoutDetails?: Record<
      CheckoutDetailsEntity['checkoutOrder'],
      CheckoutDetailsEntity
    >;
    deliveryBundles?: Record<
      CheckoutOrderDeliveryBundleEntity['id'],
      CheckoutOrderDeliveryBundleEntity
    >;
    deliveryBundleUpgrades?: Record<
      CheckoutOrderDeliveryBundle['id'],
      CheckoutOrderDeliveryBundleUpgrades
    >;
  },
  string
>;

export interface GenericCheckoutRequestAction extends Action {
  type:
    | typeof actionTypes.CREATE_CHECKOUT_ORDER_REQUEST
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_REQUEST
    | typeof actionTypes.FETCH_CHECKOUT_ORDER_REQUEST
    | typeof actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_REQUEST
    | typeof actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_REQUEST
    | typeof actionTypes.SET_CHECKOUT_ORDER_TAGS_REQUEST;
}
export interface GenericCheckoutSuccessAction extends Action {
  type:
    | typeof actionTypes.CREATE_CHECKOUT_ORDER_SUCCESS
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_SUCCESS
    | typeof actionTypes.FETCH_CHECKOUT_ORDER_SUCCESS
    | typeof actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_SUCCESS
    | typeof actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_SUCCESS
    | typeof actionTypes.SET_CHECKOUT_ORDER_TAGS_SUCCESS;
  payload: Payload;
}
export interface GenericCheckoutFailureAction extends Action {
  type:
    | typeof actionTypes.CREATE_CHECKOUT_ORDER_FAILURE
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_FAILURE
    | typeof actionTypes.FETCH_CHECKOUT_ORDER_FAILURE
    | typeof actionTypes.SET_CHECKOUT_ORDER_ITEM_TAGS_FAILURE
    | typeof actionTypes.SET_CHECKOUT_ORDER_PROMOCODES_FAILURE
    | typeof actionTypes.SET_CHECKOUT_ORDER_TAGS_FAILURE;
  payload: { error: BlackoutError };
}

/**
 * Generic Checkout Action.
 */
export type GenericCheckoutAction =
  | GenericCheckoutFailureAction
  | GenericCheckoutSuccessAction
  | GenericCheckoutRequestAction;

export interface ResetCheckoutStateAction extends Action {
  type: typeof actionTypes.RESET_CHECKOUT;
}

export interface ResetCheckoutOrderChargeStateAction extends Action {
  type: typeof actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE;
}

export interface FetchCheckoutDetailsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_SUCCESS;
  meta: { id: number };
  payload: Payload;
}
export interface FetchCheckoutDetailsFailureAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_FAILURE;
  payload: { error: BlackoutError };
}

export interface FetchCheckoutDetailsRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DETAILS_REQUEST;
}

/**
 * Checkout Details Action.
 */
export type FetchCheckoutDetailsAction =
  | FetchCheckoutDetailsFailureAction
  | FetchCheckoutDetailsSuccessAction
  | FetchCheckoutDetailsRequestAction;

export interface FetchUpgradeItemDeliveryProvisioningSuccessAction
  extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_PROVISIONING_SUCCESS;
  meta: { deliveryBundleId: string; upgradeId: string };
  payload: NormalizedSchema<CheckoutOrderDeliveryBundleEntity, string[]>;
}

export interface FetchItemDeliveryProvisioningSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_SUCCESS;
  meta: { deliveryBundleId: string };
  payload: NormalizedSchema<CheckoutOrderItemDeliveryProvisioning[], string[]>;
}

export interface FetchItemDeliveryProvisioningFailureAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_FAILURE;
  payload: { error: BlackoutError };
}

export interface FetchItemDeliveryProvisioningRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_PROVISIONING_REQUEST;
}

/**
 * Item Delivery Provisioning Action.
 */
export type FetchItemDeliveryProvisioningAction =
  | FetchUpgradeItemDeliveryProvisioningSuccessAction
  | FetchItemDeliveryProvisioningFailureAction
  | FetchItemDeliveryProvisioningSuccessAction
  | FetchItemDeliveryProvisioningRequestAction;

export interface FetchCheckoutOrderChargeSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_SUCCESS;
  payload: CheckoutOrderCharge;
}

export interface FetchCheckoutOrderChargeFailureAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_FAILURE;
  payload: { error: BlackoutError };
}

export interface FetchCheckoutOrderChargeRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_CHARGE_REQUEST;
}

/**
 * Fetch Checkout Order Charge Action.
 */
export type FetchCheckoutOrderChargeAction =
  | FetchCheckoutOrderChargeFailureAction
  | FetchCheckoutOrderChargeSuccessAction
  | FetchCheckoutOrderChargeRequestAction;

export interface CreateCheckoutOrderChargeSuccessAction extends Action {
  type: typeof actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_SUCCESS;
  payload: CheckoutOrderCharge;
}

export interface CreateCheckoutOrderChargeFailureAction extends Action {
  type: typeof actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_FAILURE;
  payload: { error: BlackoutError };
}

export interface CreateCheckoutOrderChargeRequestAction extends Action {
  type: typeof actionTypes.CREATE_CHECKOUT_ORDER_CHARGE_REQUEST;
}

/**
 * Charge Action.
 */
export type CreateCheckoutOrderChargeAction =
  | CreateCheckoutOrderChargeFailureAction
  | CreateCheckoutOrderChargeSuccessAction
  | CreateCheckoutOrderChargeRequestAction;

export interface UpdateCheckoutOrderDeliveryBundleSuccessAction extends Action {
  type:
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_SUCCESS
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS;
}

export interface FetchCheckoutOrderDeliveryBundleSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_SUCCESS;
  payload: { result: string };
}

export interface CheckoutOrderDeliveryBundleFailureAction extends Action {
  type:
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_FAILURE
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE
    | typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_FAILURE;
  payload: { error: BlackoutError };
}

export interface CheckoutOrderDeliveryBundleRequestAction extends Action {
  type:
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADE_REQUEST
    | typeof actionTypes.UPDATE_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST
    | typeof actionTypes.FETCH_CHECKOUT_ORDER_DELIVERY_BUNDLE_UPGRADES_REQUEST;
}

/**
 * CheckoutOrderDeliveryBundle Action.
 */
export type CheckoutOrderDeliveryBundleAction =
  | CheckoutOrderDeliveryBundleFailureAction
  | UpdateCheckoutOrderDeliveryBundleSuccessAction
  | FetchCheckoutOrderDeliveryBundleSuccessAction
  | CheckoutOrderDeliveryBundleRequestAction;

export interface FetchCollectPointsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_COLLECT_POINTS_SUCCESS;
  meta: { id: number };
  payload: Payload;
}

// Checkout Operations Actions
export type CheckoutOrderOperationsNormalized = Omit<
  CheckoutOrderOperations,
  'entries'
> & {
  /**
   * Operation ids in the page of the response. Pages have between 1 and 180 items,
   * typically depending on the parameter pageSize. By default, pages have 60 items.
   */
  entries: string[];
};

// Remove Checkout Order Item Action
export interface RemoveCheckoutOrderItemSuccessAction extends Action {
  type: typeof actionTypes.REMOVE_CHECKOUT_ORDER_ITEM_SUCCESS;
  meta: { id: CheckoutOrderItemEntity['id'] };
}

// Update Checkout Order Item Action
export interface UpdateCheckoutOrderItemSuccessAction extends Action {
  type: typeof actionTypes.UPDATE_CHECKOUT_ORDER_ITEM_SUCCESS;
  meta: { id: CheckoutOrderItemEntity['id'] };
  payload: PatchCheckoutOrderItemData;
}

/**
 * Fetch Checkout Order Payment Methods Actions.
 */
export type FetchCheckoutOrderPaymentMethodsAction =
  | FetchCheckoutOrderPaymentMethodsFailureAction
  | FetchCheckoutOrderPaymentMethodsRequestAction
  | FetchCheckoutOrderPaymentMethodsSuccessAction;

export interface FetchCheckoutOrderPaymentMethodsFailureAction extends Action {
  payload: { error: BlackoutError };
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_FAILURE;
}

export interface FetchCheckoutOrderPaymentMethodsRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_REQUEST;
}

export interface FetchCheckoutOrderPaymentMethodsSuccessAction extends Action {
  payload: {
    entities: {
      checkout: Record<number, { paymentMethods: PaymentMethods }>;
    };
  };
  type: typeof actionTypes.FETCH_CHECKOUT_ORDER_PAYMENT_METHODS_SUCCESS;
}
