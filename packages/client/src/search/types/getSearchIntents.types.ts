import type { SearchIntents } from './searchIntents.types';
import type { SearchIntentsQuery } from './searchIntentsQuery.types';

export type GetSearchIntents = (
  query: SearchIntentsQuery,
  config?: Record<string, unknown>,
) => Promise<SearchIntents>;
