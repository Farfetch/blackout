import { createSelector } from 'reselect';
import { getEntityById } from './entity';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import orderBy from 'lodash/orderBy';
import type { ProductEntity } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns a specific product by its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns Product normalized.
 */
export const getProduct = (
  state: StoreState,
  productId: ProductEntity['id'],
): ProductEntity | undefined => getEntityById(state, 'products', productId);

/**
 * Checks if a specific product is "one size" by its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns If a certain product is one size or not.
 */
export const isProductOneSize = (
  state: StoreState,
  productId: ProductEntity['id'],
): boolean | undefined => {
  const sizes = get(getProduct(state, productId), 'sizes');

  return sizes && sizes.length > 0 ? sizes[0]?.isOneSize : false;
};

/**
 * Checks if a specific wishlist product is "out of stock" by its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns If a certain product is out of stock or not.
 */
export const isProductOutOfStock = (
  state: StoreState,
  productId: ProductEntity['id'],
): boolean | undefined => {
  const sizes = get(getProduct(state, productId), 'sizes');

  return (
    isEmpty(sizes) ||
    (isProductOneSize(state, productId) && sizes?.[0]?.isOutOfStock) ||
    !sizes?.find((size: { globalQuantity: number }) => size.globalQuantity > 0)
  );
};

/**
 * Returns the list of promotions for a product given its id.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 *
 * @returns List of product promotions for the given ID.
 */
export const getProductPromotions = createSelector(
  [
    (state: StoreState, productId: ProductEntity['id']) =>
      getProduct(state, productId),
  ],
  product => product?.promotions || [],
);

/**
 * Gets all labels of a given product, sorted by the given priority order.
 *
 * @param state     - Application state.
 * @param productId - Numeric identifier of the product.
 * @param sortOrder - Sorting order; can be 'asc' or 'desc'.
 *
 * @returns Labels sorted by the given order.
 */
export const getProductLabelsByPriority = createSelector(
  [
    (state: StoreState, productId: ProductEntity['id']) =>
      getProduct(state, productId),
    (
      state: StoreState,
      productId: ProductEntity['id'],
      sortOrder: 'asc' | 'desc' = 'asc',
    ) => sortOrder,
  ],
  (product, sortOrder) => {
    const labels = product?.labels;

    return orderBy(labels, 'priority', sortOrder);
  },
);
