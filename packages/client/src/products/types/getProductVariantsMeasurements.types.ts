import type { Config } from '../..';
import type { Product } from './product.types';
import type { ProductVariantMeasurement } from './productVariantMeasurement.types';

export type GetProductVariantsMeasurements = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductVariantMeasurement[]>;
