import type { Brands } from './brands.types.js';
import type { BrandsQuery } from './brandsQuery.types.js';
import type { Config } from '../../index.js';

export type GetBrands = (
  query: BrandsQuery,
  config?: Config,
) => Promise<Brands>;
