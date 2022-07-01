import type { Config } from '../..';
import type { Product } from './product.types';

export type RecommendedSet = {
  id: number;
  platformSetId: number;
  name: string;
  slug: string;
  products: Array<Product['result']['id']>;
};

export type GetProductRecommendedSet = (
  id: number,
  config?: Config,
) => Promise<RecommendedSet>;
