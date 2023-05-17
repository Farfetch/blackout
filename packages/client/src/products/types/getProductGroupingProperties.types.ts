import type { Config } from '../../index.js';
import type { GetProductGroupingPropertiesQuery } from './groupingPropertiesQuery.types.js';
import type { Product } from './product.types.js';
import type { ProductGroupingProperties } from './productGroupingProperties.types.js';

export type GetProductGroupingProperties = (
  id: Product['result']['id'],
  query?: GetProductGroupingPropertiesQuery,
  config?: Config,
) => Promise<ProductGroupingProperties>;
