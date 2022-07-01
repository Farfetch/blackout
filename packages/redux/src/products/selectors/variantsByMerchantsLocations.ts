import {
  getError,
  getIsLoading,
} from '../reducer/variantsByMerchantsLocations';
import { getProduct } from '../../entities/selectors';
import type { ProductEntity } from '../../entities/types';
import type { ProductsState } from '../types';
import type {
  ProductVariant,
  ProductVariantMerchantLocation,
} from '@farfetch/blackout-client';
import type { StoreState } from '../../types';

/**
 * Returns the merchants locations loading condition for a specific product.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product's merchants locations are loading.
 */
export const areProductVariantsByMerchantsLocationsLoading = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getIsLoading((state.products as ProductsState).variantsByMerchantsLocations)[
    id
  ];

/**
 * Returns the fetched status of a specific product's merchants locations.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns If the product's merchants locations are fetched.
 */
export const areProductVariantsByMerchantsLocationsFetched = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  getIsLoading(
    (state.products as ProductsState).variantsByMerchantsLocations,
  ).hasOwnProperty(id) &&
  areProductVariantsByMerchantsLocationsLoading(state, id) === false;

/**
 * Returns the error of a product's merchants locations.
 *
 * @param state - Application state.
 * @param id    - Product id.
 *
 * @returns The merchants locations error associated with a specific product.
 */
export const getProductVariantsByMerchantsLocationsError = (
  state: StoreState,
  id: ProductEntity['id'],
) =>
  getError((state.products as ProductsState).variantsByMerchantsLocations)[id];

/**
 * Returns the merchants' locations given a product variant.
 *
 * @param state     - Application state.
 * @param productId - Product id.
 * @param variantId - Variant id.
 *
 * @returns Merchants' locations for a given product and variant id.
 */
export const getProductVariantsByMerchantsLocations = (
  state: StoreState,
  productId: ProductEntity['id'],
  variantId: ProductVariant['id'],
): ProductVariantMerchantLocation[] | undefined => {
  const product = getProduct(state, productId);

  if (product?.variants?.length) {
    const variant = product.variants.find(variant => variant.id === variantId);

    return variant?.merchantsLocations;
  }

  return undefined;
};
