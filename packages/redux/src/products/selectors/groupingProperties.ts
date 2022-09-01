import { getError, getIsLoading } from '../reducer/groupingProperties';
import { getProduct } from './product';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns the loading grouping properties condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product grouping properties are loading or not.
 */
export const areProductGroupingPropertiesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) => getIsLoading((state.products as ProductsState).groupingProperties)[id];

/**
 * Returns the fetched status of a specific product grouping properties.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If certain product grouping properties have been fetched or not.
 */
export const areProductGroupingPropertiesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getIsLoading(
    (state.products as ProductsState).groupingProperties,
  ).hasOwnProperty(id) &&
  areProductGroupingPropertiesLoading(state, id) === false;

/**
 * Returns the error grouping properties condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The grouping properties error associated to a specific product.
 */
export const getProductGroupingPropertiesError = (
  state: StoreState,
  id: ProductEntity['id'],
) => getError((state.products as ProductsState).groupingProperties)[id];

/**
 * Returns the grouping properties for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 * @param hash  - Hash built with query params.
 *
 * @returns The grouping properties for a given product id.
 */
export const getProductGroupingProperties = (
  state: StoreState,
  id: ProductEntity['id'],
  hash: string,
) => {
  const product = getProduct(state, id);
  const groupingProperties = product?.groupingProperties?.[hash];

  return groupingProperties;
};
