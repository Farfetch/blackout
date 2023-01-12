import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProductSizes,
  Product,
  ProductSizesQuery,
  Size,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';

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
    config?: Config,
  ) =>
  async (dispatch: Dispatch): Promise<Size[]> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_SIZES_REQUEST,
      });

      const result = await getProductSizes(productId, query, config);
      const productWithSizes = {
        id: productId,
        sizes: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithSizes, productSchema),
        type: actionTypes.FETCH_PRODUCT_SIZES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PRODUCT_SIZES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductSizesFactory;
