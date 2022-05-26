import type { BlackoutError } from '@farfetch/blackout-client/types';
import type { CombinedState } from 'redux';
import type { PromotionEvaluationItem } from '@farfetch/blackout-client/promotionEvaluations/types';

export type State = CombinedState<{
  error: BlackoutError | null;
  id: string | null;
  isLoading: boolean;
  result: Array<PromotionEvaluationItem> | null;
}>;
