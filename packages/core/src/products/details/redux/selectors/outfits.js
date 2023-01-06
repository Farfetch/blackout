import { getAreOutfitsLoading, getOutfitsError } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the loading product outfits condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product outfits are loading or not.
 */
export const areProductOutfitsLoading = (state, id) =>
  getAreOutfitsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product outfits.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product outfits has been fetched or not.
 */
export const areProductOutfitsFetched = (state, id) =>
  getAreOutfitsLoading(state.details).hasOwnProperty(id) &&
  areProductOutfitsLoading(state, id) === false;

/**
 * Returns the error outfits condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The outfits error associated to a specific product.
 */
export const getProductOutfitsError = (state, id) =>
  getOutfitsError(state.details)[id];

/**
 * Returns the outfits for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The outfits for a given product id.
 */
export const getProductOutfits = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'outfits');
};
