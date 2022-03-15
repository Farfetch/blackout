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
  getOperation,
  getOperations,
  getOrderItem,
  getCharges as getPaidOrders,
  getPromoCode,
  getTags,
  getUpgradeItemDeliveryProvisioning,
} from './reducer';
import { getEntity } from '../../entities/redux/selectors';
import findKey from 'lodash/findKey';
import get from 'lodash/get';
/**
 * Returns the checkout id.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {number} Checkout id.
 */
export const getCheckoutId = state => getId(state.checkout);

/**
 * Returns the checkout.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout object.
 */
export const getCheckout = state => {
  const checkoutId = getCheckoutId(state);

  return getEntity(state, 'checkout', checkoutId);
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
export const getCharges = state => getPaidOrders(state.checkout);

/**
 * Returns the checkout order.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Checkout error.
 */
export const getCheckoutOrder = state => {
  const checkoutId = getCheckoutId(state);

  return getEntity(state, 'checkoutOrders', checkoutId);
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
export const getCheckoutDetail = state => {
  const checkoutId = getCheckoutId(state);

  return getEntity(state, 'checkoutDetails', checkoutId);
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
export const getCheckoutOrderItem = (state, checkoutOrderItemId) =>
  getEntity(state, 'checkoutOrderItems', checkoutOrderItemId);

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
export const getCheckoutOrderItemProduct = (state, checkoutOrderItemId) => {
  const productId = get(
    getCheckoutOrderItem(state, checkoutOrderItemId),
    'product',
  );

  return productId && getEntity(state, 'checkoutOrderItemProducts', productId);
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
  [state => getEntity(state, 'checkoutOrderItems'), getCheckoutOrderItemsIds],
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
 * @param {number} deliveryBundleId - Delivery bundle id.
 *
 * @returns {object} Delivery bundle.
 */
export const getCheckoutDeliveryBundle = (state, deliveryBundleId) =>
  getEntity(state, 'deliveryBundles', deliveryBundleId);

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
  [state => getEntity(state, 'deliveryBundles')],
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
  [getCheckoutDeliveryBundlesIds, state => getEntity(state, 'deliveryBundles')],
  (deliveryBundlesIds, deliveryBundles) =>
    deliveryBundlesIds?.map(id => deliveryBundles[id]),
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
export const getCheckoutDeliveryBundleUpgrades = (state, deliveryBundleId) =>
  getEntity(state, 'deliveryBundleUpgrades', deliveryBundleId);

/**
 * Returns a specific delivery bundle upgrade.
 *
 * @function
 * @param {object} state            - Application state.
 * @param _
 * @param {number} deliveryBundleId - Delivery bundle id.
 * @param {number} itemId           - Item id.
 * @param {string} upgradeType      - Upgrade type ('Estimated' or 'Nominated').
 * @param {string} upgradeId        - Upgrade id.
 * @returns {object} Delivery bundle upgrade.
 */
export const getCheckoutDeliveryBundleUpgrade = createSelector(
  [
    (state, deliveryBundleId) =>
      getCheckoutDeliveryBundleUpgrades(state, deliveryBundleId),
    (_, deliveryBundleId, itemId, upgradeType, upgradeId) => ({
      deliveryBundleId,
      itemId,
      upgradeType,
      upgradeId,
    }),
  ],
  (checkoutDeliveryBundleUpgrades, { itemId, upgradeId, upgradeType }) => {
    const itemUpgrades = get(checkoutDeliveryBundleUpgrades, itemId);

    return itemUpgrades[upgradeType].find(upgrade => upgrade.id === upgradeId);
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

    const selectedShippingService = shippingOptions.reduce(
      (service, option) => {
        if (get(option, 'merchants', []).includes(merchantLocationId)) {
          service.minEstimatedDeliveryHour =
            option.shippingService.minEstimatedDeliveryHour;
          service.maxEstimatedDeliveryHour =
            option.shippingService.maxEstimatedDeliveryHour;
        }

        return service;
      },
      { minEstimatedDeliveryHour: null, maxEstimatedDeliveryHour: null },
    );

    return {
      start: selectedShippingService.minEstimatedDeliveryHour,
      end: selectedShippingService.maxEstimatedDeliveryHour,
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
export const getCheckoutError = state => getError(state.checkout);

/**
 * Returns the loading status for the checkout.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Loading status.
 */
export const isCheckoutLoading = state => getIsLoading(state.checkout);

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
export const isCompletePaymentCheckoutLoading = state =>
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
export const getCompletePaymentCheckoutError = state =>
  getCompletePaymentCheckout(state.checkout).error;

/**
 * Returns the loading status for the checkout details operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Checkout details operation Loading status.
 */
export const isCheckoutDetailsLoading = state =>
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
export const getCheckoutDetailsError = state =>
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
export const isCollectPointsLoading = state =>
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
export const getCollectPointsError = state =>
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
export const isItemTagsLoading = state => getItemTags(state.checkout).isLoading;

/**
 * Returns the error for the items tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Items tags operation error.
 */
export const getItemTagsError = state => getItemTags(state.checkout).error;

/**
 * Returns the loading status for the promocode operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Promocode operation Loading status.
 */
export const isPromoCodeLoading = state =>
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
export const getPromoCodeError = state => getPromoCode(state.checkout).error;

/**
 * Returns the loading status for the tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Tags operation Loading status.
 */
export const isTagsLoading = state => getTags(state.checkout).isLoading;

/**
 * Returns the error for the tags operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Tags operation error.
 */
export const getTagsError = state => getTags(state.checkout).error;

/**
 * Returns the loading status for the gift message operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Gift message operation Loading status.
 */
export const isGiftMessageLoading = state =>
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
export const getGiftMessageError = state =>
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
export const isChargesLoading = state =>
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
export const getChargesError = state => getPaidOrders(state.checkout).error;

/**
 * Returns the result for the charges operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Charges operation result.
 */
export const getChargesResult = state => getPaidOrders(state.checkout).result;

/**
 * Returns the loading status for the delivery bundle upgrades operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Delivery bundle upgrades operation Loading status.
 */
export const isDeliveryBundleUpgradesLoading = state =>
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
export const getDeliveryBundleUpgradesError = state =>
  getDeliveryBundleUpgrades(state.checkout).error;

/**
 * Returns the loading status for the item delivery provisioning operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Item delivery provisioning operation Loading status.
 */
export const isItemDeliveryProvisioningLoading = state =>
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
export const getItemDeliveryProvisioningError = state =>
  getItemDeliveryProvisioning(state.checkout).error;

/**
 * Returns the loading status for the upgrade item delivery provisioning operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Upgrade item delivery provisioning operation Loading status.
 */
export const isUpgradeItemDeliveryProvisioningLoading = state =>
  getUpgradeItemDeliveryProvisioning(state.checkout).isLoading;

/**
 * Returns the upgrade item delivery provisioning error.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Upgrade item delivery provisioning operation error.
 */
export const getUpgradeItemDeliveryProvisioningError = state =>
  getUpgradeItemDeliveryProvisioning(state.checkout).error;

/**
 * Returns the loading status for the Operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Operations Loading status.
 */
export const isOperationsLoading = state =>
  getOperations(state.checkout).isLoading;

/**
 * Returns the error for the Operations.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Operations error.
 */
export const getOperationsError = state => getOperations(state.checkout).error;

/**
 * Returns the loading status for the Operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Operation Loading status.
 */
export const isOperationLoading = state =>
  getOperation(state.checkout).isLoading;

/**
 * Returns the error for the Operation.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Operation error.
 */
export const getOperationError = state => getOperation(state.checkout).error;

/**
 * Returns the loading status for the order item.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {boolean} Order Item Loading status.
 */
export const isOrderItemLoading = state =>
  getOrderItem(state.checkout).isLoading;

/**
 * Returns the error for the order item.
 *
 * @function
 *
 * @param {object} state - Application state.
 *
 * @returns {object} Order Item error.
 */
export const getOrderItemError = state => getOrderItem(state.checkout).error;

/**
 * Returns the ISO date for the item delivery options.
 *
 * @function
 *
 * @param {string} timeLimitType - Time limit type. Possible values: min, max.
 * @param {object[]} itemsDeliveryOptions - Array with delivery options.
 *
 * @returns {string} Items delivery options formatted date.
 */
const getItemsDeliveryOptionsDate = (timeLimitType, itemsDeliveryOptions) => {
  if (!itemsDeliveryOptions || itemsDeliveryOptions.length < 1) {
    return '';
  }

  const firstBundle = itemsDeliveryOptions[0];
  if (!firstBundle.deliveryWindow) {
    return '';
  }

  const estimatedDate = itemsDeliveryOptions.reduce((acc, item) => {
    if (!item.deliveryWindow) {
      return acc;
    }
    const date =
      timeLimitType === 'min'
        ? Math.min(Date.parse(acc), Date.parse(item.deliveryWindow.min))
        : Math.max(Date.parse(acc), Date.parse(item.deliveryWindow.max));
    return new Date(date).toISOString();
  }, firstBundle.deliveryWindow[timeLimitType]);
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
 * @returns {object} Object with the minimum and maximum delivery days.
 */
export const getBundleDeliveryWindow = (state, deliveryBundleId) => {
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
