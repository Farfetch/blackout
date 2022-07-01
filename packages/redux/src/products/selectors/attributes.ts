import { getError, getIsLoading } from '../reducer/attributes';
import { getProduct } from '../../entities/selectors';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns the loading product attributes condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product attributes are loading or not.
 */
export const areProductAttributesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) => getIsLoading((state.products as ProductsState).attributes)[id];

/**
 * Returns the fetched status of a specific product attributes.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product attributes has been fetched or not.
 */
export const areProductAttributesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getIsLoading((state.products as ProductsState).attributes).hasOwnProperty(
    id,
  ) && areProductAttributesLoading(state, id) === false;

/**
 * Returns the error attributes condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The attributes error associated to a specific product.
 */
export const getProductAttributesError = (
  state: StoreState,
  id: ProductEntity['id'],
) => getError((state.products as ProductsState).attributes)[id];

/**
 * Returns the attributes for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The attributes for a given product id.
 */
export const getProductAttributes = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.attributes;
};
