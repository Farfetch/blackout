import { adaptGrouping } from '../../../helpers/adapters/index.js';
import {
  type Config,
  type GetProductGrouping,
  type GetProductGroupingQuery,
  type Product,
  type ProductGrouping,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  FETCH_PRODUCT_GROUPING_FAILURE,
  FETCH_PRODUCT_GROUPING_REQUEST,
  FETCH_PRODUCT_GROUPING_SUCCESS,
} from '../../actionTypes/index.js';
import generateProductGroupingHash from '../../utils/generateProductGroupingHash.js';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * grouping for a given product id.
 *
 * @param getProductGrouping - Get grouping client.
 *
 * @returns Thunk factory.
 */
const fetchProductGroupingFactory =
  (getProductGrouping: GetProductGrouping) =>
  /**
   * @param productId - Numeric identifier of the product.
   * @param query     - Query parameters to apply to the request.
   * @param config    - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (
    productId: Product['result']['id'],
    query: GetProductGroupingQuery = {},
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<ProductGrouping> => {
    const hash = generateProductGroupingHash(query);

    try {
      dispatch({
        meta: { productId },
        payload: { hash },
        type: FETCH_PRODUCT_GROUPING_REQUEST,
      });

      const result = await getProductGrouping(productId, query, config);
      const adaptedGrouping = adaptGrouping(result);

      dispatch({
        meta: { productId },
        payload: { result: adaptedGrouping, hash },
        type: FETCH_PRODUCT_GROUPING_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError, hash },
        type: FETCH_PRODUCT_GROUPING_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductGroupingFactory;
