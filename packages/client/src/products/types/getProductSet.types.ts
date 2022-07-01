import type { Config } from '../..';
import type { GetProductSetQuery } from './setQuery.types';
import type { Set } from './set.types';

export type GetProductSet = (
  slug: string | number,
  query?: GetProductSetQuery,
  config?: Config,
) => Promise<Set>;
