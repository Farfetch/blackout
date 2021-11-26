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
 * @callback FetchMeasurementsThunkFactory
 *
 * @param {number} productId - Numeric identifier of the product.
 * @param {object} [config] - Custom configurations to send to the client
 * instance (axios).
 *
 * @returns {Function} Thunk to be dispatched to the redux store.
 */

/**
 * Creates a thunk factory configured with the specified client to fetch product
 * measurements for a given product id.
 *
 * @memberof module:products/actions/factories
 *
 * @param {Function} getMeasurements - Get measurements client.
 *
 * @returns {FetchMeasurementsThunkFactory} Thunk factory.
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
