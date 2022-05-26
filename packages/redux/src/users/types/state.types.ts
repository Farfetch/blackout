import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { Nullable } from '../../types';
import type { UserAttributesResponse } from '@farfetch/blackout-client/users/types';

export interface StateWithoutResult {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
}

export interface StateWithResult {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
  result: UserAttributesResponse[] | null;
}

export type State = CombinedState<{
  error: Nullable<BlackoutError>;
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
