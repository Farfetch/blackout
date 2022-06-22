import type * as actionTypes from '../actionTypes';
import type { Action } from 'redux';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type {
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
  DeliveryBundlesEntity,
  DeliveryBundleUpgradesEntity,
} from '../../entities/types';
import type {
  GetChargesResponse,
  GetItemDeliveryProvisioningResponse,
  GetOperationsResponse,
} from '@farfetch/blackout-client/checkout/types';
import type { LOGOUT_SUCCESS } from '../../authentication/actionTypes';
import type { NormalizedSchema } from 'normalizr';
import type { PatchCheckoutOrderItemData } from '@farfetch/blackout-client/checkout/types/patchCheckoutOrderItem.types';

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

export interface LogoutAction extends Action {
  type: typeof LOGOUT_SUCCESS;
}

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

export interface ResetChargesStateAction extends Action {
  type: typeof actionTypes.RESET_CHARGES_STATE;
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
  payload: NormalizedSchema<GetItemDeliveryProvisioningResponse, string[]>;
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

export interface FetchChargesSuccessAction extends Action {
  type: typeof actionTypes.FETCH_CHARGES_SUCCESS;
  payload: GetChargesResponse;
}

export interface FetchChargesFailureAction extends Action {
  type: typeof actionTypes.FETCH_CHARGES_FAILURE;
  payload: { error: BlackoutError };
}

export interface FetchChargesRequestAction extends Action {
  type: typeof actionTypes.FETCH_CHARGES_REQUEST;
}

/**
 * Fetch Charges Action.
 */
export type FetchChargesAction =
  | FetchChargesFailureAction
  | FetchChargesSuccessAction
  | FetchChargesRequestAction;

export interface ChargeSuccessAction extends Action {
  type: typeof actionTypes.CHARGE_SUCCESS;
  payload: GetChargesResponse;
}

export interface ChargeFailureAction extends Action {
  type: typeof actionTypes.CHARGE_FAILURE;
  payload: { error: BlackoutError };
}

export interface ChargeRequestAction extends Action {
  type: typeof actionTypes.CHARGE_REQUEST;
}

/**
 * Charge Action.
 */
export type ChargeAction =
  | ChargeFailureAction
  | ChargeSuccessAction
  | ChargeRequestAction;

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

export interface CompletePaymentCheckoutSuccessAction extends Action {
  type: typeof actionTypes.COMPLETE_PAYMENT_CHECKOUT_SUCCESS;
  meta: { id: number };
  payload: Payload;
}

export interface FetchCollectPointsSuccessAction extends Action {
  type: typeof actionTypes.FETCH_COLLECT_POINTS_SUCCESS;
  meta: { id: number };
  payload: Payload;
}

// Checkout Operations Actions
export type OperationsSuccessResult = Omit<GetOperationsResponse, 'entries'> & {
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
