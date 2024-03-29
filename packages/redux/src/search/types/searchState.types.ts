import type {
  BlackoutError,
  GetSearchDidYouMeanQuery,
  GetSearchIntentsQuery,
  GetSearchSuggestionsQuery,
  SearchDidYouMeanSuggestion,
  SearchIntents,
  SearchSuggestion,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type SearchHash = string;

export type SearchDidYouMeanState = CombinedState<
  Record<
    SearchHash,
    {
      error: BlackoutError | null;
      isLoading: boolean;
      query: GetSearchDidYouMeanQuery | null;
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
      query: GetSearchIntentsQuery;
    }
  >
>;

export type SearchSuggestionsState = CombinedState<
  Record<
    SearchHash,
    {
      error: BlackoutError | null;
      isLoading: boolean;
      query: GetSearchSuggestionsQuery | null;
      result: SearchSuggestion[] | null;
    }
  >
>;

export type SearchState = CombinedState<{
  didYouMean: SearchDidYouMeanState;
  intents: SearchIntentsState;
  suggestions: SearchSuggestionsState;
}>;
