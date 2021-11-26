import { actionTypes as bagActionTypes, getBagItem } from '../../bags';
import {
  getBrand,
  getCategory,
  getCurrency,
  getSize,
  getVariant,
} from './helpers';
import { getProduct } from '../../entities/selectors';
import { logger } from '@farfetch/blackout-analytics/utils';
import Analytics, { eventTypes } from '@farfetch/blackout-analytics';
import get from 'lodash/get';

/**
 * Extends the default action types with the ones passed to the middleware.
 *
 * @private
 *
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-redux/bags.
 *
 * @returns {object} The final map for bag actions.
 */
const getActionTypes = customActionTypes => ({
  ADD_BAG_ITEM_SUCCESS: bagActionTypes.ADD_BAG_ITEM_SUCCESS,
  UPDATE_BAG_ITEM_SUCCESS: bagActionTypes.UPDATE_BAG_ITEM_SUCCESS,
  REMOVE_BAG_ITEM_SUCCESS: bagActionTypes.REMOVE_BAG_ITEM_SUCCESS,
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
  const bagItemId = get(action, 'meta.bagItemId');
  const bagItem = bagItemId && getBagItem(state, bagItemId);
  const id = get(action, 'meta.productId') || get(bagItem, 'product.id'); // If no productId property exists on the action meta, use the id on the bagItem if available
  const product = getProduct(state, id);
  const sku = get(product, 'sku');
  const category = getCategory(state, product);
  const name = get(product, 'shortDescription') || get(product, 'name');
  const brand = getBrand(state, product);
  const variant = getVariant(product);
  const price =
    get(product, 'price.includingTaxes') ||
    get(bagItem, 'price.includingTaxes'); // price might be defined only on bagItem on a hard-refresh of the bag page
  const priceWithoutDiscount =
    get(product, 'price.includingTaxesWithoutDiscount', price) ||
    get(bagItem, 'price.includingTaxesWithoutDiscount', price);
  const discount =
    typeof price === 'number' && typeof priceWithoutDiscount === 'number'
      ? priceWithoutDiscount - price
      : 0;
  const oldQuantity = get(action, 'meta.oldQuantity');
  const quantity = get(action, 'meta.quantity');
  const sizeId = get(action, 'meta.size');
  const size = getSize(product, sizeId) || get(bagItem, 'size.name'); // size might be defined only on bagItem on a hard-refresh of the bag page
  const oldSize = get(action, 'meta.oldSize.name');
  const currency = await getCurrency(analyticsInstance);

  return {
    brand,
    category,
    currency,
    discount,
    id,
    name,
    price: priceWithoutDiscount,
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
 * @param {object} state - Application state.
 * @param {object} action - The action being executed.
 *
 * @returns {object} Event data for analytics.
 */
const getBagData = action => {
  return {
    cartId: get(action, 'payload.result.id'),
    affiliation: get(action, 'meta.affiliation'),
    coupon: get(action, 'meta.coupon'),
    value: get(action, 'meta.value'),
    from: get(action, 'meta.from'),
    position: get(action, 'meta.position'),
  };
};

/**
 * Middleware for @farfetch/blackout-client/bags/redux actions, to call `analyticsInstance.track()` with the correct payload.
 *
 * @function bagMiddleware
 * @memberof module:analytics/middlewares
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-redux/bags.
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
      case actionTypes.ADD_BAG_ITEM_SUCCESS: {
        state = store.getState();

        data = {
          ...(await getProductData(analyticsInstance, state, action)),
          ...getBagData(action),
        };

        analyticsInstance.track(eventTypes.PRODUCT_ADDED_TO_CART, data);
        break;
      }

      case actionTypes.UPDATE_BAG_ITEM_SUCCESS: {
        state = store.getState();

        data = {
          ...(await getProductData(analyticsInstance, state, action)),
          ...getBagData(action),
        };
        let eventType = null;

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
        break;
      }

      case actionTypes.REMOVE_BAG_ITEM_SUCCESS: {
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
