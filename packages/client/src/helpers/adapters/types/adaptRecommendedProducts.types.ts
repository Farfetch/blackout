import type { RecommendedProductsResult } from '../../../products';

export type RecommendedProductsResultNormalized = {
  id?: RecommendedProductsResult['id'];
  values?: RecommendedProductNormalized[];
};

export type RecommendedProductNormalized = {
  id: RecommendedProductsResult['products'][number]['product']['id'];
  score: RecommendedProductsResult['products'][number]['score'];
};
