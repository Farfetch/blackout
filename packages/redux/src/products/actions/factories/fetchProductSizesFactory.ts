import {
  FETCH_PRODUCT_SIZES_FAILURE,
  FETCH_PRODUCT_SIZES_REQUEST,
  FETCH_PRODUCT_SIZES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductSizes,
  Product,
  ProductSizesQuery,
  Size,
} from '@farfetch/blackout-client/products/types';

/**
 * @param productId - Numeric identifier of the product.
 * @param query     - Query parameters to apply to the request.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * sizes for a given product id.
 *
 * @param getProductSizes - Get product sizes client.
 *
 * @returns Thunk factory.
 */
const fetchProductSizesFactory =
  (getProductSizes: GetProductSizes) =>
  (
    productId: Product['result']['id'],
    query: ProductSizesQuery,
    config?: Record<string, unknown>,
  ) =>
  async (dispatch: Dispatch): Promise<Size[]> => {
    dispatch({
      meta: { productId },
      type: FETCH_PRODUCT_SIZES_REQUEST,
    });

    try {
      const result = await getProductSizes(productId, query, config);
      const productWithSizes = {
        id: productId,
        sizes: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithSizes, productSchema),
        type: FETCH_PRODUCT_SIZES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: FETCH_PRODUCT_SIZES_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductSizesFactory;
