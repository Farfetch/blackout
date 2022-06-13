import {
  getError,
  getIsLoading,
} from '../reducer/variantsByMerchantsLocations';
import { getProduct } from '../../entities/selectors';
import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type {
  ProductVariant,
  ProductVariantByMerchantLocation,
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
): boolean | undefined =>
  getIsLoading(state.products.variantsByMerchantsLocations)[id];

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
  getIsLoading(state.products.variantsByMerchantsLocations).hasOwnProperty(
    id,
  ) && areProductVariantsByMerchantsLocationsLoading(state, id) === false;

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
): BlackoutError | undefined =>
  getError(state.products.variantsByMerchantsLocations)[id];

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
): ProductVariantByMerchantLocation[] | undefined => {
  const product = getProduct(state, productId);

  if (product?.variants?.length) {
    const variant = product.variants.find(variant => variant.id === variantId);

    return variant?.merchantsLocations;
  }
};
