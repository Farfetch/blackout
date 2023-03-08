import type { Config } from '../../index.js';
import type { Product } from './product.types.js';
import type { ProductFitting } from './productFitting.types.js';

export type GetProductFittings = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductFitting[]>;
