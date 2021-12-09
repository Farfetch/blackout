/**
 * @module
 * @private
 */

import {
  getBrand as getBrandSelector,
  getCategory as getCategorySelector,
} from '../../../entities/redux/selectors';
import { logger } from '../../utils';
import get from 'lodash/get';

/**
 * Returns the different product categories separated with a `/`.
 *
 * @param {object} state - The current application state.
 * @param {object} product - The product object.
 *
 * @returns {string} String with all category names joined with a '/' character.
 */
export const getCategory = (state, product) =>
  get(product, 'categories', [])
    .map(id => get(getCategorySelector(state, id), 'name'))
    .join('/');

/**
 * Returns the product brand name.
 *
 * @param {object} state - The current application state.
 * @param {object} product - The product object.
 *
 * @returns {(string|undefined)} The brand name for the product.
 */
export const getBrand = (state, product) =>
  get(getBrandSelector(state, get(product, 'brand')), 'name');

/**
 * Returns the product variant (color).
 *
 * @param {object} product - The product object.
 *
 * @returns {(string|undefined)} The product variant.
 */
export const getVariant = product => {
  const mainVariant = get(product, 'colors', []).find(color =>
    get(color, 'tags', []).some(tag => tag === 'DesignerColor'),
  );

  return get(mainVariant, 'color.name');
};

/**
 * Returns the product size by the selected size id.
 *
 * @param {object} product - The product object.
 * @param {number} sizeId - The selected size ID.
 *
 * @returns {(string|undefined)} The size name.
 */
export const getSize = (product, sizeId) =>
  get(
    get(product, 'sizes', []).find(size => get(size, 'id') === sizeId),
    'name',
  );

/**
 * Returns the currency code passed to analytics via `useContext()`.
 *
 * @param {Analytics} analyticsInstance - Analytics instance.
 *
 * @returns {(string|undefined)} The currency from analytics's context.
 */
export const getCurrency = async analyticsInstance => {
  const currency = await analyticsInstance.context('currencyCode');

  if (!currency) {
    logger.error(
      'Track event failed. Make sure to set `currencyCode` via `analytics.useContext()`.',
    );
  }

  return currency;
};

/**
 * Calculates the price discount absolute value by subtracting the price
 * with discount value from the price without discount value.
 * Using the price.discount.rate or even the price.discount.includingTaxes
 * was considered but they introduce additional complexity as they might
 * not exist in the store or cause rounding errors in the case of the price.discount.rate
 * as it is a percentage.
 *
 * @param {number} priceWithDiscount - The price value with discount.
 * @param {number} priceWithoutDiscount - The price value without discount.
 *
 * @returns {number} The absolute discount value or 0 if either priceWithDiscount or priceWithoutDiscount are not numbers.
 */
export const calculatePriceDiscount = (
  priceWithDiscount,
  priceWithoutDiscount,
) => {
  return typeof priceWithDiscount === 'number' &&
    typeof priceWithoutDiscount === 'number'
    ? priceWithoutDiscount - priceWithDiscount
    : 0;
};
