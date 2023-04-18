import type { Config } from '../../index.js';
import type { GetSearchIntentsQuery } from './searchIntentsQuery.types.js';
import type { SearchIntents } from './searchIntents.types.js';

export type GetSearchIntents = (
  query: GetSearchIntentsQuery,
  config?: Config,
) => Promise<SearchIntents>;
