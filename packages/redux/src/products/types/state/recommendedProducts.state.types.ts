import type { CombinedState } from 'redux';
import type { RecommendedProductsResultNormalized } from '../../../helpers/adapters/index.js';
import type { StateWithoutResult } from '../../../types/index.js';

type RecommendedProductsResultsByStrategy = Record<
  string,
  RecommendedProductsResultNormalized
>;

export type RecommendedProductsState = CombinedState<{
  error: Record<string, StateWithoutResult['error']>;
  isLoading: Record<string, StateWithoutResult['isLoading']>;
  result: RecommendedProductsResultsByStrategy;
}>;
