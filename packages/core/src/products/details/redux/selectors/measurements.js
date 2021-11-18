import { getAreMeasurementsLoading, getMeasurementsError } from '../reducer';
import { getProduct } from '../../../../entities/redux/selectors';
import get from 'lodash/get';

/**
 * Returns the loading measurements condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product measurements are loading or not.
 */
export const areProductMeasurementsLoading = (state, id) =>
  getAreMeasurementsLoading(state.details)[id];

/**
 * Returns the fetched status of a specific product measurements.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {boolean} If the product measurements has been fetched or not.
 */
export const areProductMeasurementsFetched = (state, id) =>
  getAreMeasurementsLoading(state.details).hasOwnProperty(id) &&
  areProductMeasurementsLoading(state, id) === false;

/**
 * Returns the error measurements condition to a specific product.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {object} The measurements error associated to a specific product.
 */
export const getProductMeasurementsError = (state, id) =>
  getMeasurementsError(state.details)[id];

/**
 * Returns the measurements for a given product id.
 *
 * @function
 * @memberof module:products/details/selectors
 *
 * @param {object} state - Application state.
 * @param {number} id - Product id.
 *
 * @returns {Array|undefined} The measurements for a given product id.
 */
export const getProductMeasurements = (state, id) => {
  const product = getProduct(state, id);

  return get(product, 'measurements');
};
