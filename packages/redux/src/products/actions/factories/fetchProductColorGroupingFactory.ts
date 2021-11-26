import {
  FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
  FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
  FETCH_PRODUCT_COLOR_GROUPING_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type {
  ColorGroupingQuery,
  GetProductColorGrouping,
  Product,
  ProductColorGrouping,
} from '@farfetch/blackout-client/products/types';
import type { Dispatch } from 'redux';

/**
 * @typedef {object} FetchProductColorGroupingQuery
 *
 * @property {number} [pageIndex=1] - The current page - defaults to 1 on
 * the backend side.
 * @property {number} [pageSize=10] - Size of each page, as a number -
 * defaults to 10 on the backend side.
 */

/**
 * @callback FetchProductColorGroupingThunkFactory
 *
 * @param {number} productId - Numeric identifier of the product.
 * @param {FetchProductColorGroupingQuery} [query] - Query parameters to apply to the
 * request.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * color grouping for a given product id.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getProductColorGrouping - Get color grouping client.
 *
 * @returns {FetchProductColorGroupingThunkFactory} Thunk factory.
 */
const fetchProductColorGroupingFactory =
  (getProductColorGrouping: GetProductColorGrouping) =>
  (
    productId: Product['result']['id'],
    query: ColorGroupingQuery = {},
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<ProductColorGrouping> => {
    dispatch({
      meta: { productId },
      type: FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
    });

    try {
      const result = await getProductColorGrouping(productId, query, config);

      // Replace all the color grouping data with the new one
      const productWithColorGrouping = {
        id: productId,
        colorGrouping: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithColorGrouping, productSchema),
        type: FETCH_PRODUCT_COLOR_GROUPING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductColorGroupingFactory;
