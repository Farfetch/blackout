import type {
  BlackoutError,
  PromotionEvaluationItem,
} from '@farfetch/blackout-client';
import type { CombinedState } from 'redux';

export type PromotionEvaluationsState = CombinedState<{
  error: BlackoutError | null;
  id: string | null;
  isLoading: boolean;
  result: Array<PromotionEvaluationItem> | null;
}>;
