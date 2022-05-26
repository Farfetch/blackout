import { getError, getIsLoading } from '../reducer/attributes';
import { getProduct } from '../../entities/selectors';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
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
): boolean | undefined => getIsLoading(state.products.attributes)[id];

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
): boolean | undefined =>
  getIsLoading(state.products.attributes).hasOwnProperty(id) &&
  areProductAttributesLoading(state, id) === false;

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
): BlackoutError | undefined => getError(state.products.attributes)[id];

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
): ProductEntity['attributes'] | undefined => {
  const product = getProduct(state, id);

  return product?.attributes;
};
