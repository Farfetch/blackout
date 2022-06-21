import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { RecommendedSet } from '@farfetch/blackout-client';

export type RecommendedSetsState = CombinedState<{
  error: Record<RecommendedSet['id'], BlackoutError | null>;
  isLoading: Record<RecommendedSet['id'], boolean>;
  result: Record<RecommendedSet['id'], RecommendedSet>;
}>;
