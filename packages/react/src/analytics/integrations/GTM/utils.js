/**
 * @module utils
 * @private
 */

import get from 'lodash/get';
import isArray from 'lodash/isArray';
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
  if (isArray(categories)) {
    return categories;
  }

  if (isString(categories)) {
    return categories.split('/');
  }
};

/**
 * Picks the product parameters of interest.
 *
 * @param {object} product - Product event payload object.
 *
 * @returns {object} - The filtered product object.
 */
export const getProductData = product => ({
  id: product.id,
  name: product.name,
  category: getProductCategory(product.category),
  brand: product.brand,
  variant: product.variant,
  position: product.position,
  price: product.price,
  size: product.size,
  quantity: product.quantity,
  list: product.list,
});
