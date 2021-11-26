import type { Product } from './product.types';
import type { ProductDetailsQuery } from './productDetailsQuery.types';

export type GetProductDetails = (
  id: Product['result']['id'],
  query?: ProductDetailsQuery,
  config?: Record<string, unknown>,
) => Promise<Product>;
