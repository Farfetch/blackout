import type { Category } from '@farfetch/blackout-client/categories/types';
import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';

export type TopCategoryState = CombinedState<{
  error: Error | null;
  isLoading: boolean;
  result: Array<Category['id']> | null;
}>;

export type State = CombinedState<{
  error: Error | null;
  isFetched: boolean;
  isLoading: boolean;
  top: TopCategoryState;
}>;
