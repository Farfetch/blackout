import type { Config } from '../../index.js';
import type { SearchSuggestion } from './searchSuggestion.types.js';
import type { SearchSuggestionsQuery } from './searchSuggestionsQuery.types.js';

export type GetSearchSuggestions = (
  query: SearchSuggestionsQuery,
  config?: Config,
) => Promise<SearchSuggestion[]>;
