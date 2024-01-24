/**
 * @module utils
 * @private
 */
import { isArray } from 'lodash';
import { MAX_PRODUCT_CATEGORIES } from '../GA4/constants';
import { utils } from '@farfetch/blackout-core/analytics';
import get from 'lodash/get';
import isString from 'lodash/isString';

/**
 * Picks the user parameters of interest.
 *
 * @param {object} data - Analytics event object.
 *
 * @returns {object} - Properties of the event.
 */
export const getEventProperties = data => get(data, 'properties', {});

/**
 * Picks the user parameters of interest.
 *
 * @param {object} user - Analytics user object.
 *
 * @returns {object} - The filtered user object.
 */
export const getUserParameters = user => ({
  id: get(user, 'id'),
  localId: get(user, 'localId'),
  email: get(user, 'traits.email'),
  name: get(user, 'traits.name'),
  isGuest: get(user, 'traits.isGuest'),
});

/**
 * Picks the event context parameters of interest.
 *
 * @param {object} context - Analytics event context object.
 *
 * @returns {object} - The filtered context object.
 */
export const getContextParameters = context => ({
  currencyCode: get(context, 'currencyCode'),
  eventContext: get(context, 'event'),
  libraryVersion: get(context, 'library.version'),
  location: get(context, 'web.window.location'),
  userAgent: get(context, 'web.window.navigator.userAgent'),
});

/**
 * Picks the product categories.
 *
 * @param {object} categories - Product categories.
 *
 * @returns {Array} - The product categories.
 */
export const getProductCategory = categories => {
  let productCategories = [];

  if (isArray(categories)) {
    productCategories = categories;
  } else if (isString(categories)) {
    productCategories = categories.split('/');
  }

  if (productCategories.length > MAX_PRODUCT_CATEGORIES) {
    productCategories = [
      productCategories[0],
      ...productCategories.slice(-MAX_PRODUCT_CATEGORIES + 1),
    ];

    utils.logger.warn(
      `[GTM] - Product category hierarchy exceeded maximum of ${MAX_PRODUCT_CATEGORIES}. GTM only allows up to ${MAX_PRODUCT_CATEGORIES} levels.`,
    );
  }

  return productCategories;
};

/**
 * Picks the product parameters of interest.
 *
 * @param {object} product - Product event payload object.
 *
 * @returns {object} - The filtered product object.
 */
export const getProductData = product => ({
  affiliation: product.affiliation,
  brand: product.brand,
  category: getProductCategory(product.category),
  coupon: product.coupon,
  currency: product.currency,
  discount: product.discountValue,
  id: product.productId ?? product.id,
  list: product.list,
  listId: product.listId,
  locationId: product.locationId,
  name: product.name,
  position: product.position,
  price: product.price,
  priceWithoutDiscount: product.priceWithoutDiscount,
  quantity: product.quantity,
  size: product.size,
  variant: product.variant,
});
