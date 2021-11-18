import {
  GET_COLOR_GROUPING_FAILURE,
  GET_COLOR_GROUPING_REQUEST,
  GET_COLOR_GROUPING_SUCCESS,
} from '../actionTypes';
import { getProduct } from '../../../../entities/redux/selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../../entities/schemas/product';

/**
 * @typedef {object} GetColorGroupingQuery
 * @property {number} [pageIndex=1] - The current page - defaults to 1 on
 * the backend side.
 * @property {number} [pageSize=10] - Size of each page, as a number -
 * defaults to 10 on the backend side.
 */

/**
 * @callback GetColorGroupingThunkFactory
 * @param {number} productId - Numeric identifier of the product.
 * @param {GetColorGroupingQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Load product color grouping for a given product id.
 *
 * @function doGetColorGrouping
 * @memberof module:products/details/actions
 *
 * @param {Function} getColorGrouping - Get color grouping client.
 *
 * @returns {GetColorGroupingThunkFactory} Thunk factory.
 */
export default getColorGrouping =>
  (productId, query = {}, config) =>
  async (dispatch, getState) => {
    dispatch({
      payload: { productId },
      type: GET_COLOR_GROUPING_REQUEST,
    });

    try {
      const result = await getColorGrouping(productId, query, config);
      const state = getState();
      const { colorGrouping = [] } = getProduct(state, productId);
      // `number` is the current color grouping page number
      // to save the last page requested
      const { number } = result;
      // Need to group the oldest color grouping requested with the new one.
      // Without this we were losing the pagination concept
      // because the result is always replaced.
      const productWithColorGrouping = {
        id: productId,
        colorGrouping: [...colorGrouping, result],
      };

      return dispatch({
        payload: {
          ...normalize(productWithColorGrouping, productSchema),
          productId,
        },
        meta: {
          number,
        },
        type: GET_COLOR_GROUPING_SUCCESS,
      });
    } catch (error) {
      dispatch({
        payload: { error, productId },
        type: GET_COLOR_GROUPING_FAILURE,
      });

      throw error;
    }
  };
