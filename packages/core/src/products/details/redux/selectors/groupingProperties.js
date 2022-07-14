import {
  getGroupingPropertiesError,
  getIsGroupingPropertiesLoading,
} from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the grouping properties loading condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product grouping properties is loading or not.
 */
export const isProductGroupingPropertiesLoading = (state, id) =>
  getIsGroupingPropertiesLoading(state.details)[id];

/**
 * Returns the error condition from grouping to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The grouping properties error associated to a specific product.
 */
export const getProductGroupingPropertiesError = (state, id) =>
  getGroupingPropertiesError(state.details)[id];

/**
 * Returns the grouping properties requested, without manipulations, for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The grouping properties requested for a given product id.
 */
export const getProductGroupingProperties = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'groupingProperties');
};
