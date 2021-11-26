import type { Product } from './product.types';
import type { ProductFitting } from './productFitting.types';

export type GetProductFittings = (
  id: Product['result']['id'],
  config?: Record<string, unknown>,
) => Promise<ProductFitting[]>;
