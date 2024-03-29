import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetProductAttributes,
  type Product,
  type ProductAttribute,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product.js';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * attributes for a given product id.
 *
 * @param getProductAttributes - Get product attributes client.
 *
 * @returns Thunk factory.
 */
const fetchProductAttributesFactory =
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
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PRODUCT_ATTRIBUTES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductAttributesFactory;
