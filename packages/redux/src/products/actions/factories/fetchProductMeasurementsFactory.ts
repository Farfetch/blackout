import * as actionTypes from '../../actionTypes';
import { normalize } from 'normalizr';
import { toError } from '@farfetch/blackout-client/helpers/client';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductVariantsMeasurements,
  Product,
  ProductVariantMeasurement,
} from '@farfetch/blackout-client';

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
  (productId: Product['result']['id'], config?: Record<string, unknown>) =>
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
        payload: { error: toError(error) },
        type: actionTypes.FETCH_PRODUCT_MEASUREMENTS_FAILURE,
      });

      throw error;
    }
  };
