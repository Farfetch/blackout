import { getAreFittingsLoading, getFittingsError } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';

/**
 * Returns the loading product fittings condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product fittings is loading or not.
 */
export const areProductFittingsLoading = (state, id) =>
  getAreFittingsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product fittings.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product fittings has been fetched or not.
 */
export const areProductFittingsFetched = (state, id) =>
  getAreFittingsLoading(state.details).hasOwnProperty(id) &&
  areProductFittingsLoading(state, id) === false;

/**
 * Returns the error fittings condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The fittings error associated to a specific product.
 */
export const getProductFittingsError = (state, id) =>
  getFittingsError(state.details)[id];

/**
 * Returns the fittings information for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The fittings information for a given product id.
 */
export const getProductFittings = (state, id) => {
  const product = getProduct(state, id);

  return product?.fittings;
};
