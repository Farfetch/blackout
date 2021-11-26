import type { Product } from './product.types';
import type { ProductSizeGuide } from './productSizeGuide.types';

export type GetProductSizeGuides = (
  id: Product['result']['id'],
  config?: Record<string, unknown>,
) => Promise<ProductSizeGuide[]>;
