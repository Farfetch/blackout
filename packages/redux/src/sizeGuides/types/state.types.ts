import type { BlackoutError, SizeGuide } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type SizeGuidesState = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: SizeGuide[] | null;
}>;
