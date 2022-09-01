import { buildQueryStringFromObject } from '../../../helpers';
import {
  Config,
  GetProductGroupingProperties,
  GroupingPropertiesQuery,
  Product,
  ProductGroupingProperties,
  toBlackoutError,
} from '@farfetch/blackout-client';
import {
  FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE,
  FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST,
  FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
} from '../../actionTypes';
import { getProduct } from '../../selectors';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type { StoreState } from '../../../types';

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
  async (
    dispatch: Dispatch,
    getState: () => StoreState,
  ): Promise<ProductGroupingProperties> => {
    try {
      dispatch({
        meta: { productId },
        type: FETCH_PRODUCT_GROUPING_PROPERTIES_REQUEST,
      });

      const result = await getProductGroupingProperties(
        productId,
        query,
        config,
      );
      const state = getState();
      const product = getProduct(state, productId);
      const previousGroupingProperties = product?.groupingProperties;
      const queryString = query && buildQueryStringFromObject(query);
      const hash = queryString ? queryString : '!all';

      const productWithGroupingProperties = {
        id: productId,
        groupingProperties: {
          ...previousGroupingProperties,
          [hash]: result,
        },
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithGroupingProperties, productSchema),
        type: FETCH_PRODUCT_GROUPING_PROPERTIES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: FETCH_PRODUCT_GROUPING_PROPERTIES_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductGroupingFactory;
