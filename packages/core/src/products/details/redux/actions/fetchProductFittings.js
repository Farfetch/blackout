import {
  FETCH_PRODUCT_FITTINGS_FAILURE,
  FETCH_PRODUCT_FITTINGS_REQUEST,
  FETCH_PRODUCT_FITTINGS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @callback FetchProductFittingsThunkFactory
 *
 * @alias FetchProductFittingsThunkFactory
 * @memberof module:products/details/actions
 *
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product fittings for a given product id.
 *
 * @function fetchProductFittings
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductFittings - Get product fittings client.
 *
 * @returns {FetchProductFittingsThunkFactory} Thunk factory.
 */
export default getProductFittings => (productId, config) => async dispatch => {
  dispatch({
    meta: { productId },
    type: FETCH_PRODUCT_FITTINGS_REQUEST,
  });

  try {
    const result = await getProductFittings(productId, config);
    const productWithFittings = {
      id: productId,
      fittings: result,
    };

    return dispatch({
      meta: { productId },
      payload: normalize(productWithFittings, productSchema),
      type: FETCH_PRODUCT_FITTINGS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { productId },
      payload: { error },
      type: FETCH_PRODUCT_FITTINGS_FAILURE,
    });

    throw error;
  }
};
