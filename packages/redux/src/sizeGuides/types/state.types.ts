import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { SizeGuide } from '@farfetch/blackout-client/sizeGuides/types';

export type State = CombinedState<{
  error: Error | null;
  isLoading: boolean;
  result: SizeGuide[] | null;
}>;
