import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProductAttributes,
  Product,
  ProductAttribute,
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
 * Creates a thunk factory configured with the specified client to fetch product
 * attributes for a given product id.
 *
 * @param getProductAttributes - Get product attributes client.
 *
 * @returns Thunk factory.
 */
export const fetchProductAttributesFactory =
  (getProductAttributes: GetProductAttributes) =>
  (productId: Product['result']['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<ProductAttribute[]> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_ATTRIBUTES_REQUEST,
      });

      const result = await getProductAttributes(productId, config);
      const productWithAttributes = {
        id: productId,
        attributes: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithAttributes, productSchema),
        type: actionTypes.FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };
