import { buildQueryStringFromObject } from '../../../helpers';
import {
  Config,
  GetProductGrouping,
  GroupingQuery,
  Product,
  ProductGrouping,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  FETCH_PRODUCT_GROUPING_FAILURE,
  FETCH_PRODUCT_GROUPING_REQUEST,
  FETCH_PRODUCT_GROUPING_SUCCESS,
} from '../../actionTypes';
import { getProduct } from '../../selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type { StoreState } from '../../../types';

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
    query: GroupingQuery = {},
    config?: Config,
  ) =>
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
  ): Promise<ProductGrouping> => {
    try {
      dispatch({
        meta: { productId },
        type: FETCH_PRODUCT_GROUPING_REQUEST,
      });

      const result = await getProductGrouping(productId, query, config);
      const state = getState();
      const product = getProduct(state, productId);
      const previousGroupings = product?.grouping;
      const queryString = query && buildQueryStringFromObject(query);
      const hash = queryString ? queryString : '!all';

      const productWithGrouping = {
        id: productId,
        grouping: {
          ...previousGroupings,
          [hash]: result,
        },
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithGrouping, productSchema),
        type: FETCH_PRODUCT_GROUPING_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: FETCH_PRODUCT_GROUPING_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductGroupingFactory;
