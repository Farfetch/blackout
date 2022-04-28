import type { Error } from '@farfetch/blackout-client/types';
import type {
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client/search/types';

export type UseSearchSuggestionsReturn = {
  error: Error | null;
  fetchSearchSuggestions: (
    query: SearchSuggestionsQuery,
    config?: Record<string, unknown>,
  ) => Promise<SearchSuggestion[]>;
  isLoading: boolean;
  resetSearchSuggestions: () => void;
  suggestions: SearchSuggestion[] | null;
};

export type UseSearchSuggestions = () => UseSearchSuggestionsReturn;
