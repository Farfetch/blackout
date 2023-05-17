import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetProductSizeGuides,
  type Product,
  type ProductSizeGuide,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product.js';
import type { Dispatch } from 'redux';

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * size guides for a given product id. This size guides logic should be used where
 * the project has a category tree. If your project does not have a category tree
 * you should use the size guides logic from \@farfetch/blackout-redux/sizeGuides.
 *
 * @param getProductSizeGuides - Get product size guides client.
 *
 * @returns Thunk factory.
 */
const fetchProductSizeGuidesFactory =
  (getProductSizeGuides: GetProductSizeGuides) =>
  (productId: Product['result']['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<ProductSizeGuide[]> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_SIZEGUIDES_REQUEST,
      });

      const result = await getProductSizeGuides(productId, config);

      const productWithSizeGuide = {
        id: productId,
        sizeGuides: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithSizeGuide, productSchema),
        type: actionTypes.FETCH_PRODUCT_SIZEGUIDES_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PRODUCT_SIZEGUIDES_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductSizeGuidesFactory;
