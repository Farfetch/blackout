import { fetchProductMeasurementsFactory } from './factories';
import { getProductVariantsMeasurements } from '@farfetch/blackout-client/products';

/**
 * Fetch product measurements for a given product id.
 */
export default fetchProductMeasurementsFactory(getProductVariantsMeasurements);
