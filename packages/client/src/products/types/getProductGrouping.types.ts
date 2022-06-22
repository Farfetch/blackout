import type { GroupingQuery } from './groupingQuery.types';
import type { Product } from './product.types';
import type { ProductGrouping } from './productGrouping.types';

export type GetProductGrouping = (
  id: Product['result']['id'],
  query: GroupingQuery,
  config?: Record<string, unknown>,
) => Promise<ProductGrouping>;
