import type { Config } from '../../index.js';
import type { GroupingPropertiesQuery } from './groupingPropertiesQuery.types.js';
import type { Product } from './product.types.js';
import type { ProductGroupingProperties } from './productGroupingProperties.types.js';

export type GetProductGroupingProperties = (
  id: Product['result']['id'],
  query: GroupingPropertiesQuery,
  config?: Config,
) => Promise<ProductGroupingProperties>;
