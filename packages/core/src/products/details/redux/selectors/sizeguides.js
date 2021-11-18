import { getAreSizeguidesLoading, getSizeguidesError } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the loading sizeguides condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product sizeguides are loading or not.
 */
export const areProductSizeguidesLoading = (state, id) =>
  getAreSizeguidesLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product sizeguides.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If a certain product sizeguide has been fetched or not.
 */
export const areProductSizeguidesFetched = (state, id) =>
  getAreSizeguidesLoading(state.details).hasOwnProperty(id) &&
  areProductSizeguidesLoading(state, id) === false;

/**
 * Returns the error sizeguide condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The sizeguides error associated to a specific product.
 */
export const getProductSizeguideError = (state, id) =>
  getSizeguidesError(state.details)[id];

/**
 * Returns the most specific sizeguide for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object|undefined} The most specific sizeguide for a given product
 * id.
 */
export const getProductSizeguide = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'sizeguides[0]');
};
