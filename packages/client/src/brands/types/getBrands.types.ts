import type { Brands } from './brands.types';
import type { BrandsQuery } from './brandsQuery.types';

export type GetBrands = (
  query: BrandsQuery,
  config?: Record<string, unknown>,
) => Promise<Brands>;
