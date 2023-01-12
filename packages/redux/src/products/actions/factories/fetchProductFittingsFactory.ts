import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProductFittings,
  Product,
  ProductFitting,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to load product
 * fittings for a given product id.
 *
 * @param getProductFittings - Get product fittings client.
 *
 * @returns Thunk factory.
 */
const fetchProductFittingsFactory =
  (getProductFittings: GetProductFittings) =>
  (productId: Product['result']['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<ProductFitting[]> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_FITTINGS_REQUEST,
      });

      const result = await getProductFittings(productId, config);
      const productWithFittings = {
        id: productId,
        fittings: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithFittings, productSchema),
        type: actionTypes.FETCH_PRODUCT_FITTINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductFittingsFactory;
