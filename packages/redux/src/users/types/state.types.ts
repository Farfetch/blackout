import type { Address, BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type {
  Nullable,
  StateWithoutResult,
  StateWithResult,
} from '../../types';
import type { UserAttributesResponse } from '@farfetch/blackout-client/src/users/attributes/types';

export type AddressState = CombinedState<{
  error: Record<Address['id'], BlackoutError | null>;
  isLoading: Record<Address['id'], boolean>;
}>;

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
  userAttributes: StateWithResult<UserAttributesResponse[]>;
  addresses: StateWithResult<Address['id'][] | BlackoutError>;
  address: AddressState;
  defaultAddress: StateWithResult<Address>;
}>;
