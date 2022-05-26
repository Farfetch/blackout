import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { ProductRecommendation } from '@farfetch/blackout-client/recommendations/types';

export type State = CombinedState<{
  error: Record<string, BlackoutError | null | undefined>;
  isLoading: Record<string, boolean>;
  result: ProductRecommendationResult;
}>;

export type ProductRecommendationResult =
  | Record<string, ProductRecommendation>
  | null
  | undefined;
