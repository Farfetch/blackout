import { getEntity } from './entity';
import { sortProductLabelsByPriority } from '../../../helpers';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

/**
 * Returns a specific product by its id.
 *
 * @function getProduct
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {object} Product normalized.
 */
export const getProduct = (state, productId) =>
  getEntity(state, 'products', productId);

/**
 * Checks if a specific product is "one size" by its id.
 *
 * @function isProductOneSize
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {boolean} If a certain product is one size or not.
 */
export const isProductOneSize = (state, productId) => {
  const sizes = get(getProduct(state, productId), 'sizes');

  return sizes && sizes.length > 0 ? sizes[0].isOneSize : false;
};

/**
 * Checks if a specific wishlist product is "out of stock" by its id.
 *
 * @function isProductOutOfStock
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {boolean} If a certain product is out of stock or not.
 */
export const isProductOutOfStock = (state, productId) => {
  const sizes = get(getProduct(state, productId), 'sizes');

  return (
    isEmpty(sizes) ||
    (isProductOneSize(state, productId) && sizes[0].isOutOfStock) ||
    !sizes.find(size => size.globalQuantity > 0)
  );
};

/**
 * Returns the list of promotions for a product given its id.
 *
 * @function getProductPromotions
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 *
 * @returns {Array} List of product promotions for the given ID.
 */
export const getProductPromotions = (state, productId) =>
  get(getProduct(state, productId), 'promotions') || [];

/**
 * Gets all labels of a given product, sorted by the given priority order.
 *
 * @see sortProductLabelsByPriority
 *
 * @function getProductLabelsByPriority
 * @memberof module:entities/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Numeric identifier of the product.
 * @param {string} [order='asc'] - Sorting order; can be 'asc' or 'desc'.
 *
 * @returns {Array} Labels sorted by the given order.
 */
export const getProductLabelsByPriority = (state, productId, order) => {
  const product = getProduct(state, productId);

  return sortProductLabelsByPriority(product, order);
};
