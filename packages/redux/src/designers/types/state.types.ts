import type { BlackoutError } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';
import type { DesignersResponse } from '@farfetch/blackout-client/designers/types';

export type State = CombinedState<{
  error: Record<string, BlackoutError | undefined>;
  hash: string | null;
  isLoading: Record<string, boolean | undefined>;
  result: Record<string, DesignersResponse>;
}>;
