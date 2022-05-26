import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { SizeGuide } from '@farfetch/blackout-client/sizeGuides/types';

export type State = CombinedState<{
  error: BlackoutError | null;
  isLoading: boolean;
  result: SizeGuide[] | null;
}>;
