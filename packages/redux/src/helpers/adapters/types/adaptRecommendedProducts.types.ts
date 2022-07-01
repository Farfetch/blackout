import type { RecommendedProductsResult } from '@farfetch/blackout-client';

export type RecommendedProductsResultNormalized = {
  id?: RecommendedProductsResult['id'];
  values?: RecommendedProductNormalized[];
};

export type RecommendedProductNormalized = {
  id: RecommendedProductsResult['products'][number]['product']['id'];
  score: RecommendedProductsResult['products'][number]['score'];
};
