import type { Query } from './query.types';
import type { Return } from './return.types';

export type PostReturn = (
  data: Return,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Return>;
