import type { BlackoutError, RecommendedSet } from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type RecommendedSetState = CombinedState<{
  error: Record<RecommendedSet['id'], BlackoutError | null>;
  isLoading: Record<RecommendedSet['id'], boolean | undefined>;
  result: Record<RecommendedSet['id'], RecommendedSet>;
}>;
