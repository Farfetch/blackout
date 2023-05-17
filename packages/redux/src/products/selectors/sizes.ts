import { createSelector } from 'reselect';
import { getError, getIsLoading } from '../reducer/sizes.js';
import { getProduct } from './product.js';
import type { ProductEntity } from '../../entities/types/index.js';
import type { ProductsState } from '../types/index.js';
import type { SizeAdapted, StoreState } from '../../types/index.js';

/**
 * Returns the loading product sizes condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product sizes are loading or not.
 */
export const areProductSizesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) => getIsLoading((state.products as ProductsState).sizes)[id];

/**
 * Returns the fetched status of a specific product sizes.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product sizes has been fetched or not.
 */
export const areProductSizesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getIsLoading((state.products as ProductsState).sizes).hasOwnProperty(id) &&
  areProductSizesLoading(state, id) === false;

/**
 * Returns the error sizes condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The sizes error associated to a specific product.
 */
export const getProductSizesError = (
  state: StoreState,
  id: ProductEntity['id'],
) => getError((state.products as ProductsState).sizes)[id];

/**
 * Returns the sizes for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The sizes for a given product id.
 */
export const getProductSizes = (state: StoreState, id: ProductEntity['id']) => {
  const product = getProduct(state, id);

  return product?.sizes;
};

/**
 * Returns the sizes with stock for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The sizes with stock for a given product id.
 */
export const getProductSizesWithStock: (
  state: StoreState,
  productId: ProductEntity['id'],
) => SizeAdapted[] | undefined = createSelector(
  (state: StoreState, id: ProductEntity['id']) => getProductSizes(state, id),
  sizes => sizes?.filter(size => !size.isOutOfStock),
);
