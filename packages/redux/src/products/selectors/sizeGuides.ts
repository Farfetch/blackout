import { getError, getIsLoading } from '../reducer/sizeGuides';
import { getProduct } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type { ProductSizeGuide } from '@farfetch/blackout-client/products/types';
import type { StoreState } from '../../types';

/**
 * Returns the loading size guides condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product size guides are loading or not.
 */
export const areProductSizeGuidesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsLoading(state.products.sizeGuides)[id];

/**
 * Returns the fetched status of a specific product size guides.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product size guide has been fetched or not.
 */
export const areProductSizeGuidesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  getIsLoading(state.products.sizeGuides).hasOwnProperty(id) &&
  areProductSizeGuidesLoading(state, id) === false;

/**
 * Returns the error size guide condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The size guides error associated to a specific product.
 */
export const getProductSizeGuidesError = (
  state: StoreState,
  id: ProductEntity['id'],
): Error | undefined => getError(state.products.sizeGuides)[id];

/**
 * Returns the most specific size guide for a given product id.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object|undefined} The most specific size guide for a given product
 * id.
 */
export const getProductSizeGuide = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductSizeGuide | undefined => {
  const product = getProduct(state, id);

  return product?.sizeGuides?.[0];
};
