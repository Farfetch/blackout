import { eventTypes } from '../../';
import { getBrand, getCategory, getCurrency, getVariant } from './helpers';
import { getProduct } from '../../../entities/redux/selectors';
import { logger } from '../../utils';
import { actionTypes as wishlistActionTypes } from '../../../wishlists/redux';
import Analytics from '../..';
import get from 'lodash/get';

/**
 * Extends the default action types with the ones passed to the middleware.
 *
 * @private
 *
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-core/wishlists/redux.
 *
 * @returns {object} The final map for bag actions.
 */
const getActionTypes = customActionTypes => ({
  ADD_ITEM_TO_WISHLIST_SUCCESS:
    wishlistActionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS,
  DELETE_WISHLIST_ITEM_SUCCESS:
    wishlistActionTypes.DELETE_WISHLIST_ITEM_SUCCESS,
  UPDATE_WISHLIST_ITEM_SUCCESS:
    wishlistActionTypes.UPDATE_WISHLIST_ITEM_SUCCESS,
  ...customActionTypes,
});

/**
 * Builds an object with all wishlist events data needed for tracking.
 *
 * @private
 *
 * @param {object} action - The action being executed.
 *
 * @returns {object} Event data for analytics.
 */
const getWishlistData = action => {
  return {
    affiliation: get(action, 'meta.affiliation'),
    coupon: get(action, 'meta.coupon'),
    from: get(action, 'meta.from'),
    position: get(action, 'meta.position'),
    value: get(action, 'meta.value'),
  };
};

/**
 * Builds an object with all product data needed for tracking.
 *
 * @private
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} state - Application state.
 * @param {object} product - The wishlist item product.
 *
 * @returns {object} Product data for analytics.
 */
const getProductData = async (analyticsInstance, state, product) => {
  const price = get(product, 'price.includingTaxes');
  const priceWithoutDiscount = get(
    product,
    'price.includingTaxesWithoutDiscount',
    price,
  );

  return {
    id: product.id,
    name: product.name,
    brand: getBrand(state, product),
    category: getCategory(state, product),
    discount:
      typeof price === 'number' && typeof priceWithoutDiscount === 'number'
        ? priceWithoutDiscount - price
        : 0,
    price: priceWithoutDiscount,
    variant: getVariant(product),
    currency: await getCurrency(analyticsInstance),
  };
};

/**
 * Middleware for @farfetch/blackout-core/wishlists/redux actions, to call `analyticsInstance.track()` with the correct payload.
 *
 * @function wishlistMiddleware
 * @memberof module:analytics/middlewares
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 * @param {object} customActionTypes - Action types to extend/replace the ones from @farfetch/blackout-core/wishlists/redux.
 *
 * @returns {Function} Redux middleware.
 */
export default (analyticsInstance, customActionTypes) => {
  if (!analyticsInstance || !(analyticsInstance instanceof Analytics)) {
    logger.error(
      'Wishlist middleware did not receive the analytics instance. Please make sure a valid analytics instance is being passed via "wishlistMiddleware(analytics, customActionTypes)")',
    );
  }

  const actionTypes = getActionTypes(customActionTypes);

  return store => next => async action => {
    let state;
    let productId;
    let wishlistProduct;
    let data;

    switch (action.type) {
      case actionTypes.ADD_ITEM_TO_WISHLIST_SUCCESS: {
        next(action);

        state = store.getState();
        productId = get(action, 'meta.productId');
        wishlistProduct = getProduct(state, productId) || {};

        analyticsInstance.track(eventTypes.PRODUCT_ADDED_TO_WISHLIST, {
          ...(await getProductData(analyticsInstance, state, wishlistProduct)),
          ...getWishlistData(action),
        });
        break;
      }

      case actionTypes.DELETE_WISHLIST_ITEM_SUCCESS: {
        next(action);

        state = store.getState();
        productId = get(action, 'meta.productId');
        wishlistProduct = getProduct(state, productId) || {};
        data = await getProductData(analyticsInstance, state, wishlistProduct);

        analyticsInstance.track(eventTypes.PRODUCT_REMOVED_FROM_WISHLIST, data);
        break;
      }

      case actionTypes.UPDATE_WISHLIST_ITEM_SUCCESS: {
        next(action);

        state = store.getState();
        productId = get(action, 'meta.productId');
        wishlistProduct = getProduct(state, productId) || {};
        data = await getProductData(analyticsInstance, state, wishlistProduct);

        analyticsInstance.track(eventTypes.PRODUCT_UPDATED_WISHLIST, data);
        break;
      }

      default:
        return next(action);
    }
  };
};
