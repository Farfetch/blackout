import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';

export type State = CombinedState<{
  error: Error | null;
  isLoading: boolean;
}>;
