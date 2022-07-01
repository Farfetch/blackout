import * as actionTypes from '../../actionTypes';
import {
  ColorGroupingQuery,
  Config,
  GetProductColorGrouping,
  Product,
  ProductColorGrouping,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';

/**
 * @param productId - Numeric identifier of the product.
 * @param query     - Query parameters to apply to the request.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * color grouping for a given product id.
 *
 * @param getProductColorGrouping - Get color grouping client.
 *
 * @returns Thunk factory.
 */
export const fetchProductColorGroupingFactory =
  (getProductColorGrouping: GetProductColorGrouping) =>
  (
    productId: Product['result']['id'],
    query: ColorGroupingQuery = {},
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<ProductColorGrouping> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_REQUEST,
      });

      const result = await getProductColorGrouping(productId, query, config);

      // Replace all the color grouping data with the new one
      const productWithColorGrouping = {
        id: productId,
        colorGrouping: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithColorGrouping, productSchema),
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PRODUCT_COLOR_GROUPING_FAILURE,
      });

      throw error;
    }
  };
