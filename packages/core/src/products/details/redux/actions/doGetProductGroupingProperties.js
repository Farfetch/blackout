import {
  GET_PRODUCT_GROUPING_PROPERTIES_FAILURE,
  GET_PRODUCT_GROUPING_PROPERTIES_REQUEST,
  GET_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
} from '../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @typedef {object} GetProductGroupingPropertiesQuery
 * @property {boolean} [hasStock] - Filter for stock - default value is null (get all).
 */

/**
 * @callback GetProductGroupingThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {GetProductGroupingPropertiesQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product grouping properties for a given product id.
 *
 * @function doGetProductGroupingProperties
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductGroupingProperties - Get grouping properties client.
 *
 * @returns {GetProductGroupingPropertiesThunkFactory} Thunk factory.
 */
export default getProductGroupingProperties =>
  (productId, query = {}, config) =>
  async dispatch => {
    dispatch({
      payload: { productId },
      type: GET_PRODUCT_GROUPING_PROPERTIES_REQUEST,
    });

    try {
      const result = await getProductGroupingProperties(
        productId,
        query,
        config,
      );
      const productWithGroupingProperties = {
        id: productId,
        groupingProperties: result,
      };

      return dispatch({
        payload: {
          ...normalize(productWithGroupingProperties, productSchema),
          productId,
        },
        type: GET_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, productId },
        type: GET_PRODUCT_GROUPING_PROPERTIES_FAILURE,
      });

      throw error;
    }
  };
