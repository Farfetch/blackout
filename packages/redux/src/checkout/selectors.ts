/**
 * @module checkout/selectors
 * @category Checkout
 * @subcategory Selectors
 */

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
  getCharges as getPaidOrders,
  getPromoCode,
  getTags,
  getUpgradeItemDeliveryProvisioning,
} from './reducer';
import { getEntities, getEntityById, getProduct } from '../entities/selectors';
import findKey from 'lodash/findKey';
import get from 'lodash/get';
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
import type { Error } from '@farfetch/blackout-client/types';
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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {number} Checkout id.
 */
export const getCheckoutId = (state: StoreState): State['id'] =>
  getId(state.checkout);

/**
 * Returns the checkout.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout object.
 */
export const getCheckout = (state: StoreState): CheckoutEntity | undefined => {
  const checkoutId = getCheckoutId(state);

  return checkoutId ? getEntityById(state, 'checkout', checkoutId) : undefined;
};

/**
 * Returns the charge.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Charge object.
 */
export const getCharges = (state: StoreState): State['charges'] =>
  getPaidOrders(state.checkout);

/**
 * Returns the checkout order.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout error.
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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout error.
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
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} checkoutOrderItemId - Checkout order item id.
 *
 * @returns {object} Checkout order item object.
 */
export const getCheckoutOrderItem = (
  state: StoreState,
  checkoutOrderItemId: number,
): CheckoutOrderItemEntity | undefined =>
  getEntityById(state, 'checkoutOrderItems', checkoutOrderItemId);

/**
 * Returns the product identified by the checkout order item id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {number} checkoutOrderItemId - Checkout order item id.
 *
 * @returns {object | undefined} Product object.
 */
export const getCheckoutOrderItemProduct = (
  state: StoreState,
  checkoutOrderItemId: number,
): CheckoutOrderItemEntity | undefined => {
  const checkoutOrderItem = getCheckoutOrderItem(state, checkoutOrderItemId);
  const productId = get(checkoutOrderItem, 'product');

  return productId && getProduct(state, productId);
};

/**
 * Returns all the checkout order items ids.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} List of checkout order items ids.
 */
export const getCheckoutOrderItemsIds = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.items,
);

/**
 * Returns all the checkout order items.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array} List of checkout order items.
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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} List of checkout collect points.
 */
export const getCheckoutOrderCollectPoints = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.collectpoints,
);

/**
 * Returns the selected collect point.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Selected collect point.
 */
export const getCheckoutOrderSelectedCollectPoint = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.clickAndCollect,
);

/**
 * Returns the checkout shipping options.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Checkout shipping options.
 */
export const getCheckoutShippingOptions = createSelector(
  [getCheckout],
  checkout => checkout?.shippingOptions,
);

/**
 * Returns a specific checkout delivery bundle identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} deliveryBundleId - Delivery bundle id.
 *
 * @returns {object} Delivery bundle.
 */
export const getCheckoutDeliveryBundle = (
  state: StoreState,
  deliveryBundleId: string,
): DeliveryBundlesEntity | undefined =>
  getEntityById(state, 'deliveryBundles', deliveryBundleId);

/**
 * Returns the selected checkout delivery bundle identified by its id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Selected delivery bundle id.
 */
export const getCheckoutSelectedDeliveryBundleId = createSelector(
  [(state: StoreState) => getEntities(state, 'deliveryBundles')],
  deliveryBundles => findKey(deliveryBundles, 'isSelected'),
);

/**
 * Returns the checkout delivery bundles.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {Array|undefined} Checkout delivery bundles ids.
 */
export const getCheckoutDeliveryBundlesIds = createSelector(
  [getCheckout],
  checkout => checkout?.deliveryBundles,
);

/**
 * Returns the checkout delivery bundles.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Checkout delivery bundles.
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
 * @function
 *
 * @param {object} state            - Application state.
 * @param {number} deliveryBundleId - Delivery bundle id.
 *
 * @returns {object} Delivery bundle upgrades.
 */
export const getCheckoutDeliveryBundleUpgrades = (
  state: StoreState,
  deliveryBundleId: string,
): DeliveryBundleUpgradesEntity['deliveryBundleId'] | undefined =>
  getEntityById(state, 'deliveryBundleUpgrades', deliveryBundleId);

/**
 * Returns a specific delivery bundle upgrade.
 *
 * @function
 * @param {object} state            - Application state.
 * @param {string} deliveryBundleId - Delivery bundle id.
 * @param {number} itemId           - Item id.
 * @param {DeliveryWindowType} upgradeType      - Upgrade type ('Estimated' or 'Nominated').
 * @param {string} upgradeId        - Upgrade id.
 * @returns {object} Delivery bundle upgrade.
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
 * Returns the checkout estimated delivery period for
 * the selected collect point.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object | undefined} Checkout estimated delivery period.
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
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout error.
 */
export const getCheckoutError = (state: StoreState): State['error'] =>
  getError(state.checkout);

/**
 * Returns the loading status for the checkout.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isCheckoutLoading = (state: StoreState): boolean =>
  getIsLoading(state.checkout);

/**
 * Returns the error or loading status of each sub-area.
 */

/**
 * Returns the loading status for the complete payment checkout operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Complete payment checkout operation Loading status.
 */
export const isCompletePaymentCheckoutLoading = (state: StoreState): boolean =>
  getCompletePaymentCheckout(state.checkout).isLoading;

/**
 * Returns the error for the complete payment checkout operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Complete payment checkout operation error.
 */
export const getCompletePaymentCheckoutError = (
  state: StoreState,
): Error | null => getCompletePaymentCheckout(state.checkout).error;

/**
 * Returns the loading status for the checkout details operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Checkout details operation Loading status.
 */
export const isCheckoutDetailsLoading = (state: StoreState): boolean =>
  getCheckoutDetails(state.checkout).isLoading;

/**
 * Returns the error for the checkout details operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout details operation error.
 */
export const getCheckoutDetailsError = (state: StoreState): Error | null =>
  getCheckoutDetails(state.checkout).error;

/**
 * Returns the loading status for the collect points operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Collect points operation Loading status.
 */
export const isCollectPointsLoading = (state: StoreState): boolean =>
  getCollectPoints(state.checkout).isLoading;

/**
 * Returns the error for the collect points operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Collect points operation error.
 */
export const getCollectPointsError = (state: StoreState): Error | null =>
  getCollectPoints(state.checkout).error;

/**
 * Returns the loading status for the item tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Item tags operation Loading status.
 */
export const isItemTagsLoading = (state: StoreState): boolean =>
  getItemTags(state.checkout).isLoading;

/**
 * Returns the error for the items tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Items tags operation error.
 */
export const getItemTagsError = (state: StoreState): Error | null =>
  getItemTags(state.checkout).error;

/**
 * Returns the loading status for the promocode operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Promocode operation Loading status.
 */
export const isPromoCodeLoading = (state: StoreState): boolean =>
  getPromoCode(state.checkout).isLoading;

/**
 * Returns the error for the promocode operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Promocode operation error.
 */
export const getPromoCodeError = (state: StoreState): Error | null =>
  getPromoCode(state.checkout).error;

/**
 * Returns the loading status for the tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Tags operation Loading status.
 */
export const isTagsLoading = (state: StoreState): boolean =>
  getTags(state.checkout).isLoading;

/**
 * Returns the error for the tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Tags operation error.
 */
export const getTagsError = (state: StoreState): Error | null =>
  getTags(state.checkout).error;

/**
 * Returns the loading status for the gift message operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Gift message operation Loading status.
 */
export const isGiftMessageLoading = (state: StoreState): boolean =>
  getGiftMessage(state.checkout).isLoading;

/**
 * Returns the error for the gift message operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Gift message operation error.
 */
export const getGiftMessageError = (state: StoreState): Error | null =>
  getGiftMessage(state.checkout).error;

/**
 * Returns the loading status for the charges operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Charges operation Loading status.
 */
export const isChargesLoading = (state: StoreState): boolean =>
  getPaidOrders(state.checkout).isLoading;

/**
 * Returns the charges error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Charges operation error.
 */
export const getChargesError = (state: StoreState): Error | null =>
  getPaidOrders(state.checkout).error;

/**
 * Returns the result for the charges operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Charges operation result.
 */
export const getChargesResult = (
  state: StoreState,
): string | GetChargesResponse | null => getPaidOrders(state.checkout).result;

/**
 * Returns the loading status for the delivery bundle upgrades operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Delivery bundle upgrades operation Loading status.
 */
export const isDeliveryBundleUpgradesLoading = (state: StoreState): boolean =>
  getDeliveryBundleUpgrades(state.checkout).isLoading;

/**
 * Returns the delivery bundle upgrades error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Delivery bundle upgrades operation error.
 */
export const getDeliveryBundleUpgradesError = (
  state: StoreState,
): Error | null => getDeliveryBundleUpgrades(state.checkout).error;

/**
 * Returns the loading status for the item delivery provisioning operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Item delivery provisioning operation Loading status.
 */
export const isItemDeliveryProvisioningLoading = (state: StoreState): boolean =>
  getItemDeliveryProvisioning(state.checkout).isLoading;

/**
 * Returns the item delivery provisioning error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Item delivery provisioning operation error.
 */
export const getItemDeliveryProvisioningError = (
  state: StoreState,
): Error | null => getItemDeliveryProvisioning(state.checkout).error;

/**
 * Returns the loading status for the upgrade item delivery provisioning operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Upgrade item delivery provisioning operation Loading status.
 */
export const isUpgradeItemDeliveryProvisioningLoading = (
  state: StoreState,
): boolean => getUpgradeItemDeliveryProvisioning(state.checkout).isLoading;

/**
 * Returns the upgrade item delivery provisioning error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Upgrade item delivery provisioning operation error.
 */
export const getUpgradeItemDeliveryProvisioningError = (
  state: StoreState,
): Error | null => getUpgradeItemDeliveryProvisioning(state.checkout).error;

/**
 * Returns the ISO date for the item delivery options.
 *
 * @function
 *
 * @param {TimeLimitType} timeLimitType - Time limit type. Possible values: min, max.
 * @param {Array} itemsDeliveryOptions - Array with delivery options.
 *
 * @returns {string} Items delivery options formatted date.
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
 * @function
 *
 * @param {object} state - Application state.
 * @param {string} deliveryBundleId - Delivery bundle identifier.
 *
 * @returns {object | undefined} Object with the minimum and maximum delivery days.
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
