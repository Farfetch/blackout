import {
  FETCH_PRODUCT_FITTINGS_FAILURE,
  FETCH_PRODUCT_FITTINGS_REQUEST,
  FETCH_PRODUCT_FITTINGS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductFittings,
  Product,
  ProductFitting,
} from '@farfetch/blackout-client/products/types';

/**
 * @callback FetchProductFittingsThunkFactory
 *
 * @alias FetchProductFittingsThunkFactory
 * @memberof module:products/actions/factories
 *
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to load product
 * fittings for a given product id.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getProductFittings - Get product fittings client.
 *
 * @returns {FetchProductFittingsThunkFactory} Thunk factory.
 */
const fetchProductFittingsFactory =
  (getProductFittings: GetProductFittings) =>
  (productId: Product['result']['id'], config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<ProductFitting[]> => {
    dispatch({
      meta: { productId },
      type: FETCH_PRODUCT_FITTINGS_REQUEST,
    });

    try {
      const result = await getProductFittings(productId, config);
      const productWithFittings = {
        id: productId,
        fittings: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithFittings, productSchema),
        type: FETCH_PRODUCT_FITTINGS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: FETCH_PRODUCT_FITTINGS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductFittingsFactory;
