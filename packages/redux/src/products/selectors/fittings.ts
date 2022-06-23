import { getError, getIsLoading } from '../reducer/fittings';
import { getProduct } from '../../entities/selectors';
import type { BlackoutError } from '@farfetch/blackout-client';
import type { ProductEntity } from '../../entities/types';
import type { StoreState } from '../../types';

/**
 * Returns the loading product fittings condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product fittings is loading or not.
 */
export const areProductFittingsLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined => getIsLoading(state.products.fittings)[id];

/**
 * Returns the fetched status of a specific product fittings.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product fittings has been fetched or not.
 */
export const areProductFittingsFetched = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  getIsLoading(state.products.fittings).hasOwnProperty(id) &&
  areProductFittingsLoading(state, id) === false;

/**
 * Returns the error fittings condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The fittings error associated to a specific product.
 */
export const getProductFittingsError = (
  state: StoreState,
  id: ProductEntity['id'],
): BlackoutError | undefined => getError(state.products.fittings)[id];

/**
 * Returns the fittings information for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The fittings information for a given product id.
 */
export const getProductFittings = (
  state: StoreState,
  id: ProductEntity['id'],
): ProductEntity['fittings'] | undefined => {
  const product = getProduct(state, id);

  return product?.fittings;
};
