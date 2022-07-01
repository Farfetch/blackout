import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type MerchantsLocationsState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
}>;
