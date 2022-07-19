import {
  GET_PRODUCT_GROUPING_FAILURE,
  GET_PRODUCT_GROUPING_REQUEST,
  GET_PRODUCT_GROUPING_SUCCESS,
} from '../actionTypes';
import { getProduct } from '../../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @typedef {object} GetProductGroupingQuery
 * @property {number} [pageIndex=1] - The current page - defaults to 1 on
 * the backend side.
 * @property {number} [pageSize=10] - Size of each page, as a number -
 * defaults to 10 on the backend side.
 * @property {string} [properties] - Get product variations for specific
 * properties, identified by their type (propertyType:attributeValueId),
 * separated by commas.
 */

/**
 * @callback GetProductGroupingThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {GetProductGroupingQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product grouping for a given product id.
 *
 * @function doGetProductGrouping
 * @memberof module:products/details/actions
 *
 * @param {Function} getProductGrouping - Get grouping client.
 *
 * @returns {GetProductGroupingThunkFactory} Thunk factory.
 */
export default getProductGrouping =>
  (productId, query = {}, config) =>
  async (dispatch, getState) => {
    dispatch({
      payload: { productId },
      type: GET_PRODUCT_GROUPING_REQUEST,
    });

    try {
      const result = await getProductGrouping(productId, query, config);
      const state = getState();
      const { grouping = [] } = getProduct(state, productId);
      // `number` is the current  grouping page number
      // to save the last page requested
      const { number } = result;
      // Need to group the oldest  grouping requested with the new one.
      // Without this we were losing the pagination concept
      // because the result is always replaced.
      const productWithGrouping = {
        id: productId,
        grouping: [...grouping, result],
      };

      return dispatch({
        payload: {
          ...normalize(productWithGrouping, productSchema),
          productId,
        },
        meta: {
          number,
        },
        type: GET_PRODUCT_GROUPING_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, productId },
        type: GET_PRODUCT_GROUPING_FAILURE,
      });

      throw error;
    }
  };
