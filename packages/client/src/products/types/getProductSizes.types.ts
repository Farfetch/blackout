import type { Config } from '../../index.js';
import type { GetProductSizesQuery } from './productSizesQuery.types.js';
import type { Product } from './product.types.js';
import type { Size } from './size.types.js';

export type GetProductSizes = (
  id: Product['result']['id'],
  query?: GetProductSizesQuery,
  config?: Config,
) => Promise<Size[]>;
