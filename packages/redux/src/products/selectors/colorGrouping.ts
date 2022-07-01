import { createSelector } from 'reselect';
import { getError, getIsLoading } from '../reducer/colorGrouping';
import { getProduct } from '../../entities/selectors';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns the color grouping loading condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product color grouping is loading or not.
 */
export const isProductColorGroupingLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) => getIsLoading((state.products as ProductsState).colorGrouping)[id];

/**
 * Returns the error condition from color grouping to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The color grouping error associated to a specific product.
 */
export const getProductColorGroupingError = (
  state: StoreState,
  id: ProductEntity['id'],
) => getError((state.products as ProductsState).colorGrouping)[id];

/**
 * Returns the color grouping requested, without manipulations, for a given product
 * id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The color grouping requested for a given product id.
 */
export const getProductColorGrouping = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.colorGrouping;
};

/**
 * Determines if a given product has color grouping associations. This is useful to
 * know if the color grouping request is needed.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product has colors grouping to request.
 */
export const hasProductColorGrouping = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.associationsInformation?.hasColorGrouping;
};

/**
 * Retrieves pagination information about current color grouping for a specific
 * product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns Pagination object.
 */
export const getProductColorGroupingPagination = createSelector(
  [
    (state: StoreState, id: ProductEntity['id']) =>
      getProductColorGrouping(state, id),
  ],
  result => {
    if (!result) return;

    return {
      number: result?.number,
      totalItems: result?.totalItems,
      totalPages: result?.totalPages,
    };
  },
);
