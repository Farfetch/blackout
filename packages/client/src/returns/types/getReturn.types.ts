import type { Query } from './query.types';
import type { Return } from './return.types';

export type GetReturn = (
  id: number,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Return>;
