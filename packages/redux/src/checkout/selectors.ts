import { createSelector } from 'reselect';
import {
  getCheckoutDetails,
  getCollectPoints,
  getCompletePaymentCheckout,
  getDeliveryBundleUpgrades,
  getError,
  getGiftMessage,
  getId,
  getIsLoading,
  getItemDeliveryProvisioning,
  getItemTags,
  getOperation,
  getOperations,
  getCharges as getPaidOrders,
  getPromoCode,
  getTags,
  getUpgradeItemDeliveryProvisioning,
} from './reducer';
import { getEntities, getEntityById } from '../entities/selectors';
import findKey from 'lodash/findKey';
import get from 'lodash/get';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type {
  CheckoutDetailsEntity,
  CheckoutEntity,
  CheckoutOrderEntity,
  CheckoutOrderItemEntity,
  DeliveryBundlesEntity,
  DeliveryBundleUpgradesEntity,
} from '../entities/types';
import type {
  DeliveryWindowType,
  GetChargesResponse,
  ItemDeliveryOption,
} from '@farfetch/blackout-client/checkout/types';
import type { State } from './types';
import type { StoreState } from '../types';

type BundleDeliveryWindow = {
  minEstimatedDeliveryDate: string;
  maxEstimatedDeliveryDate: string;
};

enum TimeLimitType {
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
export const getCheckoutId = (state: StoreState): State['id'] =>
  getId(state.checkout);

/**
 * Returns the checkout.
 *
 * @param state - Application state.
 *
 * @returns Checkout object.
 */
export const getCheckout = (state: StoreState): CheckoutEntity | undefined => {
  const checkoutId = getCheckoutId(state);

  return checkoutId ? getEntityById(state, 'checkout', checkoutId) : undefined;
};

/**
 * Returns the charge.
 *
 * @param state - Application state.
 *
 * @returns Charge object.
 */
export const getCharges = (state: StoreState): State['charges'] =>
  getPaidOrders(state.checkout);

/**
 * Returns the checkout order.
 *
 * @param state - Application state.
 *
 * @returns Checkout error.
 */
export const getCheckoutOrder = (
  state: StoreState,
): CheckoutOrderEntity | undefined => {
  const checkoutId = getCheckoutId(state);

  return checkoutId
    ? getEntityById(state, 'checkoutOrders', checkoutId)
    : undefined;
};

/**
 * Returns the checkout detail.
 *
 * @param state - Application state.
 *
 * @returns Checkout error.
 */
export const getCheckoutDetail = (
  state: StoreState,
): CheckoutDetailsEntity | undefined => {
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
): CheckoutOrderItemEntity | undefined =>
  getEntityById(state, 'checkoutOrderItems', checkoutOrderItemId);

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
): CheckoutOrderItemEntity | undefined => {
  const checkoutOrderItem = getCheckoutOrderItem(state, checkoutOrderItemId);
  const productId = get(checkoutOrderItem, 'product');

  return (
    productId && getEntityById(state, 'checkoutOrderItemProducts', productId)
  );
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
    checkoutOrderItemsIds?.map(
      checkoutOrderItemId => checkoutOrderItems[checkoutOrderItemId],
    ),
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
): DeliveryBundlesEntity | undefined =>
  getEntityById(state, 'deliveryBundles', deliveryBundleId);

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
    deliveryBundlesIds?.map(id => deliveryBundles && deliveryBundles[id]),
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
): DeliveryBundleUpgradesEntity['deliveryBundleId'] | undefined =>
  getEntityById(state, 'deliveryBundleUpgrades', deliveryBundleId);

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
export const getCheckoutCollectPointEstimatedDeliveryPeriod = createSelector(
  [getCheckoutOrderSelectedCollectPoint, getCheckoutShippingOptions],
  (selectedCollectPoint, shippingOptions) => {
    const merchantLocationId = get(selectedCollectPoint, 'merchantLocationId');
    if (!merchantLocationId) return;

    const initialValue: INITIAL_VALUE = {
      minEstimatedDeliveryHour: null,
      maxEstimatedDeliveryHour: null,
    };

    const selectedShippingService = shippingOptions?.reduce(
      (service, shippingOption) => {
        const emptyArray: number[] = [];
        const merchants = get(shippingOption, 'merchants', emptyArray);
        if (merchants.includes(merchantLocationId)) {
          const { minEstimatedDeliveryHour, maxEstimatedDeliveryHour } =
            shippingOption?.shippingService;

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
export const getCheckoutError = (state: StoreState): State['error'] =>
  getError(state.checkout);

/**
 * Returns the loading status for the checkout.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isCheckoutLoading = (state: StoreState): boolean =>
  getIsLoading(state.checkout);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * Returns the loading status for the complete payment checkout operation.
 *
 * @param state - Application state.
 *
 * @returns Complete payment checkout operation Loading status.
 */
export const isCompletePaymentCheckoutLoading = (state: StoreState): boolean =>
  getCompletePaymentCheckout(state.checkout).isLoading;

/**
 * Returns the error for the complete payment checkout operation.
 *
 * @param state - Application state.
 *
 * @returns Complete payment checkout operation error.
 */
export const getCompletePaymentCheckoutError = (
  state: StoreState,
): BlackoutError | null => getCompletePaymentCheckout(state.checkout).error;

/**
 * Returns the loading status for the checkout details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout details operation Loading status.
 */
export const isCheckoutDetailsLoading = (state: StoreState): boolean =>
  getCheckoutDetails(state.checkout).isLoading;

/**
 * Returns the error for the checkout details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout details operation error.
 */
export const getCheckoutDetailsError = (
  state: StoreState,
): BlackoutError | null => getCheckoutDetails(state.checkout).error;

/**
 * Returns the loading status for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation Loading status.
 */
export const isCollectPointsLoading = (state: StoreState): boolean =>
  getCollectPoints(state.checkout).isLoading;

/**
 * Returns the error for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation error.
 */
export const getCollectPointsError = (
  state: StoreState,
): BlackoutError | null => getCollectPoints(state.checkout).error;

/**
 * Returns the loading status for the item tags operation.
 *
 * @param state - Application state.
 *
 * @returns Item tags operation Loading status.
 */
export const isItemTagsLoading = (state: StoreState): boolean =>
  getItemTags(state.checkout).isLoading;

/**
 * Returns the error for the items tags operation.
 *
 * @param state - Application state.
 *
 * @returns Items tags operation error.
 */
export const getItemTagsError = (state: StoreState): BlackoutError | null =>
  getItemTags(state.checkout).error;

/**
 * Returns the loading status for the promocode operation.
 *
 * @param state - Application state.
 *
 * @returns Promocode operation Loading status.
 */
export const isPromoCodeLoading = (state: StoreState): boolean =>
  getPromoCode(state.checkout).isLoading;

/**
 * Returns the error for the promocode operation.
 *
 * @param state - Application state.
 *
 * @returns Promocode operation error.
 */
export const getPromoCodeError = (state: StoreState): BlackoutError | null =>
  getPromoCode(state.checkout).error;

/**
 * Returns the loading status for the tags operation.
 *
 * @param state - Application state.
 *
 * @returns Tags operation Loading status.
 */
export const isTagsLoading = (state: StoreState): boolean =>
  getTags(state.checkout).isLoading;

/**
 * Returns the error for the tags operation.
 *
 * @param state - Application state.
 *
 * @returns Tags operation error.
 */
export const getTagsError = (state: StoreState): BlackoutError | null =>
  getTags(state.checkout).error;

/**
 * Returns the loading status for the gift message operation.
 *
 * @param state - Application state.
 *
 * @returns Gift message operation Loading status.
 */
export const isGiftMessageLoading = (state: StoreState): boolean =>
  getGiftMessage(state.checkout).isLoading;

/**
 * Returns the error for the gift message operation.
 *
 * @param state - Application state.
 *
 * @returns Gift message operation error.
 */
export const getGiftMessageError = (state: StoreState): BlackoutError | null =>
  getGiftMessage(state.checkout).error;

/**
 * Returns the loading status for the charges operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation Loading status.
 */
export const isChargesLoading = (state: StoreState): boolean =>
  getPaidOrders(state.checkout).isLoading;

/**
 * Returns the charges error.
 *
 * @param state - Application state.
 *
 * @returns Charges operation error.
 */
export const getChargesError = (state: StoreState): BlackoutError | null =>
  getPaidOrders(state.checkout).error;

/**
 * Returns the result for the charges operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation result.
 */
export const getChargesResult = (
  state: StoreState,
): string | GetChargesResponse | null => getPaidOrders(state.checkout).result;

/**
 * Returns the loading status for the delivery bundle upgrades operation.
 *
 * @param state - Application state.
 *
 * @returns Delivery bundle upgrades operation Loading status.
 */
export const isDeliveryBundleUpgradesLoading = (state: StoreState): boolean =>
  getDeliveryBundleUpgrades(state.checkout).isLoading;

/**
 * Returns the delivery bundle upgrades error.
 *
 * @param state - Application state.
 *
 * @returns Delivery bundle upgrades operation error.
 */
export const getDeliveryBundleUpgradesError = (
  state: StoreState,
): BlackoutError | null => getDeliveryBundleUpgrades(state.checkout).error;

/**
 * Returns the loading status for the item delivery provisioning operation.
 *
 * @param state - Application state.
 *
 * @returns Item delivery provisioning operation Loading status.
 */
export const isItemDeliveryProvisioningLoading = (state: StoreState): boolean =>
  getItemDeliveryProvisioning(state.checkout).isLoading;

/**
 * Returns the item delivery provisioning error.
 *
 * @param state - Application state.
 *
 * @returns Item delivery provisioning operation error.
 */
export const getItemDeliveryProvisioningError = (
  state: StoreState,
): BlackoutError | null => getItemDeliveryProvisioning(state.checkout).error;

/**
 * Returns the loading status for the upgrade item delivery provisioning operation.
 *
 * @param state - Application state.
 *
 * @returns Upgrade item delivery provisioning operation Loading status.
 */
export const isUpgradeItemDeliveryProvisioningLoading = (
  state: StoreState,
): boolean => getUpgradeItemDeliveryProvisioning(state.checkout).isLoading;

/**
 * Returns the upgrade item delivery provisioning error.
 *
 * @param state - Application state.
 *
 * @returns Upgrade item delivery provisioning operation error.
 */
export const getUpgradeItemDeliveryProvisioningError = (
  state: StoreState,
): BlackoutError | null =>
  getUpgradeItemDeliveryProvisioning(state.checkout).error;

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
export const getBundleDeliveryWindow = (
  state: StoreState,
  deliveryBundleId: string,
): BundleDeliveryWindow | undefined => {
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
export const isOperationLoading = (state: StoreState): boolean =>
  getOperation(state.checkout).isLoading;

/**
 * Returns the order operation error.
 *
 * @param state - Application state.
 *
 * @returns Order operation error.
 */
export const getOperationError = (state: StoreState): Error | null =>
  getOperation(state.checkout).error;

/**
 * Returns the loading status for the order operations fetch process.
 *
 * @param state - Application state.
 *
 * @returns Order operation fetch process loading status.
 */
export const isOperationsLoading = (state: StoreState): boolean =>
  getOperations(state.checkout).isLoading;

/**
 * Returns the order operations error.
 *
 * @function
 *
 * @param state - Application state.
 *
 * @returns Order operation error.
 */
export const getOperationsError = (state: StoreState): Error | null =>
  getOperations(state.checkout).error;

/**
 * Retrieves pagination information of order operations.
 *
 * @param state - Application state.
 *
 * @returns Pagination object.
 *
 * @example
 * // Object returned for the orders
 * {
 *     number: 1, // Current page
 *     totalItems: 89, // Total of orders
 *     totalPages: 5 // Total of pages
 *     entries: ['ee8d4602-e0cf-11ec-85eb-74d29fa32cbf']
 * };
 *
 */
export const getOperationsPagination = createSelector(
  [state => getOperations(state.checkout)],
  operations => {
    if (!operations || !operations.result) return;
    return operations.result;
  },
);
