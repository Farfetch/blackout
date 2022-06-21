import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { Nullable } from './';

type BaseStateType = {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
};

export type StateWithoutResult<T = undefined> = CombinedState<
  T extends undefined ? BaseStateType : BaseStateType & T
>;

export type StateWithResultArray<T> = CombinedState<
  BaseStateType & {
    result: Nullable<Array<T>> | undefined;
  }
>;

export type StateWithResult<T> = CombinedState<
  BaseStateType & {
    result: Nullable<T>;
  }
>;
