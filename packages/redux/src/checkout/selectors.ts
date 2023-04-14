import { createSelector } from 'reselect';
import { findKey, get } from 'lodash-es';
import {
  getCheckoutOrderCharge as getCheckoutOrderChargeFromReducer,
  getCheckoutOrderDeliveryBundleProvisioning,
  getCheckoutOrderDeliveryBundleUpgradeProvisioning,
  getCheckoutOrderDeliveryBundleUpgrades as getCheckoutOrderDeliveryBundleUpgradesFromReducer,
  getCheckoutOrderDetails as getCheckoutOrderDetailsFromReducer,
  getCheckoutOrderItems as getCheckoutOrderItemsFromReducer,
  getCheckoutOrderItemTags as getCheckoutOrderItemTagsFromReducer,
  getCheckoutOrderPromocodes as getCheckoutOrderPromocodesFromReducer,
  getCheckoutOrderTags as getCheckoutOrderTagsFromReducer,
  getCollectPoints as getCollectPointsFromReducer,
  getError,
  getId,
  getIsLoading,
  getOperation,
  getOperations,
  getRemoveOrderItem,
  getUpdateOrderItem,
} from './reducer.js';
import { getEntities, getEntityById } from '../entities/selectors/index.js';
import buildCollectPointsQueryHash from './helpers/buildCollectPointsQueryHash.js';
import type {
  CategoryEntity,
  CheckoutOrderEntityDenormalized,
  CheckoutOrderItemEntity,
  CheckoutOrderItemEntityDenormalized,
  CheckoutOrderItemProductEntity,
  DeliveryBundleEntity,
  MerchantEntity,
  ProductEntity,
} from '../entities/index.js';
import type {
  CheckoutOrderItem,
  ClickAndCollect,
  DeliveryBundleUpgrade,
  DeliveryWindowType,
  GetCollectPointsQuery,
  ItemDeliveryOption,
  ShippingOption,
} from '@farfetch/blackout-client';
import type {
  CheckoutOrderOperationsNormalized,
  CheckoutState,
} from './types/index.js';
import type { StoreState } from '../types/index.js';

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
 * @returns Checkout order id.
 */
export const getCheckoutOrderId = (state: StoreState) =>
  getId(state.checkout as CheckoutState);

/**
 * Returns the checkout order result obtained by invoking the action
 * `fetchCheckoutOrder`.
 *
 * @param state - Application state.
 *
 * @returns Fetch checkout order result or undefined if no result is found.
 */
export const getCheckoutOrderResult = (state: StoreState) => {
  const checkoutId = getCheckoutOrderId(state);

  if (!checkoutId) {
    return undefined;
  }

  const checkoutEntity = getEntityById(state, 'checkout', checkoutId);

  if (!checkoutEntity) {
    return undefined;
  }

  return {
    ...checkoutEntity,
    checkoutOrder: checkoutEntity.checkoutOrder
      ? getCheckoutOrder(state)
      : undefined,
  };
};

const denormalizeOrderItem = (
  orderItemId: CheckoutOrderItem['id'],
  checkoutOrderItems:
    | Record<CheckoutOrderItemEntity['id'], CheckoutOrderItemEntity>
    | undefined,
  checkoutOrderItemProducts:
    | Record<
        CheckoutOrderItemProductEntity['id'],
        CheckoutOrderItemProductEntity
      >
    | undefined,
  products: Record<ProductEntity['id'], ProductEntity> | undefined,
  categories: Record<CategoryEntity['id'], CategoryEntity> | undefined,
  merchants: Record<MerchantEntity['id'], MerchantEntity> | undefined,
): CheckoutOrderItemEntityDenormalized | undefined => {
  const checkoutOrderItemEntity = checkoutOrderItems?.[orderItemId];

  if (!checkoutOrderItemEntity) {
    return undefined;
  }

  const productId = checkoutOrderItemEntity.product;
  const checkoutOrderItemProductEntity = checkoutOrderItemProducts?.[productId];
  const productEntity = products?.[productId];
  const merchantEntity = merchants?.[checkoutOrderItemEntity.merchant];

  return {
    ...checkoutOrderItemEntity,
    merchant: merchantEntity,
    product: checkoutOrderItemProductEntity
      ? {
          ...checkoutOrderItemProductEntity,
          categories: checkoutOrderItemProductEntity.categories
            .map(categoryId => categories?.[categoryId])
            .filter(Boolean) as CategoryEntity[] | undefined,
          merchant: merchants?.[checkoutOrderItemProductEntity.merchant],
          labels: productEntity?.labels || [],
        }
      : undefined,
  };
};

const denormalizeOrderItems = (
  itemsIds: Array<CheckoutOrderItem['id']> | undefined,
  checkoutOrderItems:
    | Record<CheckoutOrderItemEntity['id'], CheckoutOrderItemEntity>
    | undefined,
  checkoutOrderItemProducts:
    | Record<
        CheckoutOrderItemProductEntity['id'],
        CheckoutOrderItemProductEntity
      >
    | undefined,
  products: Record<ProductEntity['id'], ProductEntity> | undefined,
  categories: Record<CategoryEntity['id'], CategoryEntity> | undefined,
  merchants: Record<MerchantEntity['id'], MerchantEntity> | undefined,
) => {
  return itemsIds
    ?.map((orderItemId: number) =>
      denormalizeOrderItem(
        orderItemId,
        checkoutOrderItems,
        checkoutOrderItemProducts,
        products,
        categories,
        merchants,
      ),
    )
    .filter(Boolean) as CheckoutOrderItemEntityDenormalized[] | undefined;
};

/**
 * Returns the checkout order.
 *
 * @param state - Application state.
 *
 * @returns Checkout order entity or undefined.
 */
export const getCheckoutOrder: (
  state: StoreState,
) => CheckoutOrderEntityDenormalized | undefined = createSelector(
  [
    (state: StoreState) => getEntities(state, 'checkoutOrderItems'),
    (state: StoreState) => getEntities(state, 'checkoutOrders'),
    (state: StoreState) => getEntities(state, 'checkoutOrderItemProducts'),
    (state: StoreState) => getEntities(state, 'products'),
    (state: StoreState) => getEntities(state, 'categories'),
    (state: StoreState) => getEntities(state, 'merchants'),
    (state: StoreState) => getEntities(state, 'checkout'),
    getCheckoutOrderId,
  ],
  (
    checkoutOrderItems,
    checkoutOrders,
    checkoutOrderItemProducts,
    products,
    categories,
    merchants,
    checkout,
    checkoutOrderId,
  ) => {
    if (!checkoutOrderId) {
      return undefined;
    }

    const checkoutOrderEntity = checkoutOrders?.[checkoutOrderId];

    if (!checkoutOrderEntity) {
      return undefined;
    }

    const shippingOptions = checkout?.[checkoutOrderId]?.shippingOptions;

    const newCheckoutOrderMerchants =
      checkoutOrderEntity.checkoutOrderMerchants.map(orderMerchant => {
        const orderMerchantShippingOptionId =
          orderMerchant.shipping?.shippingService?.id;

        const shippingOption = shippingOptions?.find(
          shippingOption =>
            shippingOption.shippingService.id === orderMerchantShippingOptionId,
        );

        return {
          ...orderMerchant,
          shipping: shippingOption ?? orderMerchant.shipping,
        };
      });

    return {
      ...checkoutOrderEntity,
      checkoutOrderMerchants: newCheckoutOrderMerchants,
      items: denormalizeOrderItems(
        checkoutOrderEntity.items,
        checkoutOrderItems,
        checkoutOrderItemProducts,
        products,
        categories,
        merchants,
      ),
    };
  },
);

/**
 * Returns the checkout order details.
 *
 * @param state - Application state.
 *
 * @returns Checkout order details or undefined.
 */
export const getCheckoutOrderDetails = (state: StoreState) => {
  const checkoutOrderId = getCheckoutOrderId(state);

  if (!checkoutOrderId) {
    return undefined;
  }

  const checkoutDetailsEntity = getEntityById(
    state,
    'checkoutDetails',
    checkoutOrderId,
  );

  if (!checkoutDetailsEntity) {
    return undefined;
  }

  return { ...checkoutDetailsEntity, checkoutOrder: getCheckoutOrder(state) };
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
 * Returns all the checkout collect points.
 *
 * @param state - Application state.
 *
 * @returns List of checkout collect points.
 */
export const getCollectPoints = (
  state: StoreState,
  query?: GetCollectPointsQuery,
) => {
  const hash = buildCollectPointsQueryHash(query);

  return getCollectPointsFromReducer(state.checkout as CheckoutState)[hash]
    ?.result;
};

/**
 * Returns the selected collect point.
 *
 * @param state - Application state.
 *
 * @returns Selected collect point.
 */
export const getCheckoutOrderSelectedCollectPoint: (
  state: StoreState,
) => ClickAndCollect | undefined = createSelector(
  [getCheckoutOrder],
  checkoutOrder => checkoutOrder?.clickAndCollect,
);

/**
 * Returns the checkout order shipping options.
 *
 * @param state - Application state.
 *
 * @returns Checkout shipping options.
 */
export const getCheckoutOrderShippingOptions: (
  state: StoreState,
) => ShippingOption[] | undefined = createSelector(
  [getCheckoutOrderResult],
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
export const getCheckoutOrderDeliveryBundle = (
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
export const getCheckoutOrderSelectedDeliveryBundleId: (
  state: StoreState,
) => string | undefined = createSelector(
  [(state: StoreState) => getEntities(state, 'deliveryBundles')],
  deliveryBundles => findKey(deliveryBundles, 'isSelected'),
);

/**
 * Returns the checkout order delivery bundles.
 *
 * @param state - Application state.
 *
 * @returns Checkout delivery bundles ids.
 */
export const getCheckoutOrderDeliveryBundlesIds: (
  state: StoreState,
) => Array<DeliveryBundleEntity['id']> | undefined = createSelector(
  [getCheckoutOrderResult],
  checkout => checkout?.deliveryBundles,
);

/**
 * Returns the checkout delivery bundles.
 *
 * @param state - Application state.
 *
 * @returns Checkout delivery bundles.
 */
export const getCheckoutOrderDeliveryBundles: (
  state: StoreState,
) => DeliveryBundleEntity[] | undefined = createSelector(
  [
    getCheckoutOrderDeliveryBundlesIds,
    (state: StoreState) => getEntities(state, 'deliveryBundles'),
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
export const getCheckoutOrderDeliveryBundleUpgrades = (
  state: StoreState,
  deliveryBundleId: DeliveryBundleUpgrade['id'],
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
export const getCheckoutOrderDeliveryBundleUpgrade: (
  state: StoreState,
  deliveryBundleId: DeliveryBundleEntity['id'],
  itemId: DeliveryBundleUpgrade['itemId'],
  deliveryWindowType: DeliveryWindowType | string,
  upgradeId: DeliveryBundleUpgrade['id'],
) => DeliveryBundleUpgrade | undefined = createSelector(
  [
    (state: StoreState, deliveryBundleId: string) =>
      getCheckoutOrderDeliveryBundleUpgrades(state, deliveryBundleId),
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
export const getCheckoutOrderSelectedCollectPointEstimatedDeliveryPeriod: (
  state: StoreState,
) =>
  | {
      start: number | null | undefined;
      end: number | null | undefined;
    }
  | undefined = createSelector(
  [getCheckoutOrderSelectedCollectPoint, getCheckoutOrderShippingOptions],
  (selectedCollectPoint, shippingOptions) => {
    const merchantLocationId = get(selectedCollectPoint, 'merchantLocationId');

    if (!merchantLocationId) {
      return;
    }

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
 * Returns the error for the checkout order.
 *
 * @param state - Application state.
 *
 * @returns Checkout error.
 */
export const getCheckoutOrderError = (state: StoreState) =>
  getError(state.checkout as CheckoutState);

/**
 * Returns the loading status for the checkout order.
 *
 * @param state - Application state.
 *
 * @returns Loading status.
 */
export const isCheckoutOrderLoading = (state: StoreState) =>
  getIsLoading(state.checkout as CheckoutState);

/**
 * Returns the fetched status for the checkout order.
 *
 * @param state - Application state.
 *
 * @returns - If checkout is fetched or not.
 */
export const isCheckoutOrderFetched = (state: StoreState) =>
  (!!getCheckoutOrderResult(state) || !!getCheckoutOrderError(state)) &&
  !isCheckoutOrderLoading(state);

/**
 * Returns the loading status for the checkout order details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout details operation Loading status.
 */
export const areCheckoutOrderDetailsLoading = (state: StoreState) =>
  getCheckoutOrderDetailsFromReducer(state.checkout as CheckoutState).isLoading;

/**
 * Returns the error for the checkout order details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout details operation error.
 */
export const getCheckoutOrderDetailsError = (state: StoreState) =>
  getCheckoutOrderDetailsFromReducer(state.checkout as CheckoutState).error;

/**
 * Returns the fetched status for the checkout order details operation.
 *
 * @param state - Application state.
 *
 * @returns Checkout order details operation fetched status.
 */
export const areCheckoutOrderDetailsFetched = (state: StoreState) =>
  (!!getCheckoutOrderDetails(state) || !!getCheckoutOrderDetailsError(state)) &&
  !areCheckoutOrderDetailsLoading(state);

/**
 * Returns the loading status for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation Loading status.
 */
export const areCollectPointsLoading = (
  state: StoreState,
  query?: GetCollectPointsQuery,
) => {
  const hash = buildCollectPointsQueryHash(query);

  return !!getCollectPointsFromReducer(state.checkout as CheckoutState)[hash]
    ?.isLoading;
};

/**
 * Returns the error for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation error.
 */
export const getCollectPointsError = (
  state: StoreState,
  query?: GetCollectPointsQuery,
) => {
  const hash = buildCollectPointsQueryHash(query);

  return getCollectPointsFromReducer(state.checkout as CheckoutState)[hash]
    ?.error;
};

/**
 * Returns the fetched status for the collect points operation.
 *
 * @param state - Application state.
 *
 * @returns Collect points operation fetched status.
 */
export const areCollectPointsFetched = (
  state: StoreState,
  query?: GetCollectPointsQuery,
) =>
  (!!getCollectPoints(state, query) || !!getCollectPointsError(state, query)) &&
  !areCollectPointsLoading(state, query);

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
 * Returns the loading status for the checkout order promocodes operation.
 *
 * @param state - Application state.
 *
 * @returns Promocode operation Loading status.
 */
export const areCheckoutOrderPromocodesLoading = (state: StoreState) =>
  getCheckoutOrderPromocodesFromReducer(state.checkout as CheckoutState)
    .isLoading;

/**
 * Returns the error for the checkout order promocodes operation.
 *
 * @param state - Application state.
 *
 * @returns Promocode operation error.
 */
export const getCheckoutOrderPromocodesError = (state: StoreState) =>
  getCheckoutOrderPromocodesFromReducer(state.checkout as CheckoutState).error;

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
 * Returns the fetched status for the charge checkout order operation.
 *
 * @param state - Application state.
 *
 * @returns Charges operation Loading status.
 */
export const isCheckoutOrderChargeFetched = (state: StoreState) =>
  (!!getCheckoutOrderChargeResult(state) ||
    !!getCheckoutOrderChargeError(state)) &&
  !isCheckoutOrderChargeLoading(state);

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
  getCheckoutOrderDeliveryBundleUpgradesFromReducer(
    state.checkout as CheckoutState,
  ).isLoading;

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
  getCheckoutOrderDeliveryBundleUpgradesFromReducer(
    state.checkout as CheckoutState,
  ).error;

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
export const getCheckoutOrderDeliveryBundleWindow = (
  state: StoreState,
  deliveryBundleId: string,
): DeliveryBundleWindow | undefined => {
  const deliveryBundle = getCheckoutOrderDeliveryBundle(
    state,
    deliveryBundleId,
  );

  if (!deliveryBundle) {
    return;
  }

  const { itemsDeliveryOptions } = deliveryBundle;

  if (!itemsDeliveryOptions) {
    return;
  }

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
export const getCheckoutOrderOperationsPagination: (
  state: StoreState,
) => CheckoutOrderOperationsNormalized | undefined = createSelector(
  [(state: StoreState) => getOperations(state.checkout as CheckoutState)],
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
