import type { Product } from './product.types';
import type { ProductVariantMeasurement } from './productVariantMeasurement.types';

export type GetProductVariantsMeasurements = (
  id: Product['result']['id'],
  config?: Record<string, unknown>,
) => Promise<ProductVariantMeasurement[]>;
