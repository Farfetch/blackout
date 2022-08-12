import { createSelector } from 'reselect';
import {
  getCheckoutOrderCharge as getCheckoutOrderChargeFromReducer,
  getCheckoutOrderDeliveryBundleProvisioning,
  getCheckoutOrderDeliveryBundleUpgradeProvisioning,
  getCheckoutOrderDeliveryBundleUpgrades,
  getCheckoutOrderDetails as getCheckoutOrderDetailsFromReducer,
  getCheckoutOrderItems as getCheckoutOrderItemsFromReducer,
  getCheckoutOrderItemTags as getCheckoutOrderItemTagsFromReducer,
  getCheckoutOrderPromocode as getCheckoutOrderPromocodeFromReducer,
  getCheckoutOrderTags as getCheckoutOrderTagsFromReducer,
  getCollectPoints,
  getError,
  getId,
  getIsLoading,
  getOperation,
  getOperations,
  getRemoveOrderItem,
  getUpdateOrderItem,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import findKey from 'lodash/findKey';
import get from 'lodash/get';
import type {
  CheckoutOrderItemEntity,
  DeliveryBundleEntity,
} from '../entities';
import type { CheckoutState } from './types';
import type {
  DeliveryWindowType,
  ItemDeliveryOption,
  ShippingOption,
} from '@farfetch/blackout-client';
import type { StoreState } from '../types';

export type DeliveryBundleWindow = {
  minEstimatedDeliveryDate: string;
  maxEstimatedDeliveryDate: string;
};

export enum TimeLimitType {
  min,
  max,
}

interface INITIAL_VALUE {
  minEstimatedDeliveryHour: null | number;
  maxEstimatedDeliveryHour: null | number;
}

/**
 * Returns the checkout id.
 *
 * @param state - Application state.
 *
 * @returns Checkout id.
 */
export const getCheckoutId = (state: StoreState) =>
  getId(state.checkout as CheckoutState);

/**
 * Returns the checkout.
 *
 * @param state - Application state.
 *
 * @returns Checkout object.
 */
export const getCheckout = (state: StoreState) => {
  const checkoutId = getCheckoutId(state);

  return checkoutId ? getEntityById(state, 'checkout', checkoutId) : undefined;
};

/**
 * Returns the checkout order charge.
 *
 * @param state - Application state.
 *
 * @returns Charge object.
 */
export const getCheckoutOrderCharge = (state: StoreState) =>
  getCheckoutOrderChargeFromReducer(state.checkout as CheckoutState);

/**
 * Returns the checkout order.
 *
 * @param state - Application state.
 *
 * @returns Checkout order entity or undefined.
 */
export const getCheckoutOrder = (state: StoreState) => {
  const checkoutId = getCheckoutId(state);

  return checkoutId
    ? getEntityById(state, 'checkoutOrders', checkoutId)
    : undefined;
};

/**
 * Returns the checkout order details.
 *
 * @param state - Application state.
 *
 * @returns Checkout order details or undefined.
 */
export const getCheckoutOrderDetails = (state: StoreState) => {
  const checkoutId = getCheckoutId(state);

  return checkoutId
    ? getEntityById(state, 'checkoutDetails', checkoutId)
    : undefined;
};

/**
 * Returns a specific checkout order item identified by its id.
 *
 * @param state               - Application state.
 * @param checkoutOrderItemId - Checkout order item id.
 *
 * @returns Checkout order item object.
 */
export const getCheckoutOrderItem = (
  state: StoreState,
  checkoutOrderItemId: number,
) => getEntityById(state, 'checkoutOrderItems', checkoutOrderItemId);

/**
 * Returns the product identified by the checkout order item id.
 *
 * @param state               - Application state.
 * @param checkoutOrderItemId - Checkout order item id.
 *
 * @returns Product object.
 */
export const getCheckoutOrderItemProduct = (
  state: StoreState,
  checkoutOrderItemId: number,
) => {
  const checkoutOrderItem = getCheckoutOrderItem(state, checkoutOrderItemId);
  const productId = get(checkoutOrderItem, 'product');

  if (!productId) {
    return undefined;
  }

  return getEntityById(state, 'checkoutOrderItemProducts', productId);
};

/**
 * Returns all the checkout order items ids.
 *
 * @param state - Application state.
 *
 * @returns List of checkout order items ids.
 */
export const getCheckoutOrderItemsIds = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.items,
);

/**
 * Returns all the checkout order items.
 *
 * @param state - Application state.
 *
 * @returns List of checkout order items.
 */
export const getCheckoutOrderItems = createSelector(
  [
    (state: StoreState) => getEntities(state, 'checkoutOrderItems') || {},
    getCheckoutOrderItemsIds,
  ],
  (checkoutOrderItems, checkoutOrderItemsIds) =>
    checkoutOrderItemsIds
      ?.map(checkoutOrderItemId => checkoutOrderItems[checkoutOrderItemId])
      .filter(Boolean) as CheckoutOrderItemEntity[] | undefined,
);

/**
 * Returns all the checkout collect points.
 *
 * @param state - Application state.
 *
 * @returns List of checkout collect points.
 */
export const getCheckoutOrderCollectPoints = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.collectpoints,
);

/**
 * Returns the selected collect point.
 *
 * @param state - Application state.
 *
 * @returns Selected collect point.
 */
export const getCheckoutOrderSelectedCollectPoint = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.clickAndCollect,
);

/**
 * Returns the checkout shipping options.
 *
 * @param state - Application state.
 *
 * @returns Checkout shipping options.
 */
export const getCheckoutShippingOptions = createSelector(
  [getCheckout],
  checkout => checkout?.shippingOptions,
);

/**
 * Returns a specific checkout delivery bundle identified by its id.
 *
 * @param state            - Application state.
 * @param deliveryBundleId - Delivery bundle id.
 *
 * @returns Delivery bundle.
 */
export const getCheckoutDeliveryBundle = (
  state: StoreState,
  deliveryBundleId: string,
) => getEntityById(state, 'deliveryBundles', deliveryBundleId);

/**
 * Returns the selected checkout delivery bundle identified by its id.
 *
 * @param state - Application state.
 *
 * @returns Selected delivery bundle id.
 */
export const getCheckoutSelectedDeliveryBundleId = createSelector(
  [(state: StoreState) => getEntities(state, 'deliveryBundles')],
  deliveryBundles => findKey(deliveryBundles, 'isSelected'),
);

/**
 * Returns the checkout delivery bundles.
 *
 * @param state - Application state.
 *
 * @returns Checkout delivery bundles ids.
 */
export const getCheckoutDeliveryBundlesIds = createSelector(
  [getCheckout],
  checkout => checkout?.deliveryBundles,
);

/**
 * Returns the checkout delivery bundles.
 *
 * @param state - Application state.
 *
 * @returns Checkout delivery bundles.
 */
export const getCheckoutDeliveryBundles = createSelector(
  [
    getCheckoutDeliveryBundlesIds,
    state => getEntities(state, 'deliveryBundles'),
  ],
  (deliveryBundlesIds, deliveryBundles) =>
    deliveryBundlesIds
      ?.map(id => deliveryBundles && deliveryBundles[id])
      .filter(Boolean) as DeliveryBundleEntity[] | undefined,
);

/**
 * Returns all the delivery upgrades identified by its delivery bundle.
 *
 * @param state            - Application state.
 * @param deliveryBundleId - Delivery bundle id.
 *
 * @returns Delivery bundle upgrades.
 */
export const getCheckoutDeliveryBundleUpgrades = (
  state: StoreState,
  deliveryBundleId: string,
) => getEntityById(state, 'deliveryBundleUpgrades', deliveryBundleId);

/**
 * Returns a specific delivery bundle upgrade.
 *
 * @param state            - Application state.
 * @param deliveryBundleId - Delivery bundle id.
 * @param itemId           - Item id.
 * @param upgradeType      - Upgrade type ('Estimated' or 'Nominated').
 * @param upgradeId        - Upgrade id.
 *
 * @returns Delivery bundle upgrade.
 */
export const getCheckoutDeliveryBundleUpgrade = createSelector(
  [
    (state: StoreState, deliveryBundleId: string) =>
      getCheckoutDeliveryBundleUpgrades(state, deliveryBundleId),
    (
      state: StoreState,
      deliveryBundleId: string,
      itemId: number,
      upgradeType: DeliveryWindowType | string,
      upgradeId: string,
    ) => ({
      deliveryBundleId,
      itemId,
      upgradeType,
      upgradeId,
    }),
  ],
  (checkoutDeliveryBundleUpgrades, { itemId, upgradeId, upgradeType }) => {
    const itemUpgrades = checkoutDeliveryBundleUpgrades?.[itemId];
    const upgrades =
      itemUpgrades?.[upgradeType as keyof typeof DeliveryWindowType];

    return upgrades?.find(({ id }) => id === upgradeId);
  },
);

/**
 * Returns the checkout estimated delivery period for the selected collect point.
 *
 * @param state - Application state.
 *
 * @returns Checkout estimated delivery period.
 */
export const getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod =
  createSelector(
    [getCheckoutOrderSelectedCollectPoint, getCheckoutShippingOptions],
    (selectedCollectPoint, shippingOptions) => {
      const merchantLocationId = get(
        selectedCollectPoint,
        'merchantLocationId',
      );
      if (!merchantLocationId) return;

      const initialValue: INITIAL_VALUE = {
        minEstimatedDeliveryHour: null,
        maxEstimatedDeliveryHour: null,
      };

      const selectedShippingService = shippingOptions?.reduce(
        (
          service: {
            minEstimatedDeliveryHour: number | null;
            maxEstimatedDeliveryHour: number | null;
          },
          shippingOption: ShippingOption,
        ) => {
          const emptyArray: number[] = [];
          const merchants = get(shippingOption, 'merchants', emptyArray);
          if (merchants.includes(merchantLocationId)) {
            const { minEstimatedDeliveryHour, maxEstimatedDeliveryHour } =
              shippingOption.shippingService;

            service.minEstimatedDeliveryHour = minEstimatedDeliveryHour;
            service.maxEstimatedDeliveryHour = maxEstimatedDeliveryHour;
          }

          return service;
        },
        initialValue,
      );

      return {
        start: selectedShippingService?.minEstimatedDeliveryHour,
        end: selectedShippingService?.maxEstimatedDeliveryHour,
      };
    },
  );

/**
 * Returns the checkout error.
 *
 * @param state - Application state.
 *
 * @returns Checkout error.
 */
export const getCheckoutError = (state: StoreState) =>
  getError(state.checkout as CheckoutState);

/**
 * Returns the loading status for the checkout.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isCheckoutLoading = (state: StoreState) =>
  getIsLoading(state.checkout as CheckoutState);

/**
 * Returns the loading status for the checkout details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout details operation Loading status.
 */
export const areCheckoutOrderDetailsLoading = (state: StoreState) =>
  getCheckoutOrderDetailsFromReducer(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the checkout details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout details operation error.
 */
export const getCheckoutOrderDetailsError = (state: StoreState) =>
  getCheckoutOrderDetailsFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation Loading status.
 */
export const areCollectPointsLoading = (state: StoreState) =>
  getCollectPoints(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation error.
 */
export const getCollectPointsError = (state: StoreState) =>
  getCollectPoints(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the item tags operation.
 *
 * @param state - Application state.
 *
 * @returns Item tags operation Loading status.
 */
export const areCheckoutOrderItemTagsLoading = (state: StoreState) =>
  getCheckoutOrderItemTagsFromReducer(state.checkout as CheckoutState)
    .isLoading;

/**
 * Returns the error for the items tags operation.
 *
 * @param state - Application state.
 *
 * @returns Items tags operation error.
 */
export const getCheckoutOrderItemTagsError = (state: StoreState) =>
  getCheckoutOrderItemTagsFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the promocode operation.
 *
 * @param state - Application state.
 *
 * @returns Promocode operation Loading status.
 */
export const isCheckoutOrderPromocodeLoading = (state: StoreState) =>
  getCheckoutOrderPromocodeFromReducer(state.checkout as CheckoutState)
    .isLoading;

/**
 * Returns the error for the promocode operation.
 *
 * @param state - Application state.
 *
 * @returns Promocode operation error.
 */
export const getCheckoutOrderPromocodeError = (state: StoreState) =>
  getCheckoutOrderPromocodeFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the tags operation.
 *
 * @param state - Application state.
 *
 * @returns Tags operation Loading status.
 */
export const areCheckoutOrderTagsLoading = (state: StoreState) =>
  getCheckoutOrderTagsFromReducer(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the tags operation.
 *
 * @param state - Application state.
 *
 * @returns Tags operation error.
 */
export const getCheckoutOrderTagsError = (state: StoreState) =>
  getCheckoutOrderTagsFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the update checkout order items operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout order items update operation loading status.
 */
export const areCheckoutOrderItemsUpdating = (state: StoreState) =>
  getCheckoutOrderItemsFromReducer(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the update checkout order items operation.
 *
 * @param state - Application state.
 *
 * @returns Update checkout order items operation error.
 */
export const getCheckoutOrderItemsUpdateError = (state: StoreState) =>
  getCheckoutOrderItemsFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the charge checkout order operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation Loading status.
 */
export const isCheckoutOrderChargeLoading = (state: StoreState) =>
  getCheckoutOrderChargeFromReducer(state.checkout as CheckoutState).isLoading;

/**
 * Returns the charge checkout order error.
 *
 * @param state - Application state.
 *
 * @returns Charges operation error.
 */
export const getCheckoutOrderChargeError = (state: StoreState) =>
  getCheckoutOrderChargeFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the result for the charge checkout order operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation result.
 */
export const getCheckoutOrderChargeResult = (state: StoreState) =>
  getCheckoutOrderChargeFromReducer(state.checkout as CheckoutState).result;

/**
 * Returns the loading status for the delivery bundle upgrades operation.
 *
 * @param state - Application state.
 *
 * @returns Delivery bundle upgrades operation Loading status.
 */
export const areCheckoutOrderDeliveryBundleUpgradesLoading = (
  state: StoreState,
) =>
  getCheckoutOrderDeliveryBundleUpgrades(state.checkout as CheckoutState)
    .isLoading;

/**
 * Returns the delivery bundle upgrades error.
 *
 * @param state - Application state.
 *
 * @returns Delivery bundle upgrades operation error.
 */
export const getCheckoutOrderDeliveryBundleUpgradesError = (
  state: StoreState,
) =>
  getCheckoutOrderDeliveryBundleUpgrades(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the item delivery provisioning operation.
 *
 * @param state - Application state.
 *
 * @returns Item delivery provisioning operation Loading status.
 */
export const isCheckoutOrderDeliveryBundleProvisioningLoading = (
  state: StoreState,
) =>
  getCheckoutOrderDeliveryBundleProvisioning(state.checkout as CheckoutState)
    .isLoading;

/**
 * Returns the item delivery provisioning error.
 *
 * @param state - Application state.
 *
 * @returns Item delivery provisioning operation error.
 */
export const getCheckoutOrderDeliveryBundleProvisioningError = (
  state: StoreState,
) =>
  getCheckoutOrderDeliveryBundleProvisioning(state.checkout as CheckoutState)
    .error;

/**
 * Returns the loading status for the upgrade item delivery provisioning operation.
 *
 * @param state - Application state.
 *
 * @returns Upgrade item delivery provisioning operation Loading status.
 */
export const isCheckoutOrderDeliveryBundleUpgradeProvisioningLoading = (
  state: StoreState,
) =>
  getCheckoutOrderDeliveryBundleUpgradeProvisioning(
    state.checkout as CheckoutState,
  ).isLoading;

/**
 * Returns the upgrade item delivery provisioning error.
 *
 * @param state - Application state.
 *
 * @returns Upgrade item delivery provisioning operation error.
 */
export const getCheckoutOrderDeliveryBundleUpgradeProvisioningError = (
  state: StoreState,
) =>
  getCheckoutOrderDeliveryBundleUpgradeProvisioning(
    state.checkout as CheckoutState,
  ).error;

/**
 * Returns the ISO date for the item delivery options.
 *
 * @param timeLimitType        - Time limit type. Possible values: min, max.
 * @param itemsDeliveryOptions - Array with delivery options.
 *
 * @returns Items delivery options formatted date.
 */
const getItemsDeliveryOptionsDate = (
  timeLimitType: TimeLimitType | string,
  itemsDeliveryOptions: Array<ItemDeliveryOption>,
) => {
  if (!itemsDeliveryOptions || itemsDeliveryOptions.length < 1) {
    return '';
  }

  const firstBundle = itemsDeliveryOptions[0];
  if (!firstBundle?.deliveryWindow) {
    return '';
  }

  const { deliveryWindow } = firstBundle;
  const timeLimit = deliveryWindow[timeLimitType as keyof typeof TimeLimitType];
  const estimatedDate = itemsDeliveryOptions.reduce((acc, item) => {
    if (!item.deliveryWindow) {
      return acc;
    }
    const date =
      timeLimitType === 'min'
        ? Math.min(Date.parse(acc), Date.parse(item.deliveryWindow.min))
        : Math.max(Date.parse(acc), Date.parse(item.deliveryWindow.max));
    return new Date(date).toISOString();
  }, timeLimit);
  return estimatedDate || '';
};

/**
 * Returns the specified delivery bundle window.
 *
 * @param state            - Application state.
 * @param deliveryBundleId - Delivery bundle identifier.
 *
 * @returns Object with the minimum and maximum delivery days.
 */
export const getCheckoutDeliveryBundleWindow = (
  state: StoreState,
  deliveryBundleId: string,
): DeliveryBundleWindow | undefined => {
  const deliveryBundle = getCheckoutDeliveryBundle(state, deliveryBundleId);
  if (!deliveryBundle) return;

  const { itemsDeliveryOptions } = deliveryBundle;

  if (!itemsDeliveryOptions) return;

  return {
    minEstimatedDeliveryDate: getItemsDeliveryOptionsDate(
      'min',
      itemsDeliveryOptions,
    ),
    maxEstimatedDeliveryDate: getItemsDeliveryOptionsDate(
      'max',
      itemsDeliveryOptions,
    ),
  };
};

/**
 * Returns the loading status for the order operation fetch process.
 *
 * @param state - Application state.
 *
 * @returns Order operation fetch process loading status.
 */
export const isCheckoutOrderOperationLoading = (state: StoreState) =>
  getOperation(state.checkout as CheckoutState).isLoading;

/**
 * Returns the order operation error.
 *
 * @param state - Application state.
 *
 * @returns Order operation error.
 */
export const getCheckoutOrderOperationError = (state: StoreState) =>
  getOperation(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the order operations fetch process.
 *
 * @param state - Application state.
 *
 * @returns Order operation fetch process loading status.
 */
export const areCheckoutOrderOperationsLoading = (state: StoreState) =>
  getOperations(state.checkout as CheckoutState).isLoading;

/**
 * Returns the order operations error.
 *
 * @param state - Application state.
 *
 * @returns Order operation error.
 */
export const getCheckoutOrderOperationsError = (state: StoreState) =>
  getOperations(state.checkout as CheckoutState).error;

/**
 * Retrieves pagination information of order operations.
 *
 * @param state - Application state.
 *
 * @returns Pagination object.
 *
 * @example
 * // Object returned for the orders
 * \{
 *     number: 1, // Current page
 *     totalItems: 89, // Total of orders
 *     totalPages: 5 // Total of pages
 *     entries: ['ee8d4602-e0cf-11ec-85eb-74d29fa32cbf']
 * \};
 *
 */
export const getCheckoutOrderOperationsPagination = createSelector(
  [state => getOperations(state.checkout)],
  operations => {
    if (!operations || !operations.result) {
      return;
    }

    return operations.result;
  },
);

/**
 * Returns the loading status for the order item removing operation.
 *
 * @param state - Application state.
 *
 * @returns Order operation fetch process loading status.
 */
export const isRemoveOrderItemLoading = (state: StoreState) =>
  getRemoveOrderItem(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the order item removing operation.
 *
 * @param state - Application state.
 *
 * @returns Order operation error.
 */
export const getRemoveOrderItemError = (state: StoreState) =>
  getRemoveOrderItem(state.checkout as CheckoutState).error;

/**
 * Returns the loading status for the order item updating operation.
 *
 * @param state - Application state.
 *
 * @returns Order operation fetch process loading status.
 */
export const isUpdateOrderItemLoading = (state: StoreState) =>
  getUpdateOrderItem(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the order item updating operation.
 *
 * @param state - Application state.
 *
 * @returns Order operation error.
 */
export const getUpdateOrderItemError = (state: StoreState) =>
  getUpdateOrderItem(state.checkout as CheckoutState).error;
