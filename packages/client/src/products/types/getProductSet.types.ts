import type { Config } from '../..';
import type { GetProductSetQuery } from './setQuery.types';
import type { ProductSet } from './set.types';

export type GetProductSet = (
  slug: string | number,
  query?: GetProductSetQuery,
  config?: Config,
) => Promise<ProductSet>;
