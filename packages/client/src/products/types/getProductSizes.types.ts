import type { Config } from '../..';
import type { Product } from './product.types';
import type { ProductSizesQuery } from './productSizesQuery.types';
import type { Size } from './size.types';

export type GetProductSizes = (
  id: Product['result']['id'],
  query: ProductSizesQuery,
  config?: Config,
) => Promise<Size[]>;
