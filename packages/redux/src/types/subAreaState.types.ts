import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState, EmptyObject } from 'redux';
import type { Nullable } from './';

type BaseStateType<S> = {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
} & S;

export type StateWithoutResult<T = EmptyObject> = BaseStateType<T>;

export type StateWithResultArray<T, S = EmptyObject> = CombinedState<
  BaseStateType<S> & {
    result?: Nullable<Array<T>>;
  }
>;

export type StateWithResult<T, S = EmptyObject> = CombinedState<
  BaseStateType<S> & {
    result: Nullable<T>;
  }
>;
