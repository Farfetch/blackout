import { fetchProductMeasurementsFactory } from './factories/index.js';
import { getProductVariantsMeasurements } from '@farfetch/blackout-client';

/**
 * Fetch product measurements for a given product id.
 */
export default fetchProductMeasurementsFactory(getProductVariantsMeasurements);
