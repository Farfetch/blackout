import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { Category } from '@farfetch/blackout-client/categories/types';
import type { CombinedState } from 'redux';

export type TopCategoryState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Array<Category['id']> | null;
}>;

export type State = CombinedState<{
  error: BlackoutError | null;
  isFetched: boolean;
  isLoading: boolean;
  top: TopCategoryState;
}>;
