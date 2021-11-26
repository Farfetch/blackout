import { getError, getIsLoading } from '../reducer/attributes';
import { getProduct } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Returns the loading product attributes condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product attributes are loading or not.
 */
export const areProductAttributesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsLoading(state.products.attributes)[id];

/**
 * Returns the fetched status of a specific product attributes.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product attributes has been fetched or not.
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
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The attributes error associated to a specific product.
 */
export const getProductAttributesError = (
  state: StoreState,
  id: ProductEntity['id'],
): Error | undefined => getError(state.products.attributes)[id];

/**
 * Returns the attributes for a given product id.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The attributes for a given product id.
 */
export const getProductAttributes = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductEntity['attributes'] | undefined => {
  const product = getProduct(state, id);

  return product?.attributes;
};
