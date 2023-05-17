import type { Config } from '../../index.js';
import type { GetProductSetQuery } from './setQuery.types.js';
import type { ProductSet } from './set.types.js';

export type GetProductSet = (
  slug: string | number,
  query?: GetProductSetQuery,
  config?: Config,
) => Promise<ProductSet>;
