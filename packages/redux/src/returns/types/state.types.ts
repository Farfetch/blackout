import type { BlackoutError } from '@farfetch/blackout-client';
import type { Nullable } from '../../types';

export type StateWithoutResult = {
  error: Nullable<BlackoutError>;
  isLoading: boolean;
};

export type State = {
  error: BlackoutError | null;
  id: string | number | null;
  isLoading: boolean;
  returns: StateWithoutResult;
  references: StateWithoutResult;
  pickupCapabilities: StateWithoutResult;
  [k: string]: unknown;
};
