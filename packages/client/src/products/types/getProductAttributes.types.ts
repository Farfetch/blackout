import type { Product } from './product.types';
import type { ProductAttribute } from './productAttribute.types';

export type GetProductAttributes = (
  id: Product['result']['id'],
  config?: Record<string, unknown>,
) => Promise<ProductAttribute[]>;
