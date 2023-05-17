import type { Config } from '../../index.js';
import type { Product } from './product.types.js';
import type { ProductSizeGuide } from './productSizeGuide.types.js';

export type GetProductSizeGuides = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductSizeGuide[]>;
