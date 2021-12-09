import { actionTypes as bagActionTypes, getBagItem } from '../../../bags/redux';
import {
  calculatePriceDiscount,
  getBrand,
  getCategory,
  getCurrency,
  getSize,
  getVariant,
} from './helpers';
import { eventTypes } from '../../';
import { getProduct } from '../../../entities/redux/selectors';
import { logger } from '../../utils';
import Analytics from '../..';
import get from 'lodash/get';

/**
 * Extends the default action types with the ones passed to the middleware.
 *
 * @private
 *
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-core/bags/redux.
 *
 * @returns {object} The final map for bag actions.
 */
const getActionTypes = customActionTypes => ({
  ADD_ITEM_TO_BAG_SUCCESS: bagActionTypes.ADD_ITEM_TO_BAG_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
  DELETE_BAG_ITEM_SUCCESS: bagActionTypes.DELETE_BAG_ITEM_SUCCESS,
  ...customActionTypes,
});

/**
 * Builds an object with all product data needed for tracking.
 *
 * @private
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} state - Application state.
 * @param {object} action - The action being executed.
 *
 * @returns {object} Product data for analytics.
 */
const getProductData = async (analyticsInstance, state, action) => {
  const productIdMeta = get(action, 'meta.productId');
  const sizeId = get(action, 'meta.size');
  const merchantId = get(action, 'meta.merchantId');
  const customAttributes = get(action, 'meta.customAttributes') || '';
  const sizeScaleId = get(action, 'meta.scale');

  let bagItemId;

  const bagItemsFromActionPayload =
    get(action, 'payload.entities.bagItems') || {};

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
    bagItemId = get(action, 'meta.bagItemId');
  }

  // Now we can safely retrieve the correct bag item data from the store.
  const bagItem = getBagItem(state, bagItemId);
  const id = productIdMeta || get(bagItem, 'product.id'); // If no productId property exists on the action meta, use the id on the bagItem if available
  const product = getProduct(state, id);
  const sku = get(product, 'sku');
  const category = getCategory(state, product);
  const name = get(product, 'shortDescription') || get(product, 'name');
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

  const oldQuantity = get(action, 'meta.oldQuantity');
  const quantity = get(action, 'meta.quantity') || bagItemQuantity;
  const size = get(bagItem, 'size.name') || getSize(product, sizeId); // size might be defined only on bagItem on a hard-refresh of the bag page
  const oldSize = get(action, 'meta.oldSize.name');
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
    oldQuantity,
    size,
    oldSize,
    sku,
    quantity,
    variant,
  };
};

/**
 * Builds an object with all bag events data needed for tracking.
 *
 * @private
 *
 * @param {object} action - The action being executed.
 *
 * @returns {object} Event data for analytics.
 */
const getBagData = action => {
  return {
    affiliation: get(action, 'meta.affiliation'),
    cartId: get(action, 'payload.result'),
    coupon: get(action, 'meta.coupon'),
    from: get(action, 'meta.from'),
    list: get(action, 'meta.list'),
    listId: get(action, 'meta.listId'),
    position: get(action, 'meta.position'),
    value: get(action, 'meta.value'),
  };
};

/**
 * Middleware for @farfetch/blackout-core/bags/redux actions, to call `analyticsInstance.track()` with the correct payload.
 *
 * @function bagMiddleware
 * @memberof module:analytics/middlewares
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-core/bags/redux.
 *
 * @returns {Function} Redux middleware.
 */
export default (analyticsInstance, customActionTypes) => {
  if (!analyticsInstance || !(analyticsInstance instanceof Analytics)) {
    logger.error(
      'Bag middleware did not receive the analytics instance. Please make sure a valid analytics instance is being passed via "bagMiddleware(analytics, customActionTypes)")',
    );
  }

  const actionTypes = getActionTypes(customActionTypes);

  return store => next => async action => {
    let state;
    let data;

    switch (action.type) {
      case actionTypes.ADD_ITEM_TO_BAG_SUCCESS: {
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
        // Let the action reach the reducers and update the state
        // because we need the state updated in order to calculate
        // discount values correctly.
        const result = await next(action);

        state = store.getState();

        data = {
          ...(await getProductData(analyticsInstance, state, action)),
          ...getBagData(action),
        };
        let eventType = null;

        // Track ga4 update event
        // Data is being cloned here because it will be mutated later
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

        data.quantity = Math.abs(data.quantity - data.oldQuantity);
        analyticsInstance.track(eventType, data);

        return result;
      }

      case actionTypes.DELETE_BAG_ITEM_SUCCESS: {
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
};
