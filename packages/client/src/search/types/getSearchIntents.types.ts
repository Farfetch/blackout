import type { Config } from '../../index.js';
import type { SearchIntents } from './searchIntents.types.js';
import type { SearchIntentsQuery } from './searchIntentsQuery.types.js';

export type GetSearchIntents = (
  query: SearchIntentsQuery,
  config?: Config,
) => Promise<SearchIntents>;
