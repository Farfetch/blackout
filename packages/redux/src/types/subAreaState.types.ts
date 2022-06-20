import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { Nullable } from '.';

export type StateWithoutResult = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
}>;

export type StateWithResultArray<T> = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: Nullable<Array<T>> | undefined;
}>;

export type StateWithResult<T> = CombinedState<{
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: Nullable<T>;
}>;
