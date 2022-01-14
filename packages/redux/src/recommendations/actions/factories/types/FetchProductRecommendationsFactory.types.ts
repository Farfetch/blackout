import type { Dispatch } from 'redux';
import type { FetchProductRecommendationsAction } from '../../../types';
import type { GetProductRecommendations } from '@farfetch/blackout-client/recommendations/types';

export type FetchProductRecommendationsFactory<
  T extends GetProductRecommendations,
> = (
  getFormSchema: T,
) => (
  ...args: Parameters<T>
) => (dispatch: Dispatch<FetchProductRecommendationsAction>) => ReturnType<T>;
