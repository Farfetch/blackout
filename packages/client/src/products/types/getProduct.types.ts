import type { Config } from '../..';
import type { Product } from './product.types';
import type { ProductDetailsQuery } from './productDetailsQuery.types';

export type GetProduct = (
  id: Product['result']['id'],
  query?: ProductDetailsQuery,
  config?: Config,
) => Promise<Product>;
