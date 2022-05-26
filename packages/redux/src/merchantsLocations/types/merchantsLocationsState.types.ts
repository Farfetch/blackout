import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';

export type State = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
}>;
