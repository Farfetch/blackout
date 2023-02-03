import { getError, getIsLoading } from '../reducer/outfits';
import { getProduct } from './product';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type { StoreState } from '../../types';

/**
 * Returns the loading status for product outfits of a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product outfits are loading or not.
 */
export const areProductOutfitsLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) => getIsLoading((state.products as ProductsState).outfits)[id];

/**
 * Returns the fetched status for product outfits of a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product outfits have been fetched or not.
 */
export const areProductOutfitsFetched = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getIsLoading((state.products as ProductsState).outfits).hasOwnProperty(id) &&
  areProductOutfitsLoading(state, id) === false;

/**
 * Returns the error status for product outfits of a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The outfits error associated to a specific product.
 */
export const getProductOutfitsError = (
  state: StoreState,
  id: ProductEntity['id'],
) => getError((state.products as ProductsState).outfits)[id];

/**
 * Returns the loading status for product outfits of a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The outfits information for a given product id.
 */
export const getProductOutfits = (
  state: StoreState,
  id: ProductEntity['id'],
) => {
  const product = getProduct(state, id);

  return product?.outfits;
};
