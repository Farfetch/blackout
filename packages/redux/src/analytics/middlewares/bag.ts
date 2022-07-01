import { bagsActionTypes, getBagItem } from '../../bags';
import {
  calculatePriceDiscount,
  getBrand,
  getCategory,
  getCurrency,
  getSize,
  getVariant,
} from './helpers';
import { getProduct } from '../../entities/selectors';
import Analytics, { eventTypes, utils } from '@farfetch/blackout-analytics';
import get from 'lodash/get';
import isNil from 'lodash/isNil';
import type { AnyAction, Dispatch, Middleware } from 'redux';
import type {
  BagActionMiddlewareOptions,
  BagActionProcessedOptions,
  BagProductActionMetadata,
} from './types';
import type { BagItem } from '@farfetch/blackout-client';
import type { BagItemEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Extends the default action types with the ones passed to the middleware.
 *
 * @param customActionTypes - Action types to extend/replace the ones from
 *                            \@farfetch/blackout-redux/bags.
 *
 * @returns The final map for bag actions.
 */
const getActionTypes = (
  customActionTypes?: BagActionMiddlewareOptions,
): BagActionProcessedOptions => ({
  ADD_BAG_ITEM_SUCCESS: bagsActionTypes.ADD_BAG_ITEM_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS: bagsActionTypes.UPDATE_BAG_ITEM_SUCCESS,
  REMOVE_BAG_ITEM_SUCCESS: bagsActionTypes.REMOVE_BAG_ITEM_SUCCESS,
  ...customActionTypes,
});

/**
 * Gets bag item id that corresponds to the product specified in the action.
 *
 * @param action     - The action being executed.
 * @param searchMeta - Flag indicating if the search for the bag item id should look on the action.meta
 *                     property. This value will be false when there is an update action because the id
 *                     on the action.meta is not the id of the bag item after the update, as it will be
 *                     changed by the server.
 *
 * @returns The bag item id for the product if available or undefined.
 */
const getBagItemIdFromAction = (action: AnyAction, searchMeta = true) => {
  if (searchMeta) {
    const bagItemIdInMeta = get(action, 'meta.bagItemId');

    if (!isNil(bagItemIdInMeta)) {
      return bagItemIdInMeta;
    }
  }

  const bagItems = get(action, 'payload.entities.bagItems') as Record<
    BagItemEntity['id'],
    BagItemEntity
  >;
  const productIdMeta = get(action, 'meta.productId');
  const merchantIdMeta = get(action, 'meta.merchantId');
  const sizeIdMeta = get(action, 'meta.size');
  const sizeScaleMeta = get(action, 'meta.scale');

  if (!bagItems || !productIdMeta) {
    return;
  }

  return Object.values(bagItems).find(
    bagItem =>
      bagItem.product === productIdMeta &&
      // Do not consider merchant if it was not passed to the update bag item action
      bagItem.merchant ===
        (merchantIdMeta ? merchantIdMeta : bagItem.merchant) &&
      // Do not consider size id if it was not passed to the update bag item action
      bagItem.size.id === (sizeIdMeta ? sizeIdMeta : bagItem.size.id) &&
      // Do not consider scale id if it was not passed to the update bag item action
      bagItem.size.scale ===
        (sizeScaleMeta ? sizeScaleMeta : bagItem.size.scale),
  )?.id;
};

/**
 * Builds an object with all product data needed for tracking.
 *
 * @param analyticsInstance - Analytics instance.
 * @param state             - Application state.
 * @param action            - The action being executed.
 *
 * @returns Product data for analytics.
 */
const getProductData = async (
  analyticsInstance: Analytics,
  state: StoreState,
  action: AnyAction,
) => {
  const actionMetadata = get(action, 'meta', {}) as BagProductActionMetadata;
  const {
    productId: productIdMeta,
    size: sizeId,
    merchantId,
    scale: sizeScaleId,
    customAttributes = '',
  } = actionMetadata;

  let bagItemId: BagItem['id'] | undefined;

  const bagItemsFromActionPayload = get(
    action,
    'payload.entities.bagItems',
    {},
  ) as Record<BagItemEntity['id'], BagItemEntity>;

  // First we search for the bag item id on the action payload.
  // As the same product can be in different bag items, we need to do an exhaustive
  // search for a bag item that matches the most with the values used in the action.
  // This case will happen when an add item to bag success action or update to
  // bag item success action is dispatched, as the  bag item id will only be available
  // in the action payload.
  bagItemId = Object.values(bagItemsFromActionPayload).find(
    item =>
      item.product === productIdMeta &&
      item.merchant === merchantId &&
      item.size.id === sizeId &&
      item.size.scale === sizeScaleId &&
      (item.customAttributes || '') === customAttributes,
  )?.id;

  // If the bag item id is still not found, we use the one from the action.
  // This case will happen on a remove bag item success action as the deleted item will
  // not be returned from the server.
  if (!bagItemId) {
    bagItemId = actionMetadata.bagItemId;
  }

  // Now we can safely retrieve the correct bag item data from the store.
  const bagItem = getBagItem(state, bagItemId);
  const id = productIdMeta || get(bagItem, 'product.id'); // If no productId property exists on the action meta, use the id on the bagItem if available
  const product = getProduct(state, id);
  const { sku, shortDescription, name: productName } = product || {};
  const name = shortDescription || productName;
  const category = getCategory(state, product);
  const brand = getBrand(state, product);
  const variant = getVariant(product);
  const priceWithDiscount =
    get(bagItem, 'price.includingTaxes') || // price might be defined only on bagItem on a hard-refresh of the bag page
    get(product, 'price.includingTaxes');
  const priceWithoutDiscount =
    get(bagItem, 'price.includingTaxesWithoutDiscount', priceWithDiscount) ||
    get(product, 'price.includingTaxesWithoutDiscount', priceWithDiscount);

  // We need to fetch the exact quantity from the bag item
  // to calculate the exact value of the promotion discount
  // per unit, because 'promotionDetail.totalDiscountValue'
  // value is for the aggregate quantity. This quantity is
  // different than the ones available in meta.quantity and
  // meta.oldQuantity.
  const bagItemQuantity = get(bagItem, 'quantity', 1);

  const promotionTotalDiscountValue = get(
    bagItem,
    'promotionDetail.totalDiscountValue',
    0,
  );
  const promotionDiscountValuePerQuantity =
    promotionTotalDiscountValue / bagItemQuantity;

  // Bag items contain additional discount value besides the price
  // discount, so we need to add that value here.
  const discount =
    calculatePriceDiscount(priceWithDiscount, priceWithoutDiscount) +
    promotionDiscountValuePerQuantity;

  const quantity = actionMetadata.quantity || bagItemQuantity;
  const size = get(bagItem, 'size.name') || getSize(product, sizeId); // size might be defined only on bagItem on a hard-refresh of the bag page
  const currency = await getCurrency(analyticsInstance);

  return {
    brand,
    category,
    currency,
    discountValue: discount,
    id,
    name,
    price: priceWithDiscount,
    priceWithoutDiscount,
    size,
    sku,
    quantity,
    variant,
  };
};

/**
 * Builds an object with all bag events data needed for tracking.
 *
 * @param action - The action being executed.
 *
 * @returns Event data for analytics.
 */
const getBagData = (action: AnyAction) => ({
  affiliation: get(action, 'meta.affiliation') as string,
  cartId: get(action, 'payload.result.id') as string,
  coupon: get(action, 'meta.coupon') as string,
  from: get(action, 'meta.from') as string,
  list: get(action, 'meta.list') as string,
  listId: get(action, 'meta.listId') as string,
  position: get(action, 'meta.position') as number | undefined,
  value: get(action, 'meta.value') as number | undefined,
});

/**
 * Middleware for \@farfetch/blackout-redux/bags actions, to call
 * `analyticsInstance.track()` with the correct payload.
 *
 * @param analyticsInstance - Analytics instance.
 * @param customActionTypes - Action types to extend/replace the ones from
 *                            \@farfetch/blackout-redux/bags.
 *
 * @returns Redux middleware.
 */
export function analyticsBagMiddleware(
  analyticsInstance: Analytics,
  customActionTypes?: BagActionMiddlewareOptions,
): Middleware {
  if (!analyticsInstance || !(analyticsInstance instanceof Analytics)) {
    utils.logger.error(
      'Bag middleware did not receive the analytics instance. Please make sure a valid analytics instance is being passed via "bagMiddleware(analytics, customActionTypes)")',
    );
  }

  const actionTypes = getActionTypes(customActionTypes);

  return store => (next: Dispatch) => async (action: AnyAction) => {
    let state;
    let data;

    switch (action.type) {
      case actionTypes.ADD_BAG_ITEM_SUCCESS: {
        // Let the action reach the reducers and update the state
        // because we need the state updated in order to calculate
        // discount values correctly.
        const result = await next(action);

        state = store.getState();

        data = {
          ...(await getProductData(analyticsInstance, state, action)),
          ...getBagData(action),
        };

        analyticsInstance.track(eventTypes.PRODUCT_ADDED_TO_CART, data);
        return result;
      }

      case actionTypes.UPDATE_BAG_ITEM_SUCCESS: {
        // Get the previous bag item from the store

        const previousStoreState = store.getState();
        const previousBagItemId = getBagItemIdFromAction(action, true);

        const previousBagItem = getBagItem(
          previousStoreState,
          previousBagItemId,
        );

        // Let the action reach the reducers and update the state
        // because we need the state updated in order to calculate
        // discount values correctly.
        const result = await next(action);

        state = store.getState();

        data = {
          ...(await getProductData(analyticsInstance, state, action)),
          oldSize: previousBagItem?.size?.name,
          oldQuantity: previousBagItem?.quantity,
          ...getBagData(action),
        };
        let eventType = null;

        // Track ga4 update event - Track data is being cloned here because it will be mutated later
        analyticsInstance.track(eventTypes.PRODUCT_UPDATED, { ...data });

        if (data.oldSize && data.oldSize !== data.size) {
          const removedProductData = { ...data };
          removedProductData.size = data.oldSize;
          removedProductData.quantity = data.oldQuantity;

          analyticsInstance.track(
            eventTypes.PRODUCT_REMOVED_FROM_CART,
            removedProductData,
          );

          data.oldQuantity = 0;
        }

        // Check if the quantity difference is less than it was in bag - use PRODUCT_REMOVED_FROM_CART in that case
        if (data.oldQuantity && data.quantity < data.oldQuantity) {
          eventType = eventTypes.PRODUCT_REMOVED_FROM_CART;
        } else {
          eventType = eventTypes.PRODUCT_ADDED_TO_CART;
        }

        data.quantity = Math.abs(data.quantity - (data.oldQuantity || 0));
        analyticsInstance.track(eventType, { ...data, oldQuantity: undefined });

        return result;
      }

      case actionTypes.REMOVE_BAG_ITEM_SUCCESS: {
        // The delete bag item success case needs to access state
        // before the action reach the reducers because the bag item
        // will be removed from state after it happens.
        state = store.getState();

        data = {
          ...(await getProductData(analyticsInstance, state, action)),
          ...getBagData(action),
        };

        analyticsInstance.track(eventTypes.PRODUCT_REMOVED_FROM_CART, data);
        break;
      }

      default:
        break;
    }

    return next(action);
  };
}
