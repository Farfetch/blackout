import { fetchProductMeasurementsFactory } from './factories';
import { getProductVariantsMeasurements } from '@farfetch/blackout-client';

/**
 * Fetch product measurements for a given product id.
 */
export default fetchProductMeasurementsFactory(getProductVariantsMeasurements);