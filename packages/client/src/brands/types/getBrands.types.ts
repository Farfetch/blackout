import type { Brands } from './brands.types';
import type { BrandsQuery } from './brandsQuery.types';
import type { Config } from '../..';

export type GetBrands = (
  query: BrandsQuery,
  config?: Config,
) => Promise<Brands>;
