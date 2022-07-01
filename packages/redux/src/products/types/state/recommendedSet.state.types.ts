import type { BlackoutError, RecommendedSet } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type RecommendedSetsState = CombinedState<{
  error: Record<RecommendedSet['id'], BlackoutError | null>;
  isLoading: Record<RecommendedSet['id'], boolean>;
  result: Record<RecommendedSet['id'], RecommendedSet>;
}>;
