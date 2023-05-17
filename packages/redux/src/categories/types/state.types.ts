import type { BlackoutError, Category } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type TopCategoriesState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Array<Category['id']> | null;
}>;

export type CategoriesState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: Array<Category['id']> | null;
  category: CategoryState;
  top: TopCategoriesState;
}>;

export type CategoryState = CombinedState<{
  error: Record<Category['id'], BlackoutError | null>;
  isLoading: Record<Category['id'], boolean>;
}>;
