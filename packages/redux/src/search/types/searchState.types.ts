import type {
  BlackoutError,
  SearchDidYouMeanQuery,
  SearchDidYouMeanSuggestion,
  SearchIntents,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type SearchDidYouMeanState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  query: SearchDidYouMeanQuery | null;
  result: SearchDidYouMeanSuggestion[] | null;
}>;

export type SearchIntentsState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: SearchIntents | null;
}>;

export type SearchSuggestionsState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  query: SearchSuggestionsQuery | null;
  result: SearchSuggestion[] | null;
}>;

export type SearchState = CombinedState<{
  didYouMean: SearchDidYouMeanState;
  intents: SearchIntentsState;
  suggestions: SearchSuggestionsState;
}>;
