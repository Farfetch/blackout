import type { BlackoutError, Category } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type TopCategoriesState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Array<Category['id']> | null;
}>;

export type CategoriesState = CombinedState<{
  error: BlackoutError | null;
  isFetched: boolean;
  isLoading: boolean;
  top: TopCategoriesState;
}>;
