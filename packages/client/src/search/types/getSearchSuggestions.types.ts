import type { Config } from '../..';
import type { SearchSuggestion } from './searchSuggestion.types';
import type { SearchSuggestionsQuery } from './searchSuggestionsQuery.types';

export type GetSearchSuggestions = (
  query: SearchSuggestionsQuery,
  config?: Config,
) => Promise<SearchSuggestion[]>;
