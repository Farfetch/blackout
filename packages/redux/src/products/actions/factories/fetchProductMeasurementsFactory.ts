import {
  FETCH_PRODUCT_MEASUREMENTS_FAILURE,
  FETCH_PRODUCT_MEASUREMENTS_REQUEST,
  FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
} from '../../actionTypes';
import { normalize } from 'normalizr';
import productSchema from '../../../entities/schemas/product';
import type { Dispatch } from 'redux';
import type {
  GetProductVariantsMeasurements,
  Product,
  ProductVariantMeasurement,
} from '@farfetch/blackout-client/products/types';

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
const fetchProductMeasurementsFactory =
  (getMeasurements: GetProductVariantsMeasurements) =>
  (productId: Product['result']['id'], config?: Record<string, unknown>) =>
  async (dispatch: Dispatch): Promise<ProductVariantMeasurement[]> => {
    dispatch({
      meta: { productId },
      type: FETCH_PRODUCT_MEASUREMENTS_REQUEST,
    });

    try {
      const result = await getMeasurements(productId, config);
      const productWithMeasurements = {
        id: productId,
        measurements: result,
      };

      dispatch({
        meta: { productId },
        payload: normalize(productWithMeasurements, productSchema),
        type: FETCH_PRODUCT_MEASUREMENTS_SUCCESS,
      });

      return result;
    } catch (error) {
      dispatch({
        meta: { productId },
        payload: { error },
        type: FETCH_PRODUCT_MEASUREMENTS_FAILURE,
      });

      throw error;
    }
  };

export default fetchProductMeasurementsFactory;
