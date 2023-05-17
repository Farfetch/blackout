import type { Config } from '../../index.js';
import type { Product } from './product.types.js';
import type { ProductAttribute } from './productAttribute.types.js';

export type GetProductAttributes = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductAttribute[]>;
