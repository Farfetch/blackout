import type { BlackoutError, UserAddress } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { Nullable } from '../../../types/nullable.types';
import type { StateWithoutResult, StateWithResult } from '../../../types';

export type UserAddressSliceState = CombinedState<{
  error: Record<UserAddress['id'], Nullable<BlackoutError>>;
  isLoading: Record<UserAddress['id'], boolean>;
}>;

export type UserAddressesSliceState = StateWithoutResult;

export type DefaultAddressDetailsSliceState = StateWithResult<UserAddress>;

export type UserAddressesState = StateWithResult<Array<UserAddress['id']>> & {
  addresses: UserAddressesSliceState;
  address: UserAddressSliceState;
  defaultAddressDetails: DefaultAddressDetailsSliceState;
};
