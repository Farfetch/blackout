import type { Config } from '../..';
import type { Product } from './product.types';
import type { ProductAttribute } from './productAttribute.types';

export type GetProductAttributes = (
  id: Product['result']['id'],
  config?: Config,
) => Promise<ProductAttribute[]>;
