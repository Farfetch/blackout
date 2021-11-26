import type { CombinedState } from 'redux';
import type { DesignersResponse } from '@farfetch/blackout-client/designers/types';
import type { Error } from '@farfetch/blackout-client/types';

export type State = CombinedState<{
  error: Record<string, Error | undefined>;
  hash: string | null;
  isLoading: Record<string, boolean | undefined>;
  result: Record<string, DesignersResponse>;
}>;
