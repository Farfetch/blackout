import type { Brands } from './brands.types.js';
import type { Config } from '../../index.js';
import type { GetBrandsQuery } from './brandsQuery.types.js';

export type GetBrands = (
  query?: GetBrandsQuery,
  config?: Config,
) => Promise<Brands>;
