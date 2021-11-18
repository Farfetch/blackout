import {
  getMerchantsLocationsError,
  getMerchantsLocationsIsLoading,
} from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the merchants locations loading condition for a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product's merchants locations are loading.
 */
export const areProductMerchantsLocationsLoading = (state, id) =>
  getMerchantsLocationsIsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product's merchants locations.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product's merchants locations are fetched.
 */
export const areProductMerchantsLocationsFetched = (state, id) =>
  getMerchantsLocationsIsLoading(state.details).hasOwnProperty(id) &&
  areProductMerchantsLocationsLoading(state, id) === false;

/**
 * Returns the error of a product's merchants locations.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The merchants locations error associated with a specific
 * product.
 */
export const getProductMerchantsLocationsError = (state, id) =>
  getMerchantsLocationsError(state.details)[id];

/**
 * Returns the merchants' locations given a product variant.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} productId - Product id.
 * @param {number} variantId - Variant id.
 *
 * @returns {object|undefined} Merchants' locations for a given product and
 * variant id.
 */
export const getProductMerchantsLocations = (state, productId, variantId) => {
  const product = getProduct(state, productId);

  if (product && get(product, 'variants.length')) {
    const variant = product.variants.find(variant => variant.id === variantId);

    return get(variant, 'merchantsLocations');
  }
};
