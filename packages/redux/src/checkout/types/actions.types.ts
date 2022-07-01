import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type {
  BlackoutError,
  CheckoutOrderCharge,
  GetCheckoutOrderDeliveryBundleProvisioningResponse,
  GetCheckoutOrderOperationsResponse,
  PatchCheckoutOrderItemData,
} from '@farfetch/blackout-client';
import type {
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
  DeliveryBundlesEntity,
  DeliveryBundleUpgradesEntity,
} from '../../entities/types';
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
      CheckoutDetailsEntity['id'],
      CheckoutDetailsEntity
    >;
    deliveryBundles?: Record<
      DeliveryBundlesEntity['id'],
      DeliveryBundlesEntity
    >;
    deliveryBundleUpgrades?: DeliveryBundleUpgradesEntity;
  },
  string
>;

export interface GenericCheckoutRequestAction extends Action {
  type:
    | typeof actionTypes.CREATE_CHECKOUT_REQUEST
    | typeof actionTypes.UPDATE_CHECKOUT_REQUEST
    | typeof actionTypes.FETCH_CHECKOUT_REQUEST
    | typeof actionTypes.SET_ITEM_TAGS_REQUEST
    | typeof actionTypes.SET_PROMOCODE_REQUEST
    | typeof actionTypes.SET_TAGS_REQUEST;
}
export interface GenericCheckoutSuccessAction extends Action {
  type:
    | typeof actionTypes.CREATE_CHECKOUT_SUCCESS
    | typeof actionTypes.UPDATE_CHECKOUT_SUCCESS
    | typeof actionTypes.FETCH_CHECKOUT_SUCCESS
    | typeof actionTypes.SET_ITEM_TAGS_SUCCESS
    | typeof actionTypes.SET_PROMOCODE_SUCCESS
    | typeof actionTypes.SET_TAGS_SUCCESS;
  payload: Payload;
}
export interface GenericCheckoutFailureAction extends Action {
  type:
    | typeof actionTypes.CREATE_CHECKOUT_FAILURE
    | typeof actionTypes.UPDATE_CHECKOUT_FAILURE
    | typeof actionTypes.FETCH_CHECKOUT_FAILURE
    | typeof actionTypes.SET_ITEM_TAGS_FAILURE
    | typeof actionTypes.SET_PROMOCODE_FAILURE
    | typeof actionTypes.SET_TAGS_FAILURE;
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
  type: typeof actionTypes.RESET_CHECKOUT_STATE;
}

export interface ResetCheckoutOrderChargeStateAction extends Action {
  type: typeof actionTypes.RESET_CHECKOUT_ORDER_CHARGE_STATE;
}

export interface FetchCheckoutDetailsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_DETAILS_SUCCESS;
  meta: { id: number };
  payload: Payload;
}
export interface FetchCheckoutDetailsFailureAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_DETAILS_FAILURE;
  payload: { error: BlackoutError };
}

export interface FetchCheckoutDetailsRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHECKOUT_DETAILS_REQUEST;
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
  type: typeof actionTypes.FETCH_UPGRADE_ITEM_DELIVERY_PROVISIONING_SUCCESS;
  meta: { deliveryBundleId: string; upgradeId: string };
  payload: NormalizedSchema<DeliveryBundlesEntity, string[]>;
}

export interface FetchItemDeliveryProvisioningSuccessAction extends Action {
  type: typeof actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_SUCCESS;
  meta: { deliveryBundleId: string };
  payload: NormalizedSchema<
    GetCheckoutOrderDeliveryBundleProvisioningResponse,
    string[]
  >;
}

export interface FetchItemDeliveryProvisioningFailureAction extends Action {
  type: typeof actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_FAILURE;
  payload: { error: BlackoutError };
}

export interface FetchItemDeliveryProvisioningRequestAction extends Action {
  type: typeof actionTypes.FETCH_ITEM_DELIVERY_PROVISIONING_REQUEST;
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

export interface UpdateDeliveryBundleSuccessAction extends Action {
  type:
    | typeof actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_SUCCESS
    | typeof actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_SUCCESS;
}

export interface FetchDeliveryBundleSuccessAction extends Action {
  type: typeof actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_SUCCESS;
  payload: { result: string };
}

export interface DeliveryBundleFailureAction extends Action {
  type:
    | typeof actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_FAILURE
    | typeof actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_FAILURE
    | typeof actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_FAILURE;
  payload: { error: BlackoutError };
}

export interface DeliveryBundleRequestAction extends Action {
  type:
    | typeof actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADE_REQUEST
    | typeof actionTypes.UPDATE_DELIVERY_BUNDLE_UPGRADES_REQUEST
    | typeof actionTypes.FETCH_DELIVERY_BUNDLE_UPGRADES_REQUEST;
}

/**
 * DeliveryBundle Action.
 */
export type DeliveryBundleAction =
  | DeliveryBundleFailureAction
  | UpdateDeliveryBundleSuccessAction
  | FetchDeliveryBundleSuccessAction
  | DeliveryBundleRequestAction;

export interface FetchCollectPointsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_COLLECT_POINTS_SUCCESS;
  meta: { id: number };
  payload: Payload;
}

// Checkout Operations Actions
export type OperationsSuccessResult = Omit<
  GetCheckoutOrderOperationsResponse,
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
