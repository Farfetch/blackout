import {
  FETCH_PRODUCT_ATTRIBUTES_FAILURE,
  FETCH_PRODUCT_ATTRIBUTES_REQUEST,
  FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductAttributes,
  Product,
  ProductAttribute,
} from '@farfetch/blackout-client';

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
  (productId: Product['result']['id'], config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<ProductAttribute[]> => {
    try {
      dispatch({
        meta: { productId },
        type: FETCH_PRODUCT_ATTRIBUTES_REQUEST,
      });

      const result = await getProductAttributes(productId, config);
      const productWithAttributes = {
        id: productId,
        attributes: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithAttributes, productSchema),
        type: FETCH_PRODUCT_ATTRIBUTES_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toError(error) },
        type: FETCH_PRODUCT_ATTRIBUTES_FAILURE,
      });

      throw error;
    }
  };
