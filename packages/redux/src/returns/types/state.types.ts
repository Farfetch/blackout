import type { Error } from '@farfetch/blackout-client/types';
import type { Nullable } from '../../types';

export type StateWithoutResult = {
  error: Nullable<Error>;
  isLoading: boolean;
};

export type State = {
  error: Error | null;
  id: string | number | null;
  isLoading: boolean;
  returns: StateWithoutResult;
  references: StateWithoutResult;
  pickupCapabilities: StateWithoutResult;
  [k: string]: unknown;
};
