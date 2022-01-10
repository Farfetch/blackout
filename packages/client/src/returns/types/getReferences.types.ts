import type { Query } from './query.types';

export type GetReferences = (
  id: string,
  name: string,
  query?: Query,
  config?: Record<string, unknown>,
) => Promise<string>;
