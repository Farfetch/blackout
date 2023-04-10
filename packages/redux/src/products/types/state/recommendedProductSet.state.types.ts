import type {
  BlackoutError,
  RecommendedProductSet,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type RecommendedProductSetState = CombinedState<{
  error: Record<RecommendedProductSet['id'], BlackoutError | null>;
  isLoading: Record<RecommendedProductSet['id'], boolean | undefined>;
  result: Record<RecommendedProductSet['id'], RecommendedProductSet>;
}>;
