import type { Config } from '../../index.js';
import type { Product } from './product.types.js';
import type { ProductVariantMeasurement } from './productVariantMeasurement.types.js';

export type GetProductVariantsMeasurements = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductVariantMeasurement[]>;
