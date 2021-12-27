import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { Nullable } from '../../types';
import type { UserAttributesResponse } from '@farfetch/blackout-client/users/types';

export interface StateWithoutResult {
  error: Nullable<Error>;
  isLoading: boolean;
}

export interface StateWithResult {
  error: Nullable<Error>;
  isLoading: boolean;
  result: UserAttributesResponse[] | null;
}

export type State = CombinedState<{
  error: Nullable<Error>;
  isLoading: boolean;
  result: any;
  benefits: StateWithoutResult;
  preferences: StateWithoutResult;
  updatePreferences: StateWithoutResult;
  titles: StateWithoutResult;
  credit: StateWithoutResult;
  creditMovements: StateWithoutResult;
  contacts: StateWithoutResult;
  userAttributes: StateWithResult;
}>;
