import { getError, getIsLoading } from '../reducer/sizeGuides';
import { getProduct } from '../../entities/selectors';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns the loading size guides condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product size guides are loading or not.
 */
export const areProductSizeGuidesLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) => getIsLoading((state.products as ProductsState).sizeGuides)[id];

/**
 * Returns the fetched status of a specific product size guides.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If a certain product size guide has been fetched or not.
 */
export const areProductSizeGuidesFetched = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getIsLoading((state.products as ProductsState).sizeGuides).hasOwnProperty(
    id,
  ) && areProductSizeGuidesLoading(state, id) === false;

/**
 * Returns the error size guide condition to a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The size guides error associated to a specific product.
 */
export const getProductSizeGuidesError = (
  state: StoreState,
  id: ProductEntity['id'],
) => getError((state.products as ProductsState).sizeGuides)[id];

/**
 * Returns the most specific size guide for a given product id.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The most specific size guide for a given product id.
 */
export const getProductSizeGuide = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.sizeGuides?.[0];
};
