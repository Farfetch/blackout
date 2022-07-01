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
 * @param productId - Numeric identifier of the product.
 * @param config    - Custom configurations to send to the client instance (axios).
 *
 * @returns Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to load product
 * fittings for a given product id.
 *
 * @param getProductFittings - Get product fittings client.
 *
 * @returns Thunk factory.
 */
export const fetchProductFittingsFactory =
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
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PRODUCT_FITTINGS_FAILURE,
      });

      throw error;
    }
  };
