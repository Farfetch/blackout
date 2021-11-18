import { createSelector } from 'reselect';
import { getAreSizesLoading, getSizesError } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the loading product sizes condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product sizes are loading or not.
 */
export const areProductSizesLoading = (state, id) =>
  getAreSizesLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product sizes.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product sizes has been fetched or not.
 */
export const areProductSizesFetched = (state, id) =>
  getAreSizesLoading(state.details).hasOwnProperty(id) &&
  areProductSizesLoading(state, id) === false;

/**
 * Returns the error sizes condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The sizes error associated to a specific product.
 */
export const getProductSizesError = (state, id) =>
  getSizesError(state.details)[id];

/**
 * Returns the sizes for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The sizes for a given product id.
 */
export const getProductSizes = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'sizes');
};

/**
 * Returns the sizes with stock for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The sizes with stock for a given product id.
 */
export const getProductSizesWithStock = createSelector(
  (state, id) => getProductSizes(state, id),
  sizes => sizes?.filter(size => !size.isOutOfStock),
);
