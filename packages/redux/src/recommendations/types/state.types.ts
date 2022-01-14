import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { ProductRecommendation } from '@farfetch/blackout-client/recommendation/types';

export type State = CombinedState<{
  error: Record<string, Error | null | undefined>;
  isLoading: Record<string, boolean>;
  result: ProductRecommendationResult;
}>;

export type ProductRecommendationResult =
  | Record<string, ProductRecommendation>
  | null
  | undefined;
