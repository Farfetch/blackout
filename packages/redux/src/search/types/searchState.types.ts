import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  SearchDidYouMean,
  SearchDidYouMeanQuery,
  SearchIntents,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client/search/types';

export type SearchDidYouMeanState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  query: SearchDidYouMeanQuery | null;
  result: SearchDidYouMean[] | null;
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

export type State = CombinedState<{
  didYouMean: SearchDidYouMeanState;
  intents: SearchIntentsState;
  suggestions: SearchSuggestionsState;
}>;
