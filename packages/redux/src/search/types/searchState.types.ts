import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type {
  SearchDidYouMean,
  SearchDidYouMeanQuery,
  SearchIntents,
  SearchSuggestion,
  SearchSuggestionsQuery,
} from '@farfetch/blackout-client/search/types';

export type SearchDidYouMeanState = CombinedState<{
  error: Error | null;
  isLoading: boolean;
  query: SearchDidYouMeanQuery | null;
  result: SearchDidYouMean[] | null;
}>;

export type SearchIntentsState = CombinedState<{
  error: Error | null;
  isLoading: boolean;
  result: SearchIntents | null;
}>;

export type SearchSuggestionsState = CombinedState<{
  error: Error | null;
  isLoading: boolean;
  query: SearchSuggestionsQuery | null;
  result: SearchSuggestion[] | null;
}>;

export type State = CombinedState<{
  didYouMean: SearchDidYouMeanState;
  intents: SearchIntentsState;
  suggestions: SearchSuggestionsState;
}>;
