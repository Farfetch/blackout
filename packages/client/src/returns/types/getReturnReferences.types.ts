import type { Query } from './query.types';

export type GetReturnReferences = (
  id: string,
  name: string,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<string>;
