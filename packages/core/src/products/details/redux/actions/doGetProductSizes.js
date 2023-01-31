import {
  GET_PRODUCT_SIZES_FAILURE,
  GET_PRODUCT_SIZES_REQUEST,
  GET_PRODUCT_SIZES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @typedef {object} GetProductSizesQuery
 *
 * @alias GetProductSizesQuery
 * @memberof module:products/details/actions
 *
 * @property {boolean} [includeOutOfStock] - If the sizes out of stock are
 * included or not.
 */

/**
 * @callback GetProductSizesThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {GetProductSizesQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product sizes for a given product id.
 *
 * @function doGetProductSizes
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductSizes - Get product sizes client.
 *
 * @returns {GetProductSizesThunkFactory} Thunk factory.
 */
export default getProductSizes =>
  (productId, query, config) =>
  async dispatch => {
    dispatch({
      meta: { productId },
      type: GET_PRODUCT_SIZES_REQUEST,
    });

    try {
      const result = await getProductSizes(productId, query, config);
      const productWithSizes = {
        id: productId,
        sizes: result,
      };

      return dispatch({
        meta: { productId },
        payload: normalize(productWithSizes, productSchema),
        type: GET_PRODUCT_SIZES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: GET_PRODUCT_SIZES_FAILURE,
      });

      throw error;
    }
  };
