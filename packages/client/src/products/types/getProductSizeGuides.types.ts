import type { Config } from '../..';
import type { Product } from './product.types';
import type { ProductSizeGuide } from './productSizeGuide.types';

export type GetProductSizeGuides = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductSizeGuide[]>;
