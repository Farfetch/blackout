import type { Config } from '../..';
import type { GroupingPropertiesQuery } from './groupingPropertiesQuery.types';
import type { Product } from './product.types';
import type { ProductGroupingProperties } from './productGroupingProperties.types';

export type GetProductGroupingProperties = (
  id: Product['result']['id'],
  query: GroupingPropertiesQuery,
  config?: Config,
) => Promise<ProductGroupingProperties>;
