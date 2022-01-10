import type { Query } from './query.types';
import type { Return } from './return.types';

export type GetReturnsFromOrder = (
  id: string,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<Return>;
