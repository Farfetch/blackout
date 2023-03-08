import type { Config } from '../../index.js';
import type { GroupingQuery } from './groupingQuery.types.js';
import type { Product } from './product.types.js';
import type { ProductGrouping } from './productGrouping.types.js';

export type GetProductGrouping = (
  id: Product['result']['id'],
  query: GroupingQuery,
  config?: Config,
) => Promise<ProductGrouping>;
