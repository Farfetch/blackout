import {
  getError,
  getIsLoading,
} from '../reducer/variantsByMerchantsLocations';
import { getProduct } from '../../entities/selectors';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductEntity } from '../../entities/types';
import type {
  ProductVariant,
  ProductVariantByMerchantLocation,
} from '@farfetch/blackout-client/products/types';
import type { StoreState } from '../../types';

/**
 * Returns the merchants locations loading condition for a specific product.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product's merchants locations are loading.
 */
export const areProductVariantsByMerchantsLocationsLoading = (
  state: StoreState,
  id: ProductEntity['id'],
): boolean | undefined =>
  getIsLoading(state.products.variantsByMerchantsLocations)[id];

/**
 * Returns the fetched status of a specific product's merchants locations.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product's merchants locations are fetched.
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
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The merchants locations error associated with a specific
 * product.
 */
export const getProductVariantsByMerchantsLocationsError = (
  state: StoreState,
  id: ProductEntity['id'],
): Error | undefined =>
  getError(state.products.variantsByMerchantsLocations)[id];

/**
 * Returns the merchants' locations given a product variant.
 *
 * @memberof module:products/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Product id.
 * @param {number} variantId - Variant id.
 *
 * @returns {object|undefined} Merchants' locations for a given product and
 * variant id.
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
