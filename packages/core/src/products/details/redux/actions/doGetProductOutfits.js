import {
  GET_PRODUCT_OUTFITS_FAILURE,
  GET_PRODUCT_OUTFITS_REQUEST,
  GET_PRODUCT_OUTFITS_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @callback GetProductOutfitsThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product outfits for a given product id.
 *
 * @function doGetProductOutfits
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductOutfits - Get product outfits client.
 *
 * @returns {GetProductOutfitsThunkFactory} Thunk factory.
 */
export default getProductOutfits => (productId, config) => async dispatch => {
  dispatch({
    payload: { productId },
    type: GET_PRODUCT_OUTFITS_REQUEST,
  });

  try {
    const result = await getProductOutfits(productId, config);
    const productWithOutfits = {
      id: productId,
      outfits: result,
    };

    return dispatch({
      payload: {
        ...normalize(productWithOutfits, productSchema),
        productId,
      },
      type: GET_PRODUCT_OUTFITS_SUCCESS,
    });
  } catch (error) {
    dispatch({
      payload: { error, productId },
      type: GET_PRODUCT_OUTFITS_FAILURE,
    });

    throw error;
  }
};
