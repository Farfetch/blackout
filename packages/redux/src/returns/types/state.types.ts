import type { BlackoutError, Return } from '@farfetch/blackout-client';
import type { StateWithResult } from '../../types/subAreaState.types';

export type ReturnDetailsState = {
  error: Record<Return['id'], BlackoutError | null>;
  isLoading: Record<Return['id'], boolean>;
};

export type ReturnPickupCapabilitiesState = {
  error: Record<string, BlackoutError | null>;
  isLoading: Record<string, boolean>;
};

export type ReturnsState = {
  returnDetails: ReturnDetailsState;
  returnPickupCapabilities: ReturnPickupCapabilitiesState;
  createReturn: StateWithResult<Return['id']>;
};
