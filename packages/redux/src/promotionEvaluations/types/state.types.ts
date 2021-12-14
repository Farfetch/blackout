import type { CombinedState } from 'redux';
import type { Error } from '@farfetch/blackout-client/types';
import type { PromotionEvaluationItem } from '@farfetch/blackout-client/promotionEvaluations/types';

export type State = CombinedState<{
  error: Error | null;
  id: string | null;
  isLoading: boolean;
  result: Array<PromotionEvaluationItem> | null;
}>;
