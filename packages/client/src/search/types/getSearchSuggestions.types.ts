import type { Config } from '../../index.js';
import type { GetSearchSuggestionsQuery } from './searchSuggestionsQuery.types.js';
import type { SearchSuggestion } from './searchSuggestion.types.js';

export type GetSearchSuggestions = (
  query: GetSearchSuggestionsQuery,
  config?: Config,
) => Promise<SearchSuggestion[]>;
