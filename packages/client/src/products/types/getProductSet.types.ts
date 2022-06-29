import type { Set } from './set.types';
import type { SetQuery } from './setQuery.types';

export type GetSet = (
  slug: string | number,
  query?: SetQuery,
  config?: Record<string, unknown>,
) => Promise<Set>;
