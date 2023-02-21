import { adaptGroupingProperties } from '../../../helpers/adapters';
import { buildQueryStringFromObject } from '../../../helpers';
import {
  type Config,
  type GetProductGroupingProperties,
  type GroupingPropertiesQuery,
  type Product,
  type ProductGroupingProperties,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE,
  FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST,
  FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
} from '../../actionTypes';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * grouping properties for a given product id.
 *
 * @param getProductGroupingProperties - Get grouping properties client.
 *
 * @returns Thunk factory.
 */
const fetchProductGroupingFactory =
  (getProductGroupingProperties: GetProductGroupingProperties) =>
  /**
   * @param productId - Numeric identifier of the product.
   * @param query     - Query parameters to apply to the request.
   * @param config    - Custom configurations to send to the client instance (axios).
   *
   * @returns Thunk to be dispatched to the redux store.
   */
  (
    productId: Product['result']['id'],
    query: GroupingPropertiesQuery = {},
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<ProductGroupingProperties> => {
    const queryString = query && buildQueryStringFromObject(query);
    const hash = queryString ? queryString : '!all';

    try {
      dispatch({
        meta: { productId },
        payload: { hash },
        type: FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST,
      });

      const result = await getProductGroupingProperties(
        productId,
        query,
        config,
      );

      dispatch({
        meta: { productId },
        payload: { hash, result: adaptGroupingProperties(result) },
        type: FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError, hash },
        type: FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductGroupingFactory;
