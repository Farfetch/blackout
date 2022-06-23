import type { CombinedState } from 'redux';
import type { RecommendedProductsResultNormalized } from '../../../helpers/adapters';
import type { StateWithoutResult } from '../../../types';

type RecommendedProductsResultsByStrategy = Record<
  string,
  RecommendedProductsResultNormalized
>;

export type RecommendedProductsState = CombinedState<{
  error: Record<string, StateWithoutResult['error']>;
  isLoading: Record<string, StateWithoutResult['isLoading']>;
  result: RecommendedProductsResultsByStrategy;
}>;
