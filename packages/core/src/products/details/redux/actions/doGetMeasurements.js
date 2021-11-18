import {
  GET_MEASUREMENTS_FAILURE,
  GET_MEASUREMENTS_REQUEST,
  GET_MEASUREMENTS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @callback GetMeasurementsThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product measurements for a given product id.
 *
 * @function doGetMeasurements
 * @memberof module:products/details/actions
 *
 * @param {Function} getMeasurements - Get measurements client.
 *
 * @returns {GetMeasurementsThunkFactory} Thunk factory.
 */
export default getMeasurements => (productId, config) => async dispatch => {
  dispatch({
    payload: { productId },
    type: GET_MEASUREMENTS_REQUEST,
  });

  try {
    const result = await getMeasurements(productId, config);
    const productWithMeasurements = {
      id: productId,
      measurements: result,
    };

    return dispatch({
      payload: {
        ...normalize(productWithMeasurements, productSchema),
        productId,
      },
      type: GET_MEASUREMENTS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error, productId },
      type: GET_MEASUREMENTS_FAILURE,
    });

    throw error;
  }
};
