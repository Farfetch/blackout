import * as actionTypes from '../../actionTypes/index.js';
import {
  type Config,
  type GetProductOutfits,
  type Outfit,
  type Product,
  toBlackoutError,
} from '@farfetch/blackout-client';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product.js';
import type { Dispatch } from 'redux';
import type { FetchProductOutfitsAction } from '../../types/index.js';

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * outfits for a given product id.
 *
 * @param getProductOutfits - Get product outfits client.
 *
 * @returns Thunk factory.
 */
const fetchProductOutfitsFactory =
  (getProductOutfits: GetProductOutfits) =>
  (productId: Product['result']['id'], config?: Config) =>
  async (dispatch: Dispatch<FetchProductOutfitsAction>): Promise<Outfit[]> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_OUTFITS_REQUEST,
      });

      const result = await getProductOutfits(productId, config);
      const productWithOutfits = {
        id: productId,
        outfits: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithOutfits, productSchema),
        type: actionTypes.FETCH_PRODUCT_OUTFITS_SUCCESS,
      });

      return result;
    } catch (error) {
      const errorAsBlackoutError = toBlackoutError(error);

      dispatch({
        meta: { productId },
        payload: { error: errorAsBlackoutError },
        type: actionTypes.FETCH_PRODUCT_OUTFITS_FAILURE,
      });

      throw errorAsBlackoutError;
    }
  };

export default fetchProductOutfitsFactory;
