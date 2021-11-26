import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { Nullable } from './';

export type StateWithoutResult = CombinedState<{
  error: Nullable<Error>;
  isLoading: boolean;
}>;

export type StateWithResultArray<T> = CombinedState<{
  error: Nullable<Error>;
  isLoading: boolean;
  result: Nullable<Array<T>> | undefined;
}>;

export type StateWithResult<T> = CombinedState<{
  error: Nullable<Error>;
  isLoading: boolean;
  result: Nullable<T>;
}>;
