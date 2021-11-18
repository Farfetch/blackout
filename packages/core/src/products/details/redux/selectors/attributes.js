import { getAreAttributesLoading, getAttributesError } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the loading product attributes condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product attributes are loading or not.
 */
export const areProductAttributesLoading = (state, id) =>
  getAreAttributesLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product attributes.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product attributes has been fetched or not.
 */
export const areProductAttributesFetched = (state, id) =>
  getAreAttributesLoading(state.details).hasOwnProperty(id) &&
  areProductAttributesLoading(state, id) === false;

/**
 * Returns the error attributes condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The attributes error associated to a specific product.
 */
export const getProductAttributesError = (state, id) =>
  getAttributesError(state.details)[id];

/**
 * Returns the attributes for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The attributes for a given product id.
 */
export const getProductAttributes = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'attributes');
};
