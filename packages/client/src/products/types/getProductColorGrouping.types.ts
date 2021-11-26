import type { ColorGroupingQuery } from './colorGroupingQuery.types';
import type { Product } from './product.types';
import type { ProductColorGrouping } from './productColorGrouping.types';

export type GetProductColorGrouping = (
  id: Product['result']['id'],
  query: ColorGroupingQuery,
  config?: Record<string, unknown>,
) => Promise<ProductColorGrouping>;
