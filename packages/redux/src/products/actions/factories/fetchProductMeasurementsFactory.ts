import * as actionTypes from '../../actionTypes';
import {
  Config,
  GetProductVariantsMeasurements,
  Product,
  ProductVariantMeasurement,
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
 * measurements for a given product id.
 *
 * @param getMeasurements - Get measurements client.
 *
 * @returns Thunk factory.
 */
export const fetchProductMeasurementsFactory =
  (getMeasurements: GetProductVariantsMeasurements) =>
  (productId: Product['result']['id'], config?: Config) =>
  async (dispatch: Dispatch): Promise<ProductVariantMeasurement[]> => {
    try {
      dispatch({
        meta: { productId },
        type: actionTypes.FETCH_PRODUCT_MEASUREMENTS_REQUEST,
      });

      const result = await getMeasurements(productId, config);
      const productWithMeasurements = {
        id: productId,
        measurements: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithMeasurements, productSchema),
        type: actionTypes.FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error: toBlackoutError(error) },
        type: actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE,
      });

      throw error;
    }
  };
