import type {
  BlackoutError,
  SearchDidYouMeanQuery,
  SearchDidYouMeanSuggestion,
  SearchIntents,
  SearchIntentsQuery,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type SearchHash = string;

export type SearchDidYouMeanState = CombinedState<
  Record<
    SearchHash,
    {
      error: BlackoutError | null;
      isLoading: boolean;
      query: SearchDidYouMeanQuery | null;
      result: SearchDidYouMeanSuggestion[] | null;
    }
  >
>;

export type SearchIntentsState = CombinedState<
  Record<
    SearchHash,
    {
      error: BlackoutError | null;
      isLoading: boolean;
      result: SearchIntents | null;
      query: SearchIntentsQuery;
    }
  >
>;

export type SearchSuggestionsState = CombinedState<
  Record<
    SearchHash,
    {
      error: BlackoutError | null;
      isLoading: boolean;
      query: SearchSuggestionsQuery | null;
      result: SearchSuggestion[] | null;
    }
  >
>;

export type SearchState = CombinedState<{
  didYouMean: SearchDidYouMeanState;
  intents: SearchIntentsState;
  suggestions: SearchSuggestionsState;
}>;
