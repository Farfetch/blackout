import {
  GET_PRODUCT_SIZEGUIDES_FAILURE,
  GET_PRODUCT_SIZEGUIDES_REQUEST,
  GET_PRODUCT_SIZEGUIDES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @callback GetProductSizeguidesThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product sizeguides for a given product id.
 * This sizeguides logic should be used where the project has a category tree.
 * If your project does not have a category tree you
 * should use the sizeguides logic from @farfetch/blackout-core/sizeguides/redux.
 *
 * @function doGetProductSizeguides
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductSizeguides - Get product size guides client.
 *
 * @returns {GetProductSizeguidesThunkFactory} Thunk factory.
 */
export default getProductSizeguides => (productId, config) => async dispatch => {
  dispatch({
    meta: { productId },
    type: GET_PRODUCT_SIZEGUIDES_REQUEST,
  });

  try {
    const result = await getProductSizeguides(productId, config);

    const productWithSizeguide = {
      id: productId,
      sizeguides: result,
    };

    return dispatch({
      meta: { productId },
      payload: {
        ...normalize(productWithSizeguide, productSchema),
      },
      type: GET_PRODUCT_SIZEGUIDES_SUCCESS,
    });
  } catch (error) {
    dispatch({
      meta: { productId },
      payload: { error },
      type: GET_PRODUCT_SIZEGUIDES_FAILURE,
    });

    throw error;
  }
};
