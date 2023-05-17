import type { Config } from '../../index.js';
import type { Product } from './product.types.js';
import type { ProductDetailsQuery } from './productDetailsQuery.types.js';

export type GetProduct = (
  id: Product['result']['id'],
  query?: ProductDetailsQuery,
  config?: Config,
) => Promise<Product>;
