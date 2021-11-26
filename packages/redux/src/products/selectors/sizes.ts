import { createSelector } from 'reselect';
import { getError, getIsLoading } from '../reducer/sizes';
import { getProduct } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Returns the loading product sizes condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product sizes are loading or not.
 */
export const areProductSizesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsLoading(state.products.sizes)[id];

/**
 * Returns the fetched status of a specific product sizes.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product sizes has been fetched or not.
 */
export const areProductSizesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  getIsLoading(state.products.sizes).hasOwnProperty(id) &&
  areProductSizesLoading(state, id) === false;

/**
 * Returns the error sizes condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The sizes error associated to a specific product.
 */
export const getProductSizesError = (
  state: StoreState,
  id: ProductEntity['id'],
): Error | undefined => getError(state.products.sizes)[id];

/**
 * Returns the sizes for a given product id.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The sizes for a given product id.
 */
export const getProductSizes = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductEntity['sizes'] => {
  const product = getProduct(state, id);

  return product?.sizes;
};

/**
 * Returns the sizes with stock for a given product id.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The sizes with stock for a given product id.
 */
export const getProductSizesWithStock = createSelector(
  (state: StoreState, id: ProductEntity['id']) => getProductSizes(state, id),
  sizes => sizes?.filter(size => !size.isOutOfStock),
);
