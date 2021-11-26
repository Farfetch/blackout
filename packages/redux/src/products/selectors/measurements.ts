import { getError, getIsLoading } from '../reducer/measurements';
import { getProduct } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Returns the loading measurements condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product measurements are loading or not.
 */
export const areProductMeasurementsLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsLoading(state.products.measurements)[id];

/**
 * Returns the fetched status of a specific product measurements.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product measurements has been fetched or not.
 */
export const areProductMeasurementsFetched = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  getIsLoading(state.products.measurements).hasOwnProperty(id) &&
  areProductMeasurementsLoading(state, id) === false;

/**
 * Returns the error measurements condition to a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The measurements error associated to a specific product.
 */
export const getProductMeasurementsError = (
  state: StoreState,
  id: ProductEntity['id'],
): Error | undefined => getError(state.products.measurements)[id];

/**
 * Returns the measurements for a given product id.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The measurements for a given product id.
 */
export const getProductMeasurements = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductEntity['measurements'] | undefined => {
  const product = getProduct(state, id);

  return product?.measurements;
};
