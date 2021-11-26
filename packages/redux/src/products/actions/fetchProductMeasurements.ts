import { fetchProductMeasurementsFactory } from './factories';
import { getProductVariantsMeasurements } from '@farfetch/blackout-client/products';

/**
 * Fetch product measurements for a given product id.
 *
 * @memberof module:products/actions
 *
 * @name fetchProductMeasurements
 *
 * @type {FetchProductMeasurementsThunkFactory}
 */
export default fetchProductMeasurementsFactory(getProductVariantsMeasurements);
