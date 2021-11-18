import {
  GET_PRODUCT_ATTRIBUTES_FAILURE,
  GET_PRODUCT_ATTRIBUTES_REQUEST,
  GET_PRODUCT_ATTRIBUTES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @callback GetProductAttributesThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product attributes for a given product id.
 *
 * @function doGetProductAttributes
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductAttributes - Get product attributes client.
 *
 * @returns {GetProductAttributesThunkFactory} Thunk factory.
 */
export default getProductAttributes => (productId, config) => async dispatch => {
  dispatch({
    payload: { productId },
    type: GET_PRODUCT_ATTRIBUTES_REQUEST,
  });

  try {
    const result = await getProductAttributes(productId, config);
    const productWithAttributes = {
      id: productId,
      attributes: result,
    };

    return dispatch({
      payload: {
        ...normalize(productWithAttributes, productSchema),
        productId,
      },
      type: GET_PRODUCT_ATTRIBUTES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error, productId },
      type: GET_PRODUCT_ATTRIBUTES_FAILURE,
    });

    throw error;
  }
};
