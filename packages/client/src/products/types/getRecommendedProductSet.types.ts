import type { Config } from '../../index.js';
import type { Product } from './product.types.js';

export type RecommendedProductSet = {
  id: number;
  platformSetId: number;
  name: string;
  slug: string;
  products: Array<Product['result']['id']>;
};

export type GetRecommendedProductSet = (
  id: number,
  config?: Config,
) => Promise<RecommendedProductSet>;
