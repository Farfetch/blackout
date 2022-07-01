import type {
  BlackoutError,
  Config,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client';

export type UseSearchSuggestionsReturn = {
  error: BlackoutError | null;
  fetchSearchSuggestions: (
    query: SearchSuggestionsQuery,
    config?: Config,
  ) => Promise<SearchSuggestion[]>;
  isLoading: boolean;
  resetSearchSuggestions: () => void;
  suggestions: SearchSuggestion[] | null;
};

export type UseSearchSuggestions = () => UseSearchSuggestionsReturn;
