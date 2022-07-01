import type { BlackoutError } from '@farfetch/blackout-client';
import type { StateWithoutResult } from '../../types/subAreaState.types';

export type ReturnsState = {
  error: BlackoutError | null;
  id: number | null;
  isLoading: boolean;
  returns: StateWithoutResult;
  references: StateWithoutResult;
  pickupCapabilities: StateWithoutResult;
  [k: string]: unknown;
};
