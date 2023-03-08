import type { Config } from '../../index.js';
import type { Product } from './product.types.js';
import type { ProductSizesQuery } from './productSizesQuery.types.js';
import type { Size } from './size.types.js';

export type GetProductSizes = (
  id: Product['result']['id'],
  query: ProductSizesQuery,
  config?: Config,
) => Promise<Size[]>;
